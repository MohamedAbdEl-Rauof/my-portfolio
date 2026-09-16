import { getTranslations } from "next-intl/server";
import { getProfile, whatsappUrl } from "@/lib/content";

export async function ContactBand() {
  const t = await getTranslations("home");
  const profile = getProfile();

  return (
    <section className="reveal">
      <div
        className="tile contact-band flex flex-wrap items-center justify-between gap-5"
        style={{ "--n": 0 } as React.CSSProperties}
      >
        <div className="relative">
          <h2 className="text-xl font-bold">{t("ctaTitle")}</h2>
          <p className="mt-1.5 max-w-[52ch] text-base text-muted-foreground">
            {t("ctaBody")}
          </p>
        </div>
        <a
          className="btn btn-primary relative"
          href={whatsappUrl(profile.whatsapp, t("whatsappMessage"))}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("primaryCta")}
        </a>
      </div>
    </section>
  );
}
