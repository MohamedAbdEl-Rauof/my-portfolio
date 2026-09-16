import Link from "next/link";
import "./globals.css";

/** Root 404, only reachable for paths outside any locale. */
export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <main className="wrap flex min-h-dvh flex-col justify-center gap-3 py-16">
          <p className="numeric text-sm text-muted-foreground">404</p>
          <h1 className="text-2xl font-semibold">الصفحة غير موجودة</h1>
          <Link className="text-sm underline underline-offset-4" href="/ar">
            العودة إلى الرئيسية
          </Link>
        </main>
      </body>
    </html>
  );
}
