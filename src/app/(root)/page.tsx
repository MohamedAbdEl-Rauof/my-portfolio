import type { Metadata } from "next";
import Link from "next/link";
import { getProfile } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/config/site";

export function generateMetadata(): Metadata {
  const profile = getProfile();
  const base = pageMetadata({
    locale: "ar",
    path: "/",
    title: `${profile.name.ar} — ${profile.headline.ar}`,
    description: profile.headline.ar,
    image: {
      url: "/og/home-ar.jpg",
      alt: `${profile.name.ar} — ${profile.headline.ar}`,
    },
  });

  return {
    ...base,
    // This tree has no locale layout to inherit a base from.
    metadataBase: new URL(absoluteUrl()),
    // The real page is /ar; this one exists for crawlers and the refresh.
    alternates: { ...base.alternates, canonical: "/ar" },
    robots: { index: false, follow: true },
  };
}

export default function RootPage() {
  const profile = getProfile();

  return (
    <main className="wrap py-16">
      <p className="text-base">
        {profile.name.ar} — {profile.headline.ar}
      </p>
      <Link
        href="/ar"
        className="mt-4 inline-block text-sm underline underline-offset-4"
      >
        الدخول إلى الموقع
      </Link>
    </main>
  );
}
