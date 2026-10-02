import { useEffect, useRef } from "react";
import { useLang } from "../lib/i18n";

export interface NavEntry { id: string; label: string }

export function CategoryNav({ entries, active }: { entries: NavEntry[]; active: string }) {
  const { t } = useLang();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const listRef = useRef<HTMLUListElement>(null);

  // Center the active tab by scrolling only the tab bar. (scrollIntoView would also start a
  // page scroll and cancel the smooth scroll that a tap just triggered.)
  useEffect(() => {
    const list = listRef.current, btn = refs.current[active];
    if (!list || !btn) return;
    const l = list.getBoundingClientRect(), b = btn.getBoundingClientRect();
    list.scrollTo({ left: list.scrollLeft + (b.left - l.left) - (l.width - b.width) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label={t("categories")} className="sticky top-0 z-20 border-b border-white/10 bg-bg/95 backdrop-blur">
      <ul ref={listRef} className="no-scrollbar flex gap-2 overflow-x-auto px-[18px] py-2.5">
        {entries.map((e) => {
          const on = e.id === active;
          return (
            <li key={e.id} className="shrink-0">
              <button
                ref={(el) => { refs.current[e.id] = el; }}
                type="button"
                aria-current={on ? "true" : undefined}
                onClick={() => document.getElementById(`cat-${e.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className={`rounded-full px-4 py-2 text-[13px] transition-colors ${on ? "bg-primary font-semibold text-on-primary" : "bg-surface text-text"}`}
              >
                {e.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
