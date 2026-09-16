import { notFound } from "next/navigation";

/**
 * Unmatched paths under a locale render the locale's own not-found page, with
 * the right language, direction and chrome, instead of the bare root 404.
 */
export default function CatchAllPage() {
  notFound();
}
