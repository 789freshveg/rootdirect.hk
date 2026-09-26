import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { db } from "@/db";
import {
  farms,
  galleryItems,
  heroImages,
  paymentMethods,
  products,
  seasonalVegetables,
} from "@/db/schema";

/** Returns every row — including hidden ones — so the editor never drops content. */
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "未登入" }, { status: 401 });
  }

  const [hero, seasonal, productList, farmList, gallery, payments] =
    await Promise.all([
      db.select().from(heroImages).orderBy(heroImages.sort),
      db.select().from(seasonalVegetables).orderBy(seasonalVegetables.sort),
      db.select().from(products).orderBy(products.sort),
      db.select().from(farms).orderBy(farms.sort),
      db.select().from(galleryItems).orderBy(galleryItems.sort),
      db.select().from(paymentMethods).orderBy(paymentMethods.sort),
    ]);

  return NextResponse.json({
    ok: true,
    hero,
    seasonal,
    products: productList,
    farms: farmList.map((f) => ({ ...f, images: (f.images as string[]) ?? [] })),
    gallery,
    payments,
  });
}
