import type { MenuItem } from "../types/menu";

// Every image in src/assets/menu is bundled and indexed by file name (without extension).
const files = import.meta.glob("../assets/menu/*.{jpg,jpeg,png,webp,avif}", {
  eager: true, query: "?url", import: "default",
}) as Record<string, string>;

const byName: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  byName[path.split("/").pop()!.replace(/\.[^.]+$/, "").toLowerCase()] = url;
}

export const coverImage: string | undefined = byName["cover"];

/** Explicit item.image wins, then <id>.ext, then cat-<categoryId>.ext. */
export const resolveImage = (item: MenuItem): string | undefined =>
  item.image ?? byName[item.id.toLowerCase()] ?? byName[`cat-${item.categoryId}`];
