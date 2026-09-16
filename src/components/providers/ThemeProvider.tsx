"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/** Follows the system preference; either theme is a plain grey. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
