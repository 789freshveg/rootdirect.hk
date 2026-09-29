import cms from "@/content/cms.json";

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

export type CmsData = {
  hero: HeroImage[];
  seasonal: SeasonalVeg[];
  products: Product[];
  farms: Farm[];
  gallery: Gallery[];
  payments: Payment[];
};

const data = cms as CmsData;

export function getCmsData(): CmsData {
  return data;
}

export async function getHeroImages(): Promise<HeroImage[]> {
  return data.hero.filter((r) => r.visible);
}

export async function getSeasonal(period: "current" | "next"): Promise<SeasonalVeg[]> {
  return data.seasonal.filter((r) => r.visible && r.period === period);
}

export async function getProducts(): Promise<Product[]> {
  return data.products.filter((r) => r.visible);
}

export async function getFarms(): Promise<Farm[]> {
  return data.farms.filter((r) => r.visible);
}

export async function getGallery(): Promise<Gallery[]> {
  return data.gallery.filter((r) => r.visible);
}

export async function getPayments(): Promise<Payment[]> {
  return data.payments;
}
