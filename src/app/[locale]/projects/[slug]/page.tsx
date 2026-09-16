import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Lock,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StackList } from "@/components/projects/StackList";
import { StatusDot } from "@/components/projects/StatusDot";
import { VideoPlayer } from "@/components/projects/VideoPlayer";
import { Gallery } from "@/components/projects/Gallery";
import { GridGlow } from "@/components/background/GridGlow";
import { getProject, getProjects, getProjectNeighbours } from "@/lib/content";
import { formatRange } from "@/lib/format";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjects().map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const key = locale as Locale;

  return {
    title: project.seo?.title?.[key] ?? project.title[key],
    description: project.seo?.description?.[key] ?? project.tagline[key],
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const key = locale as Locale;
  const t = await getTranslations("project");
  const common = await getTranslations("common");
  const { previous, next } = getProjectNeighbours(slug);

  const meta = [
    { label: t("role"), value: project.role[key] },
    project.client ? { label: t("client"), value: project.client[key] } : null,
    {
      label: t("timeline"),
      value: formatRange(
        project.timeline.start,
        project.timeline.end,
        key,
        t("present"),
      ),
    },
  ].filter((row) => row !== null);

  return (
    <main className="relative">
      <GridGlow />

      <article className="mx-auto max-w-(--container-content) px-4 py-12">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-signal"
        >
          <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
          {t("backToWork")}
        </Link>

        <header className="mt-6 space-y-5">
          <StatusDot status={project.status} />
          <h1 className="font-display text-4xl font-semibold text-balance sm:text-5xl">
            {project.title[key]}
          </h1>
          <p className="max-w-[58ch] font-display text-xl text-balance text-muted-foreground">
            {project.tagline[key]}
          </p>

          {project.links.live || project.links.source ? (
            <div className="flex flex-wrap gap-3 pt-1">
              {project.links.live ? (
                <Button asChild variant="signal" className="h-11">
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="size-4" aria-hidden="true" />
                    {common("visitSite")}
                  </a>
                </Button>
              ) : null}
              {project.links.source ? (
                <Button asChild variant="outline" className="h-11">
                  <a
                    href={project.links.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="size-4" aria-hidden="true" />
                    {common("viewSource")}
                  </a>
                </Button>
              ) : null}
            </div>
          ) : null}
        </header>

        <div className="mt-10 overflow-hidden rounded-xl border">
          <Image
            src={project.cover}
            alt={project.coverAlt[key]}
            width={1600}
            height={1000}
            priority
            sizes="(min-width: 1180px) 1180px, 100vw"
            className="w-full object-cover object-top"
          />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <p className="text-lg text-muted-foreground">
              {project.summary[key]}
            </p>

            <section className="space-y-4">
              <h2 className="eyebrow text-signal">{t("highlights")}</h2>
              <ul className="space-y-3">
                {project.highlights.map((highlight) => (
                  <li key={highlight.en} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-signal"
                    />
                    <span className="max-w-[64ch] text-muted-foreground">
                      {highlight[key]}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {project.video ? (
              <section className="space-y-4">
                <h2 className="eyebrow text-signal">{t("watchDemo")}</h2>
                <VideoPlayer
                  src={project.video.src}
                  poster={project.video.poster}
                  alt={project.coverAlt[key]}
                />
              </section>
            ) : null}

            {project.gallery.length > 0 ? (
              <section className="space-y-4">
                <h2 className="eyebrow text-signal">{t("gallery")}</h2>
                <Gallery
                  items={project.gallery.map((image) => ({
                    src: image.src,
                    alt: image.alt[key],
                    caption: image.caption?.[key],
                  }))}
                />
              </section>
            ) : null}
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <dl className="space-y-4">
              {meta.map((row) => (
                <div key={row.label} className="space-y-1">
                  <dt className="eyebrow text-muted-foreground">{row.label}</dt>
                  <dd className="text-sm">{row.value}</dd>
                </div>
              ))}
            </dl>

            <Separator />

            <div className="space-y-3">
              <h2 className="eyebrow text-muted-foreground">{t("stack")}</h2>
              <StackList ids={project.stack} />
            </div>

            {project.metrics.length > 0 ? (
              <>
                <Separator />
                <dl className="space-y-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label.en} className="space-y-1">
                      <dt className="eyebrow text-muted-foreground">
                        {metric.label[key]}
                      </dt>
                      <dd
                        dir="ltr"
                        className="numeric tabular font-mono text-2xl text-signal"
                      >
                        {metric.value}
                      </dd>
                      {metric.note ? (
                        <p className="text-xs text-muted-foreground">
                          {metric.note[key]}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </dl>
              </>
            ) : null}

            {project.private && project.privateNote ? (
              <div className="space-y-2 rounded-xl border border-signal/25 bg-signal-soft p-4">
                <p className="eyebrow flex items-center gap-2 text-signal">
                  <Lock className="size-3.5" aria-hidden="true" />
                  {t("privateTitle")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {project.privateNote[key]}
                </p>
              </div>
            ) : null}
          </aside>
        </div>

        <nav className="mt-16 flex flex-wrap justify-between gap-4 border-t pt-8">
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="group flex min-h-11 max-w-[45%] flex-col gap-1"
            >
              <span className="eyebrow text-muted-foreground">
                {t("previous")}
              </span>
              <span className="flex items-center gap-2 transition-colors group-hover:text-signal">
                <ArrowLeft
                  className="size-4 rtl:-scale-x-100"
                  aria-hidden="true"
                />
                {previous.title[key]}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex min-h-11 max-w-[45%] flex-col gap-1 text-end"
            >
              <span className="eyebrow text-muted-foreground">{t("next")}</span>
              <span className="flex items-center gap-2 transition-colors group-hover:text-signal">
                {next.title[key]}
                <ArrowRight
                  className="size-4 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ) : null}
        </nav>
      </article>
    </main>
  );
}
