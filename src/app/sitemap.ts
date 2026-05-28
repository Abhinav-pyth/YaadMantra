import type { MetadataRoute } from "next";
import { starterMnemonics } from "@/utils/data";

const baseUrl = "https://yaadmantra.vercel.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/categories", "/favorites", "/quiz", "/flashcards", "/create", "/about"].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: new Date("2026-05-28"),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8
  }));

  const mnemonicRoutes = starterMnemonics.map((mnemonic) => ({
    url: `${baseUrl}/mnemonic/${mnemonic.id}/`,
    lastModified: new Date("2026-05-28"),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...mnemonicRoutes];
}
