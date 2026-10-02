import { LANGS, useLang, type Lang } from "../lib/i18n";

const ORDER = Object.keys(LANGS) as Lang[];

export function LanguageSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t("language")} dir="ltr" className="flex rounded-full bg-surface p-1">
      {ORDER.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-label={LANGS[l].label}
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`min-h-9 min-w-10 rounded-full px-2.5 text-xs font-semibold transition-colors ${lang === l ? "bg-primary text-on-primary" : "text-text"}`}
        >
          {LANGS[l].short}
        </button>
      ))}
    </div>
  );
}
