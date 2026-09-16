import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
  Readex_Pro,
} from "next/font/google";
import { routing, dirFor, type Locale } from "@/i18n/routing";
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
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "800"],
  display: "swap",
  preload: false,
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/* Arabic is the default locale, but an English visitor should not pay for a
   font they never render. `preload: false` keeps it out of /en's critical path
   while `html[lang=ar] body` still picks it up. */
const readex = Readex_Pro({
  variable: "--font-readex",
  subsets: ["arabic", "latin"],
  // Four weights, not five: nothing on the site sets 300.
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximumScale: pinch-zoom is a WCAG 1.4.4 requirement.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
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
    // Page titles are short names; this appends who the site belongs to.
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

  /*
   * Only reference the faces the page will actually render.
   *
   * Readex Pro carries both Arabic and Latin, and `html[lang="ar"]` switches the
   * whole body to it, so on an Arabic page Bricolage and Instrument would be
   * downloaded and then used for almost nothing. Leaving their variables
   * undefined lets the font fall through to the next family in the stack and
   * keeps roughly 70 KB off the Arabic pages.
   */
  const fontVariables =
    key === "ar"
      ? `${readex.variable} ${jetbrains.variable}`
      : `${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`;

  // Named skills give the Person schema something concrete to describe rather
  // than a generic job title.
  const knowsAbout = resolveTech(
    getSkills().groups.flatMap((group) => group.items),
  ).map((item) => item.name);
  const alumniOf = getEducation().entries[0].institution.en;

  return (
    <html
      lang={locale}
      dir={dirFor(locale as Locale)}
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        {/*
          Scroll reveals render their starting state into the server HTML, so
          without JavaScript those sections would sit at `opacity: 0` forever.
          This is the one case where the content has to be forced back.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
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
