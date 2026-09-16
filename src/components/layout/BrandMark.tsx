import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProfile } from "@/lib/content";

/**
 * The monogram plus the name, linking home. Inline SVG rather than an <img>
 * so the mark inherits the current colour in both themes.
 */
export async function BrandMark() {
  const t = await getTranslations("a11y");
  const profile = getProfile();

  return (
    <Link
      href="/"
      aria-label={t("homeLink")}
      className="group flex min-h-11 items-center gap-3"
    >
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="size-8 shrink-0 rounded-[10px]"
      >
        <rect width="64" height="64" rx="14" className="fill-foreground" />
        <g className="fill-signal">
          <rect x="14" y="16" width="7" height="32" rx="3.5" />
          <rect x="43" y="16" width="7" height="32" rx="3.5" />
          <rect
            x="24.5"
            y="22"
            width="6.5"
            height="17"
            rx="3.25"
            transform="rotate(-18 27.75 30.5)"
          />
          <rect
            x="33"
            y="22"
            width="6.5"
            height="17"
            rx="3.25"
            transform="rotate(18 36.25 30.5)"
          />
        </g>
      </svg>
      <span className="hidden font-mono text-xs tracking-[0.2em] uppercase transition-colors group-hover:text-signal sm:inline">
        {profile.initials}
      </span>
    </Link>
  );
}
