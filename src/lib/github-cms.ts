import { randomUUID } from "crypto";
import cms from "@/content/cms.json";

const API = "https://api.github.com";

type GitHubConfig = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
};

type TreeEntry = {
  path: string;
  mode: "100644";
  type: "blob";
  sha: string;
};

function config(): GitHubConfig {
  const token = process.env.GITHUB_TOKEN ?? "";
  const owner = process.env.GITHUB_OWNER || "789freshveg";
  const repo = process.env.GITHUB_REPO || "rootdirect.hk";
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token) throw new Error("GITHUB_TOKEN is required");
  return { token, owner, repo, branch };
}

async function github<T>(path: string, init: RequestInit = {}): Promise<T> {
  const cfg = config();
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/vnd.github+json");
  headers.set("Authorization", `Bearer ${cfg.token}`);
  headers.set("X-GitHub-Api-Version", "2022-11-28");
  headers.set("User-Agent", "GrownDirect-CMS");
  if (init.body) headers.set("Content-Type", "application/json");

  const res = await fetch(`${API}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status}: ${text.slice(0, 500)}`);
  }
  return (await res.json()) as T;
}

function repoPath(cfg: GitHubConfig) {
  return `/repos/${encodeURIComponent(cfg.owner)}/${encodeURIComponent(cfg.repo)}`;
}

function parseDataUrl(src: string): { mime: string; bytes: Buffer } | null {
  const match = src.match(/^data:([^;,]+);base64,(.+)$/s);
  if (!match) return null;
  const mime = match[1];
  const bytes = Buffer.from(match[2], "base64");
  return { mime, bytes };
}

function extension(mime: string) {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
  };
  return map[mime] ?? "jpg";
}

function uploadPath(resource: string, mime: string) {
  const safe = resource.replace(/[^a-z0-9_-]/gi, "-");
  return `public/uploads/admin/${safe}-${Date.now()}-${randomUUID()}.${extension(mime)}`;
}

async function createBlob(cfg: GitHubConfig, bytes: Buffer): Promise<string> {
  const result = await github<{ sha: string }>(`${repoPath(cfg)}/git/blobs`, {
    method: "POST",
    body: JSON.stringify({ content: bytes.toString("base64"), encoding: "base64" }),
  });
  return result.sha;
}

async function createJsonBlob(cfg: GitHubConfig, value: unknown): Promise<string> {
  const result = await github<{ sha: string }>(`${repoPath(cfg)}/git/blobs`, {
    method: "POST",
    body: JSON.stringify({
      content: JSON.stringify(value, null, 2) + "\n",
      encoding: "utf-8",
    }),
  });
  return result.sha;
}

async function createCommit(cfg: GitHubConfig, entries: TreeEntry[], message: string) {
  type Ref = { object: { sha: string } };
  type Commit = { tree: { sha: string } };

  const ref = await github<Ref>(`${repoPath(cfg)}/git/ref/heads/${encodeURIComponent(cfg.branch)}`);
  const commit = await github<Commit>(`${repoPath(cfg)}/git/commits/${ref.object.sha}`);

  const tree = await github<{ sha: string }>(`${repoPath(cfg)}/git/trees`, {
    method: "POST",
    body: JSON.stringify({ base_tree: commit.tree.sha, tree: entries }),
  });

  const nextCommit = await github<{ sha: string }>(`${repoPath(cfg)}/git/commits`, {
    method: "POST",
    body: JSON.stringify({ message, tree: tree.sha, parents: [ref.object.sha] }),
  });

  await github(`${repoPath(cfg)}/git/refs/heads/${encodeURIComponent(cfg.branch)}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: nextCommit.sha, force: false }),
  });
}

/**
 * Saves the CMS JSON and any newly uploaded images as one Git commit.
 * Render's filesystem can remain ephemeral because GitHub is the source of truth.
 */
export async function commitCmsUpdate(resource: string, rows: unknown[]) {
  const cfg = config();
  const entries: TreeEntry[] = [];

  async function replaceDataUrls(value: unknown): Promise<unknown> {
    if (typeof value === "string") {
      const parsed = parseDataUrl(value);
      if (!parsed) return value;
      if (!parsed.mime.startsWith("image/")) throw new Error("只接受圖片檔案");
      if (parsed.bytes.length > 2_500_000) {
        throw new Error("圖片太大，請使用較小的圖片（上限約 2.5MB）");
      }
      const path = uploadPath(resource, parsed.mime);
      const sha = await createBlob(cfg, parsed.bytes);
      entries.push({ path, mode: "100644", type: "blob", sha });
      return `/${path.replace(/^public\//, "")}`;
    }
    if (Array.isArray(value)) {
      const out = [];
      for (const item of value) out.push(await replaceDataUrls(item));
      return out;
    }
    if (value && typeof value === "object") {
      const out: Record<string, unknown> = {};
      for (const [key, item] of Object.entries(value)) {
        out[key] = await replaceDataUrls(item);
      }
      return out;
    }
    return value;
  }

  const normalizedRows = (await replaceDataUrls(rows)) as unknown[];
  const nextCms = JSON.parse(JSON.stringify(cms)) as Record<string, unknown>;
  nextCms[resource] = normalizedRows;

  const jsonSha = await createJsonBlob(cfg, nextCms);
  entries.push({
    path: "src/content/cms.json",
    mode: "100644",
    type: "blob",
    sha: jsonSha,
  });

  await createCommit(cfg, entries, `CMS: update ${resource}`);

  return normalizedRows;
}
