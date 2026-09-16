import { getTranslations } from "next-intl/server";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridGlow } from "@/components/background/GridGlow";
import { getProfile, whatsappUrl } from "@/lib/content";

export async function CtaBand() {
  const t = await getTranslations("home");
  const profile = getProfile();

  return (
    <section className="relative overflow-hidden border-t">
      <GridGlow />
      <div className="mx-auto flex max-w-(--container-content) flex-col items-start gap-6 px-4 py-20">
        <h2 className="font-display text-3xl font-semibold text-balance sm:text-4xl">
          {t("ctaTitle")}
        </h2>
        <p className="max-w-[52ch] text-muted-foreground">{t("ctaBody")}</p>
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
      </div>
    </section>
  );
}
