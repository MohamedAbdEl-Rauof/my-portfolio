import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { CertificateGrid } from "@/components/about/CertificateGrid";
import { getProfile, getEducation, getCertificates } from "@/lib/content";
import { formatMonth } from "@/lib/format";
import { pageMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/about",
    title: t("title"),
    description: t("lead"),
    image: { url: `/og/about-${locale}.jpg`, alt: t("title") },
  });
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
    <div className="wrap py-10 sm:py-16">
      <div className="flex items-start gap-4 sm:gap-5">
        <Image
          src={profile.photo}
          alt={home("photoAlt")}
          width={96}
          height={96}
          sizes="96px"
          className="avatar size-20 shrink-0 sm:size-24"
        />
        <div className="min-w-0">
          <SectionHeading as="h1" title={t("title")} lead={t("lead")} />
          <p className="mt-4 max-w-[62ch] text-base">{home("intro")}</p>
          <a href={profile.cv[key]} download className="btn btn-ghost mt-4">
            {home("cv")}
          </a>
        </div>
      </div>

      <section className="reveal mt-12">
        <SectionHeading title={t("experience")} />
        <div className="mt-4">
          <ExperienceTimeline />
        </div>
      </section>

      <section className="reveal mt-12">
        <SectionHeading title={t("education")} />
        <ul className="mt-4 divide-y">
          {education.entries.map((entry) => (
            <li key={entry.institution.en} className="py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-medium">{entry.degree[key]}</h3>
                <span className="numeric text-xs text-muted-foreground">
                  {entry.start} – {entry.end}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {entry.institution[key]} · {entry.location[key]}
              </p>
              {entry.note ? (
                <p className="mt-2 text-sm">{entry.note[key]}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section id="certificates" className="reveal mt-12 scroll-mt-20">
        <SectionHeading title={t("certificates")} />
        <div className="mt-4">
          <CertificateGrid
            items={certificates.items.map((item) => ({
              id: item.id,
              title: item.title[key],
              issuer: item.issuer[key],
              date: formatMonth(item.date, key),
              image: item.image,
            }))}
          />
        </div>
      </section>
    </div>
  );
}
