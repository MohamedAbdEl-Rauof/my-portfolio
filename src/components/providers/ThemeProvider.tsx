"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/** Dark is the designed default; the system preference still wins if set. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
