import Link from "next/link";
import "./globals.css";

/**
 * Root-level 404. Only reachable for paths outside any locale (the proxy
 * redirects everything else), so it carries no translations of its own.
 */
export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <main className="mx-auto flex min-h-dvh max-w-(--container-content) flex-col justify-center gap-6 px-4 py-24">
          <p className="font-mono text-6xl font-medium text-signal tabular">
            404
          </p>
          <h1 className="font-display text-3xl font-semibold">
            الصفحة غير موجودة
          </h1>
          <Link className="text-signal underline underline-offset-4" href="/ar">
            العودة إلى الرئيسية
          </Link>
        </main>
      </body>
    </html>
  );
}
