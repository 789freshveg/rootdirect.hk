import type { MetadataRoute } from "next";

const base = "https://rootdirect.hk";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/howtoorder`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/order`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
