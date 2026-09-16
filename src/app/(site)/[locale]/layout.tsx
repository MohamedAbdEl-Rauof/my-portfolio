import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Geist, IBM_Plex_Sans_Arabic } from "next/font/google";
import { routing, dirFor, type Locale } from "@/i18n/routing";
import { MotionRuntime } from "@/components/motion/MotionRuntime";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import {
  getProfile,
  getSkills,
  getEducation,
  resolveTech,
  whatsappUrl,
} from "@/lib/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema, websiteSchema } from "@/lib/seo/jsonLd";
import { absoluteUrl } from "@/lib/config/site";
import "../../globals.css";

/* The pairing from the owner's original portfolio: Geist for Latin, IBM Plex
   Sans Arabic for Arabic. Both preload; they are the design. */
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  // No weight list: Geist is a variable font, so every weight is one file.
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  // Static family, two weights. Each weight ships an Arabic file plus a
  // Latin-range file that any Latin word triggers, so every extra weight
  // costs two downloads; medium labels synthesise from regular.
  weight: ["400", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximumScale: pinch-zoom is a WCAG 1.4.4 requirement.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const profile = getProfile();
  const key = locale as Locale;

  return {
    metadataBase: new URL(absoluteUrl()),
    title: {
      default: `${profile.name[key]} — ${profile.headline[key]}`,
      template: `%s — ${profile.name[key]}`,
    },
    description: profile.headline[key],
    authors: [{ name: profile.name.en, url: absoluteUrl(`/${key}`) }],
    creator: profile.name.en,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Opts every page under this layout into static rendering.
  setRequestLocale(locale);

  const profile = getProfile();
  const t = await getTranslations("home");
  const key = locale as Locale;

  const knowsAbout = resolveTech(
    getSkills().groups.flatMap((group) => group.items),
  ).map((item) => item.name);
  const alumniOf = getEducation().entries[0].institution.en;

  return (
    <html
      lang={locale}
      dir={dirFor(key)}
      suppressHydrationWarning
      className={`${geist.variable} ${plexArabic.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <NextIntlClientProvider>
            <JsonLd
              data={personSchema({
                profile,
                locale: key,
                knowsAbout,
                alumniOf,
              })}
            />
            <JsonLd data={websiteSchema({ profile, locale: key })} />
            <MotionRuntime />
            <SkipLink />
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppFab
              href={whatsappUrl(profile.whatsapp, t("whatsappMessage"))}
            />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
