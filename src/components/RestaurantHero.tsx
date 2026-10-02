import type { Restaurant } from "../types/menu";
import { LogoMark } from "./Logo";
import { coverImage } from "../lib/images";
import { tRestaurant } from "../lib/localize";
import { useLang } from "../lib/i18n";

export function RestaurantHero({ restaurant }: { restaurant: Restaurant }) {
  const { lang, t } = useLang();
  const cover = restaurant.coverImage ?? coverImage;
  return (
    <section aria-labelledby="welcome">
      <div className="relative grid h-60 place-items-center overflow-hidden bg-surface sm:h-72">
        {cover && <img src={cover} alt="" className="absolute inset-0 size-full object-cover opacity-40" />}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,194,14,0.22),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg to-transparent" />
        {restaurant.logo ? (
          <img
            src={restaurant.logo}
            alt={`${restaurant.name} logo`}
            width={176}
            height={176}
            fetchPriority="high"
            style={{ backgroundColor: restaurant.logoBackground }}
            className="relative size-40 rounded-[28px] shadow-2xl ring-1 ring-white/10 sm:size-44"
          />
        ) : (
          <div className="relative"><LogoMark size={96} /></div>
        )}
      </div>
      <div className="px-[18px] pb-2 pt-5">
        <h1 id="welcome" className="font-heading text-[2rem] font-extrabold leading-[1.1] tracking-tight">{t("welcome")}</h1>
        <p className="mt-2 text-sm text-muted">{tRestaurant(restaurant, lang).tagline}</p>
      </div>
    </section>
  );
}
