export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image?: string;
  categoryId: string;
  featured?: boolean;
  available?: boolean;
  ingredients?: string[];
  allergens?: string[];
  /** Arabic translation; French is the base language. Missing fields fall back to French. */
  ar?: { name: string; description: string; ingredients?: string[] };
  en?: { name: string; description: string; ingredients?: string[] };
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  ar?: { name: string; description?: string };
  en?: { name: string; description?: string };
}

export interface Restaurant {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo?: string;
  coverImage?: string;
  address?: string;
  phone?: string;
  openingHours?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  founder?: string;
  poweredBy?: string;
  ar?: { tagline: string; description: string };
  en?: { tagline: string; description: string };
  /** Background color of the logo image, so it blends into the hero band. */
  logoBackground?: string;
}

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  onPrimary: string;
  radius: "sm" | "md" | "xl";
  fontHeading: string;
  fontBody: string;
}

export interface RestaurantData {
  restaurant: Restaurant;
  theme: Theme;
  categories: Category[];
  items: MenuItem[];
}
