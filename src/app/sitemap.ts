import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://YOUR_DOMAIN",
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://YOUR_DOMAIN/terms",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://YOUR_DOMAIN/privacy",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}