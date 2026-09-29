import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { commitCmsUpdate } from "@/lib/github-cms";

const resources = new Set(["hero", "seasonal", "products", "farms", "gallery", "payments"]);

type Payload = {
  resource: string;
  rows: unknown[];
};

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "未登入" }, { status: 401 });
  }

  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "內容無效" }, { status: 400 });
  }

  if (!resources.has(payload.resource)) {
    return NextResponse.json({ ok: false, error: "未知資源" }, { status: 400 });
  }
  if (!Array.isArray(payload.rows)) {
    return NextResponse.json({ ok: false, error: "資料格式無效" }, { status: 400 });
  }

  try {
    const rows = await commitCmsUpdate(payload.resource, payload.rows);
    return NextResponse.json({
      ok: true,
      rows,
      message: "已儲存到 GitHub，Render 會自動重新部署網站。",
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "儲存失敗";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "使用 POST" }, { status: 405 });
}
