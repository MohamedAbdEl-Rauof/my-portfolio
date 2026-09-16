import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { CertificateGrid } from "@/components/about/CertificateGrid";
import { GridGlow } from "@/components/background/GridGlow";
import { getProfile, getEducation, getCertificates } from "@/lib/content";
import { formatMonth } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("lead") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const key = locale as Locale;
  const t = await getTranslations("about");
  const home = await getTranslations("home");
  const profile = getProfile();
  const education = getEducation();
  const certificates = getCertificates();

  return (
    <main className="relative">
      <GridGlow />

      <div className="mx-auto max-w-(--container-content) px-4 py-16">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <SectionHeading as="h1" title={t("title")} lead={t("lead")} />
            <p className="max-w-[64ch] text-muted-foreground">
              {home("intro")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="h-11">
                <a href={profile.cv[key]} download>
                  <Download className="size-4" aria-hidden="true" />
                  {home("cv")}
                </a>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-4">
            <Image
              src={profile.photo}
              alt={home("photoAlt")}
              width={320}
              height={320}
              sizes="320px"
              className="mx-auto rounded-2xl border-2 border-signal/40 object-cover"
            />
          </div>
        </div>

        <section className="mt-20 space-y-8">
          <SectionHeading title={t("experience")} />
          <ExperienceTimeline />
        </section>

        <section className="mt-20 space-y-8">
          <SectionHeading title={t("education")} />
          <ul className="space-y-6">
            {education.entries.map((entry) => (
              <li key={entry.institution.en} className="space-y-1">
                <p className="numeric eyebrow text-muted-foreground">
                  {entry.start} – {entry.end}
                </p>
                <h3 className="font-display text-xl font-semibold">
                  {entry.degree[key]}
                </h3>
                <p className="text-sm text-signal">{entry.institution[key]}</p>
                <p className="text-sm text-muted-foreground">
                  {entry.location[key]}
                </p>
                {entry.note ? (
                  <p className="pt-1 text-sm text-muted-foreground">
                    {entry.note[key]}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section id="certificates" className="mt-20 scroll-mt-24 space-y-8">
          <SectionHeading title={t("certificates")} />
          <CertificateGrid
            items={certificates.items.map((item) => ({
              id: item.id,
              title: item.title[key],
              issuer: item.issuer[key],
              date: formatMonth(item.date, key),
              image: item.image,
            }))}
          />
        </section>
      </div>
    </main>
  );
}
