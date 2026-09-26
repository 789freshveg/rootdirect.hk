import { NextResponse } from "next/server";
import { eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import {
  farms,
  galleryItems,
  heroImages,
  paymentMethods,
  products,
  seasonalVegetables,
} from "@/db/schema";
import { isAuthed } from "@/lib/auth";

type Row = Record<string, unknown> & { id?: number };
type Payload = {
  resource: string;
  rows: Row[];
};

const tables = {
  hero: heroImages,
  seasonal: seasonalVegetables,
  products,
  farms,
  gallery: galleryItems,
  payments: paymentMethods,
} as const;

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

  const table = tables[payload.resource as keyof typeof tables];
  if (!table) {
    return NextResponse.json({ ok: false, error: "未知資源" }, { status: 400 });
  }

  const rows = Array.isArray(payload.rows) ? payload.rows : [];

  try {
    if (payload.resource === "payments") {
      for (const row of rows) {
        if (!row.key) continue;
        await db
          .insert(paymentMethods)
          .values({
            key: String(row.key),
            name: String(row.name ?? ""),
            detail: String(row.detail ?? ""),
            image: String(row.image ?? ""),
            sort: Number(row.sort ?? 0),
          })
          .onConflictDoUpdate({
            target: paymentMethods.key,
            set: {
              name: String(row.name ?? ""),
              detail: String(row.detail ?? ""),
              image: String(row.image ?? ""),
            },
          });
      }
      return NextResponse.json({ ok: true });
    }

    const keepIds = rows
      .map((r) => r.id)
      .filter((id): id is number => typeof id === "number");

    // delete rows that disappeared from the editor list
    const all = await db.select({ id: table.id }).from(table);
    const dropIds = all.map((r) => r.id).filter((id) => !keepIds.includes(id));
    if (dropIds.length > 0) {
      await db.delete(table).where(inArray(table.id, dropIds));
    }

    let sort = 0;
    for (const row of rows) {
      const { id, ...values } = row;
      if (typeof id === "number") {
        await db.update(table).set({ ...values, sort } as never).where(eq(table.id, id));
      } else {
        await db.insert(table).values({ ...values, sort } as never);
      }
      sort += 1;
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "儲存失敗";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "使用 POST" }, { status: 405 });
}
