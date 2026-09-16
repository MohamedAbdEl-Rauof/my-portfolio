import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo/metadata";
import { getProfile } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/home/Hero";
import { StatsRow } from "@/components/home/StatsRow";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServiceTiles } from "@/components/home/ServiceTiles";
import { SkillTiles } from "@/components/home/SkillTiles";
import { ExperienceTiles } from "@/components/home/ExperienceTiles";
import { ContactBand } from "@/components/home/ContactBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const key = locale as Locale;
  const t = await getTranslations({ locale, namespace: "home" });
  const profile = getProfile();
  return pageMetadata({
    locale: key,
    path: "/",
    title: `${profile.name[key]} — ${profile.headline[key]}`,
    description: t("intro"),
    image: {
      url: `/og/home-${key}.jpg`,
      alt: `${profile.name[key]} — ${profile.headline[key]}`,
    },
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <div className="wrap flex flex-col gap-14 py-10 sm:gap-20 sm:py-16">
        <StatsRow />
        <SelectedWork />
        <ServiceTiles />
        <SkillTiles />
        <ExperienceTiles />
        <ContactBand />
      </div>
    </>
  );
}
