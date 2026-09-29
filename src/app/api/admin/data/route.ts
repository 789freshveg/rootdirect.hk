import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getCmsData } from "@/lib/data";

/** Returns every CMS row — including hidden ones — for the admin editor. */
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "未登入" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, ...getCmsData() });
}
