import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { AnimatedName } from "@/components/motion/AnimatedName";
import { getProfile, whatsappUrl } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export async function Hero() {
  const t = await getTranslations("home");
  const locale = (await getLocale()) as Locale;
  const profile = getProfile();

  return (
    <section className="hero">
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="wrap relative flex flex-col items-start gap-3.5 pt-14 pb-10 sm:pt-22 sm:pb-16">
        <Image
          src={profile.photo}
          alt={t("photoAlt")}
          width={96}
          height={96}
          priority
          sizes="96px"
          className="avatar size-18 sm:size-24"
          style={{ "--d": "0ms" } as React.CSSProperties}
        />
        {profile.availability ? (
          <p
            className="badge rise"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            <span className="live-dot" aria-hidden="true" />
            {t("openToWork")} · {profile.location[locale]}
          </p>
        ) : null}

        <AnimatedName text={profile.name[locale]} locale={locale} />

        <p
          className="rise text-lg font-medium text-muted-foreground"
          style={{ "--d": "520ms" } as React.CSSProperties}
        >
          {profile.headline[locale]}
        </p>
        <p
          className="rise max-w-[62ch] text-base text-muted-foreground"
          style={{ "--d": "600ms" } as React.CSSProperties}
        >
          {t("intro")}
        </p>

        <div
          className="rise mt-2 flex flex-wrap gap-3"
          style={{ "--d": "680ms" } as React.CSSProperties}
        >
          <a
            className="btn btn-primary"
            href={whatsappUrl(profile.whatsapp, t("whatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("primaryCta")}
          </a>
          <a className="btn btn-ghost" href={profile.cv[locale]} download>
            {t("cv")}
          </a>
        </div>
      </div>
    </section>
  );
}
