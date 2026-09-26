import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "yz_admin_session";

/** Optional pepper; the password itself always comes from the environment. */
const SECRET = process.env.ADMIN_SECRET ?? "";

/** Returns "" when ADMIN_PASSWORD is not configured — the CMS is then locked. */
export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function expectedToken(): string {
  return createHash("sha256")
    .update(`${adminPassword()}|${SECRET}`)
    .digest("hex");
}

export function checkPassword(input: string): boolean {
  const target = adminPassword();
  if (!target || !input) return false;
  return safeEqual(input, target);
}

export async function isAuthed(): Promise<boolean> {
  if (!adminPassword()) return false;
  const store = await cookies();
  const value = store.get(ADMIN_COOKIE)?.value ?? "";
  return value.length > 0 && safeEqual(value, expectedToken());
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}
