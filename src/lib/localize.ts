import type { Category, MenuItem, Restaurant } from "../types/menu";
import type { Lang } from "./i18n";

/** French is the base language; any missing translation falls back to it. */
export const tItem = (i: MenuItem, l: Lang) => {
  const x = l === "ar" ? i.ar : l === "en" ? i.en : undefined;
  return { name: x?.name ?? i.name, description: x?.description ?? i.description, ingredients: x?.ingredients ?? i.ingredients };
};

export const tCategory = (c: Category, l: Lang) => {
  const x = l === "ar" ? c.ar : l === "en" ? c.en : undefined;
  return { name: x?.name ?? c.name, description: x?.description ?? c.description };
};

export const tRestaurant = (r: Restaurant, l: Lang) => {
  const x = l === "ar" ? r.ar : l === "en" ? r.en : undefined;
  return { tagline: x?.tagline ?? r.tagline, description: x?.description ?? r.description };
};
