import { setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GridGlow } from "@/components/background/GridGlow";

/**
 * Design-system reference. Development aid only, removed in the cleanup phase;
 * it exists so tokens, type scale and component states can be reviewed on one
 * screen in both themes and both directions.
 */
export const metadata = { robots: { index: false, follow: false } };

const SWATCHES = [
  ["background", "bg-background"],
  ["card", "bg-card"],
  ["muted", "bg-muted"],
  ["signal", "bg-signal"],
  ["live", "bg-live"],
  ["destructive", "bg-destructive"],
] as const;

const STEPS = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
  "text-4xl",
  "text-5xl",
] as const;

export default async function KitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative mx-auto max-w-(--container-content) space-y-12 px-4 py-16">
      <GridGlow />

      <section className="space-y-4">
        <h1 className="font-display text-4xl font-semibold">Design kit</h1>
        <p className="text-muted-foreground">
          Tokens and component states. Not linked from the site.
        </p>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="eyebrow ltr">Colour</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {SWATCHES.map(([name, cls]) => (
            <div key={name} className="space-y-2">
              <div className={`h-16 rounded-md border ${cls}`} />
              <p className="font-mono text-xs">{name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="eyebrow ltr">Type</h2>
        {STEPS.map((step) => (
          <p key={step} className={`${step} font-display`}>
            <span className="font-mono text-xs text-muted-foreground">
              {step}
            </span>{" "}
            {locale === "ar" ? "محمد عبد الرؤوف" : "Mohamed Abd El-Raouf"}
          </p>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="eyebrow ltr">Buttons</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="signal">Signal</Button>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="eyebrow ltr">Card</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-display">Plain card</CardTitle>
              <CardDescription>Default surface and border.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Body copy sits at 1.6 line height.
            </CardContent>
          </Card>
          <Card className="glass transition-shadow hover:shadow-glow">
            <CardHeader>
              <CardTitle className="font-display">Glass card</CardTitle>
              <CardDescription>Hover for the signal glow.</CardDescription>
            </CardHeader>
            <CardContent className="tabular font-mono text-sm">
              98 · 100 · 100
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
