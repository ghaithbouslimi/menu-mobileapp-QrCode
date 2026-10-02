import type { Lang } from "./i18n";

/** Tunisian dinar uses 3 decimals: 18.500 TND (د.ت in Arabic). */
export function formatPrice(value: number, currency: string, lang: Lang = "fr"): string {
  const symbol = lang === "ar" && currency === "TND" ? "د.ت" : currency;
  return `${value.toFixed(3)} ${symbol}`;
}

/** Lowercase + strip accents so "cafe" matches "café". */
export function normalize(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
