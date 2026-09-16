import "../globals.css";

/**
 * Root layout for the bare domain only.
 *
 * `/` used to answer with a bodyless redirect, which left link-preview
 * fetchers with nothing to read. This tree serves a real document carrying
 * the social card, then forwards to /ar in zero seconds. Everything else lives
 * under the (site) group.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta httpEquiv="refresh" content="0;url=/ar" />
      </head>
      <body>{children}</body>
    </html>
  );
}
