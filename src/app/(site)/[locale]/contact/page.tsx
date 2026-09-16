import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/common/SectionHeading";
import { WhatsAppComposer } from "@/components/contact/WhatsAppComposer";
import { getProfile, whatsappUrl } from "@/lib/content";
import { pageMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata({
    locale: locale as Locale,
    path: "/contact",
    title: t("title"),
    description: t("lead"),
    image: { url: `/og/contact-${locale}.jpg`, alt: t("title") },
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const key = locale as Locale;
  const t = await getTranslations("contact");
  const profile = getProfile();

  const rows = [
    {
      label: "WhatsApp",
      value: profile.whatsappDisplay,
      href: whatsappUrl(profile.whatsapp, t("defaultMessage")),
      ltr: true,
    },
    {
      label: t("email"),
      value: profile.email,
      href: `mailto:${profile.email}`,
      ltr: true,
    },
    ...profile.socials
      .filter((social) => social.id !== "email")
      .map((social) => ({
        label: social.label,
        value: social.label,
        href: social.url,
        ltr: false,
      })),
  ];

  return (
    <div className="wrap py-10 sm:py-16">
      <SectionHeading as="h1" title={t("title")} lead={t("lead")} />

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_18rem]">
        <WhatsAppComposer
          number={profile.whatsapp}
          defaultMessage={t("defaultMessage")}
        />

        <dl className="tile divide-y self-start !py-2 text-sm">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="min-w-0 text-end">
                <a
                  href={row.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir={row.ltr ? "ltr" : undefined}
                  className="underline underline-offset-4 hover:text-muted-foreground"
                >
                  {row.value}
                </a>
              </dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-muted-foreground">{t("location")}</dt>
            <dd className="text-end">{profile.location[key]}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
