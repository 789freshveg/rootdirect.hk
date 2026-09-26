import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  farms,
  galleryItems,
  heroImages,
  paymentMethods,
  products,
  seasonalVegetables,
} from "@/db/schema";
import { seed } from "@/content/site";

export type HeroImage = { id: number; src: string; alt: string; visible: boolean };
export type SeasonalVeg = {
  id: number;
  name: string;
  src: string;
  period: string;
  visible: boolean;
};
export type Product = { id: number; name: string; price: string; src: string; visible: boolean };
export type Farm = {
  id: number;
  name: string;
  description: string;
  images: string[];
  visible: boolean;
};
export type Gallery = { id: number; src: string; caption: string; visible: boolean };
export type Payment = { id: number; key: string; name: string; detail: string; image: string };

async function ensureSeeded() {
  const [h, s, p, f, g, pay] = await Promise.all([
    db.select({ id: heroImages.id }).from(heroImages).limit(1),
    db.select({ id: seasonalVegetables.id }).from(seasonalVegetables).limit(1),
    db.select({ id: products.id }).from(products).limit(1),
    db.select({ id: farms.id }).from(farms).limit(1),
    db.select({ id: galleryItems.id }).from(galleryItems).limit(1),
    db.select({ id: paymentMethods.id }).from(paymentMethods).limit(1),
  ]);

  if (h.length === 0) {
    await db.insert(heroImages).values(
      seed.hero.map((x, i) => ({ src: x.src, alt: x.alt, sort: i })),
    );
  }
  if (s.length === 0) {
    await db.insert(seasonalVegetables).values(
      seed.seasonal.map((x, i) => ({
        name: x.name,
        src: x.src,
        period: x.period,
        sort: i,
      })),
    );
  }
  if (p.length === 0) {
    await db.insert(products).values(
      seed.products.map((x, i) => ({ name: x.name, price: x.price, src: x.src, sort: i })),
    );
  }
  if (f.length === 0) {
    await db.insert(farms).values(
      seed.farms.map((x, i) => ({
        name: x.name,
        description: x.description,
        images: [...x.images],
        sort: i,
      })),
    );
  }
  if (g.length === 0) {
    await db.insert(galleryItems).values(
      seed.gallery.map((x, i) => ({ src: x.src, caption: x.caption, sort: i })),
    );
  }
  if (pay.length === 0) {
    await db
      .insert(paymentMethods)
      .values(seed.payments.map((x, i) => ({ ...x, sort: i })));
  }
}

let seeded: Promise<void> | null = null;
function seedOnce() {
  if (!seeded) seeded = ensureSeeded().catch((e) => { seeded = null; throw e; });
  return seeded;
}

const bySort = (a: { id: number }, b: { id: number }) => a.id - b.id;

export async function getHeroImages(): Promise<HeroImage[]> {
  await seedOnce();
  const rows = await db.select().from(heroImages).orderBy(heroImages.sort);
  return rows.filter((r) => r.visible).map((r) => ({ id: r.id, src: r.src, alt: r.alt, visible: r.visible }));
}

export async function getSeasonal(period: "current" | "next"): Promise<SeasonalVeg[]> {
  await seedOnce();
  const rows = await db
    .select()
    .from(seasonalVegetables)
    .orderBy(seasonalVegetables.sort);
  return rows
    .filter((r) => r.visible && r.period === period)
    .map((r) => ({ id: r.id, name: r.name, src: r.src, period: r.period, visible: r.visible }));
}

export async function getProducts(): Promise<Product[]> {
  await seedOnce();
  const rows = await db.select().from(products).orderBy(products.sort);
  return rows
    .filter((r) => r.visible)
    .map((r) => ({ id: r.id, name: r.name, price: r.price, src: r.src, visible: r.visible }));
}

export async function getFarms(): Promise<Farm[]> {
  await seedOnce();
  const rows = await db.select().from(farms).orderBy(farms.sort);
  return rows
    .filter((r) => r.visible)
    .map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      images: (r.images as string[]) ?? [],
      visible: r.visible,
    }));
}

export async function getGallery(): Promise<Gallery[]> {
  await seedOnce();
  const rows = await db.select().from(galleryItems).orderBy(galleryItems.sort);
  return rows
    .filter((r) => r.visible)
    .map((r) => ({ id: r.id, src: r.src, caption: r.caption, visible: r.visible }));
}

export async function getPayments(): Promise<Payment[]> {
  await seedOnce();
  const rows = await db.select().from(paymentMethods).orderBy(paymentMethods.sort);
  return rows.map((r) => ({
    id: r.id,
    key: r.key,
    name: r.name,
    detail: r.detail,
    image: r.image,
  }));
}
