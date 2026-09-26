import { NextResponse } from "next/server";
import {
  adminPassword,
  checkPassword,
  expectedToken,
  ADMIN_COOKIE,
} from "@/lib/auth";

export async function POST(req: Request) {
  let body: { password?: string } = { password: "" };
  try {
    body = await req.json();
  } catch {
    /* ignore */
  }

  const password = body.password ?? "";
  if (!adminPassword()) {
    return NextResponse.json(
      { ok: false, error: "伺服器未設定 ADMIN_PASSWORD，請先設定環境變數。" },
      { status: 503 },
    );
  }
  if (!password || !checkPassword(password)) {
    return NextResponse.json({ ok: false, error: "密碼不正確" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
