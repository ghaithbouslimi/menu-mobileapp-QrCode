import type { RestaurantData } from "../types/menu";

export const DEFAULT_SLUG = "mama-mia";

/**
 * Single data-access point. Today: local module. Later: swap the body for
 * `fetch(`/api/restaurants/${slug}`)`; no component changes needed.
 */
export async function loadRestaurant(slug: string): Promise<RestaurantData | null> {
  switch (slug) {
    case "mama-mia":
      return (await import("./restaurants/mama-mia")).default;
    default:
      return null;
  }
}
