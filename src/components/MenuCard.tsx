import type { MenuItem } from "../types/menu";
import { formatPrice } from "../lib/format";
import { resolveImage } from "../lib/images";
import { tItem } from "../lib/localize";
import { useLang } from "../lib/i18n";
import { SmartImage } from "./SmartImage";

export function MenuCard({ item }: { item: MenuItem }) {
  const { lang, t } = useLang();
  const { name, description } = tItem(item, lang);
  const unavailable = item.available === false;
  return (
    <li className={`flex items-center gap-3.5 border-b border-white/10 py-3.5 ${unavailable ? "opacity-50" : ""}`}>
      <SmartImage src={resolveImage(item)} alt={name} className="size-[76px] shrink-0 rounded-[var(--radius)]" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-semibold leading-snug">{name}</h3>
          <p className="shrink-0 text-sm font-bold tabular-nums text-primary">{formatPrice(item.price, item.currency, lang)}</p>
        </div>
        <p className="mt-1 line-clamp-2 text-[13px] leading-normal text-muted">{description}</p>
        {unavailable && <p className="mt-1 text-xs font-medium text-secondary">{t("unavailable")}</p>}
      </div>
    </li>
  );
}
