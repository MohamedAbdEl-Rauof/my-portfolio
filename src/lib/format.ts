import type { Locale } from "@/i18n/routing";

/**
 * Dates in content are YYYY-MM. Day precision would claim an accuracy these
 * records do not have, so everything is formatted as a month and a year.
 */
export function formatMonth(value: string, locale: Locale): string {
  const [year, month] = value.split("-").map(Number);
  // Arabic pages use Western digits: the CVs, the invoices and the client
  // systems this work is measured against all use them, and mixing numeral
  // systems inside one page reads as a bug.
  return new Intl.DateTimeFormat(
    locale === "ar" ? "ar-SA-u-nu-latn" : "en-GB",
    {
      month: "long",
      year: "numeric",
      calendar: "gregory",
    },
  ).format(new Date(Date.UTC(year, month - 1, 1)));
}

/** "March 2026 – July 2026", or "April 2026 – present" while ongoing. */
export function formatRange(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
): string {
  const from = formatMonth(start, locale);
  const to = end ? formatMonth(end, locale) : presentLabel;
  return from === to ? from : `${from} – ${to}`;
}

/** Whole months between two YYYY-MM values, inclusive of both ends. */
export function monthsBetween(start: string, end: string | null): number {
  const [sy, sm] = start.split("-").map(Number);
  const now = new Date();
  const [ey, em] = end
    ? end.split("-").map(Number)
    : [now.getUTCFullYear(), now.getUTCMonth() + 1];
  return (ey - sy) * 12 + (em - sm) + 1;
}
