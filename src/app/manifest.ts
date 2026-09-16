import type { MetadataRoute } from "next";
import { getProfile } from "@/lib/content";
import { routing } from "@/i18n/routing";

export default function manifest(): MetadataRoute.Manifest {
  const profile = getProfile();
  const locale = routing.defaultLocale;

  return {
    name: `${profile.name[locale]} — ${profile.headline[locale]}`,
    short_name: profile.shortName[locale],
    description: profile.headline[locale],
    lang: locale,
    dir: "rtl",
    start_url: `/${locale}`,
    scope: "/",
    display: "standalone",
    background_color: "#0b1220",
    theme_color: "#0b1220",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
