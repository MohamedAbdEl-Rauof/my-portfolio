import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Github, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { WhatsAppComposer } from "@/components/contact/WhatsAppComposer";
import { GridGlow } from "@/components/background/GridGlow";
import { getProfile, whatsappUrl } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("lead") };
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
  const home = await getTranslations("home");
  const profile = getProfile();

  const github = profile.socials.find((social) => social.id === "github");
  const linkedin = profile.socials.find((social) => social.id === "linkedin");

  const cards = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: profile.whatsappDisplay,
      href: whatsappUrl(profile.whatsapp, t("defaultMessage")),
      ltr: true,
    },
    {
      icon: Mail,
      label: t("email"),
      value: profile.email,
      href: `mailto:${profile.email}`,
      ltr: true,
    },
    linkedin
      ? {
          icon: Linkedin,
          label: "LinkedIn",
          value: linkedin.label,
          href: linkedin.url,
          ltr: false,
        }
      : null,
    github
      ? {
          icon: Github,
          label: "GitHub",
          value: "MohamedAbdEl-Rauof",
          href: github.url,
          ltr: true,
        }
      : null,
  ].filter((card) => card !== null);

  return (
    <main className="relative">
      <GridGlow />
      <div className="mx-auto max-w-(--container-content) px-4 py-16">
        <SectionHeading as="h1" title={t("title")} lead={t("lead")} />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <WhatsAppComposer
              number={profile.whatsapp}
              defaultMessage={t("defaultMessage")}
            />
          </div>

          <ul className="space-y-3 lg:col-span-5">
            {cards.map((card) => (
              <li key={card.label}>
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-signal/40"
                >
                  <card.icon
                    className="size-5 shrink-0 text-signal"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 space-y-0.5">
                    <span className="eyebrow block text-muted-foreground">
                      {card.label}
                    </span>
                    <span
                      dir={card.ltr ? "ltr" : undefined}
                      className="block truncate text-sm"
                    >
                      {card.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
            <li className="flex min-h-11 items-center gap-4 rounded-xl border bg-card p-4">
              <MapPin
                className="size-5 shrink-0 text-signal"
                aria-hidden="true"
              />
              <span className="space-y-0.5">
                <span className="eyebrow block text-muted-foreground">
                  {t("location")}
                </span>
                <span className="block text-sm">{profile.location[key]}</span>
              </span>
            </li>
          </ul>
        </div>

        <p className="sr-only">{home("whatsappMessage")}</p>
      </div>
    </main>
  );
}
