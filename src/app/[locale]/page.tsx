import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Services } from "@/components/home/Services";
import { TechStack } from "@/components/home/TechStack";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { CtaBand } from "@/components/home/CtaBand";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <SelectedWork />
      <Services />
      <TechStack />
      <ExperiencePreview />
      <CtaBand />
    </>
  );
}
