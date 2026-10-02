import type { Theme } from "../types/menu";

const RADIUS = { sm: "8px", md: "14px", xl: "22px" } as const;

/** Writes the theme to CSS variables; Tailwind tokens in index.css read from them. */
export function applyTheme(theme: Theme): void {
  const r = document.documentElement.style;
  r.setProperty("--color-primary", theme.primary);
  r.setProperty("--color-secondary", theme.secondary);
  r.setProperty("--color-bg", theme.background);
  r.setProperty("--color-surface", theme.surface);
  r.setProperty("--color-text", theme.text);
  r.setProperty("--color-muted", theme.muted);
  r.setProperty("--color-on-primary", theme.onPrimary);
  r.setProperty("--radius", RADIUS[theme.radius]);
  r.setProperty("--font-heading", theme.fontHeading);
  r.setProperty("--font-body", theme.fontBody);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme.background);
}
