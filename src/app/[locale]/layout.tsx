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
import { getProfile, whatsappUrl } from "@/lib/content";
import { absoluteUrl } from "@/lib/config/site";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "800"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
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
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
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

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
};

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

  return (
    <html
      lang={locale}
      dir={dirFor(locale as Locale)}
      suppressHydrationWarning
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable} ${readex.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <NextIntlClientProvider>
            <SkipLink />
            <Header />
            <div id="main" className="flex-1">
              {children}
            </div>
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
