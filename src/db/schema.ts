import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

/** Hero background images for the Home page crossfade. */
export const heroImages = pgTable("hero_images", {
  id: serial("id").primaryKey(),
  src: text("src").notNull(),
  alt: text("alt").notNull().default(""),
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

/** Seasonal produce shown in 本季出產. period = "current" | "next" */
export const seasonalVegetables = pgTable("seasonal_vegetables", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  src: text("src").notNull().default(""),
  period: text("period").notNull().default("current"),
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

/** Individually ordered vegetables (獨立菜款). price stored as display string. */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: text("price").notNull().default(""),
  src: text("src").notNull().default(""),
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

/** Partner farms on the About page. images is an array of src strings. */
export const farms = pgTable("farms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

/** Payment instruction images, keyed by "bank" | "fps" | "payme". */
export const paymentMethods = pgTable("payment_methods", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  name: text("name").notNull(),
  detail: text("detail").notNull().default(""),
  image: text("image").notNull().default(""),
  sort: integer("sort").notNull().default(0),
});

/** Manually managed Instagram fallback gallery. */
export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  src: text("src").notNull(),
  caption: text("caption").notNull().default(""),
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});
