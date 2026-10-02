import type { MenuItem } from "../types/menu";
import { MenuCard } from "./MenuCard";
import { useLang } from "../lib/i18n";

interface Props { id: string; title: string; description?: string; items: MenuItem[] }

export function MenuSection({ id, title, description, items }: Props) {
  const { t } = useLang();
  return (
    <section id={`cat-${id}`} aria-labelledby={`h-${id}`} className="px-[18px] pt-7">
      <h2 id={`h-${id}`} className="font-heading text-2xl font-bold tracking-tight">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      {items.length === 0 ? (
        <p className="py-6 text-sm text-muted">{t("empty")}</p>
      ) : (
        <ul className="mt-2">{items.map((it) => <MenuCard key={it.id} item={it} />)}</ul>
      )}
    </section>
  );
}
