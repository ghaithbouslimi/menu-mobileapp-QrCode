import { useMemo } from "react";
import type { RestaurantData } from "../types/menu";
import { Header } from "../components/Header";
import { RestaurantHero } from "../components/RestaurantHero";
import { CategoryNav } from "../components/CategoryNav";
import { MenuSection } from "../components/MenuSection";
import { Footer } from "../components/Footer";
import { useScrollSpy } from "../lib/useScrollSpy";
import { useLang } from "../lib/i18n";
import { tCategory } from "../lib/localize";

export default function MenuPage({ data }: { data: RestaurantData }) {
  const { restaurant, categories, items } = data;
  const { lang, t } = useLang();

  const sections = useMemo(() => {
    const popular = items.filter((i) => i.featured);
    const list = [
      ...(popular.length ? [{ id: "popular", title: t("popular"), items: popular, description: t("popularDesc") }] : []),
      ...categories.map((c) => ({ id: c.id, title: tCategory(c, lang).name, description: tCategory(c, lang).description, items: items.filter((i) => i.categoryId === c.id) })),
    ];
    return list;
  }, [categories, items, lang, t]);

  const active = useScrollSpy(sections.map((s) => s.id));

  return (
    <div className="mx-auto min-h-dvh max-w-2xl">
      <Header restaurant={restaurant} />
      <main>
        <RestaurantHero restaurant={restaurant} />
        <CategoryNav entries={sections.map((s) => ({ id: s.id, label: s.title }))} active={active} />
        {sections.map((s) => <MenuSection key={s.id} {...s} />)}
      </main>
      <Footer restaurant={restaurant} />
    </div>
  );
}
