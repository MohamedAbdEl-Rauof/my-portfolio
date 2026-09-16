import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Download, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridGlow } from "@/components/background/GridGlow";
import { getProfile, whatsappUrl } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { SignalBoard } from "./SignalBoard";

export async function Hero() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const profile = getProfile();

  return (
    <section className="relative overflow-hidden border-b">
      <GridGlow />
      <div className="mx-auto max-w-(--container-content) px-4 pt-16 pb-12 sm:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            {profile.availability ? (
              <p className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal-soft px-3 py-1.5 text-xs text-signal">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-live"
                />
                {t("badge")}
              </p>
            ) : null}

            <h1 className="font-display text-5xl font-semibold text-balance sm:text-6xl">
              {profile.name[locale]}
            </h1>

            <p className="max-w-[24ch] font-display text-2xl text-balance text-muted-foreground sm:text-3xl">
              {t("headline")}
            </p>

            <p className="max-w-[62ch] text-muted-foreground">{t("intro")}</p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="lg" variant="signal" className="h-12">
                <a
                  href={whatsappUrl(profile.whatsapp, t("whatsappMessage"))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  {t("primaryCta")}
                </a>
              </Button>

              {/* Two plain links rather than a dropdown: there are exactly two
                  files, and a menu to choose between two things is a click
                  that buys nothing. */}
              <div className="flex items-center gap-2">
                <Button asChild size="lg" variant="outline" className="h-12">
                  <a href={profile.cv[locale]} download>
                    <Download className="size-5" aria-hidden="true" />
                    {t("cv")}
                  </a>
                </Button>
                <Button asChild size="lg" variant="ghost" className="h-12">
                  <a
                    href={locale === "ar" ? profile.cv.en : profile.cv.ar}
                    download
                  >
                    <span dir="ltr" className="eyebrow ltr">
                      {locale === "ar" ? "EN" : "AR"}
                    </span>
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto w-fit">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl bg-signal/15 blur-2xl"
              />
              <Image
                src={profile.photo}
                alt={t("photoAlt")}
                width={320}
                height={320}
                priority
                sizes="320px"
                className="relative rounded-2xl border-2 border-signal/40 object-cover"
              />
            </div>
          </div>
        </div>

        <SignalBoard className="mt-14" />
      </div>
    </section>
  );
}
