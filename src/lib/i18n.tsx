import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "fr" | "en" | "ar";
export const LANGS: Record<Lang, { label: string; short: string; dir: "ltr" | "rtl" }> = {
  fr: { label: "Français", short: "FR", dir: "ltr" },
  en: { label: "English", short: "EN", dir: "ltr" },
  ar: { label: "العربية", short: "عربي", dir: "rtl" },
};

const dict = {
  fr: {
    welcome: "Tout droit du four à pierre.",
    popular: "Populaires",
    popularDesc: "Ce que nos clients commandent le plus.",
    unavailable: "Momentanément indisponible",
    empty: "Rien ici pour le moment. Revenez bientôt.",
    allergy: "Des allergies ? Merci d'en informer notre équipe avant de commander.",
    madeBy: "Créé par {name}",
    tiktok: "Suivez-nous sur TikTok",
    menuBy: "Menu par {name}",
    missing: "Ce menu n'existe pas. Vérifiez le lien ou scannez à nouveau le QR code.",
    loading: "Chargement du menu…",
    categories: "Catégories du menu",
    language: "Langue",
    a_gluten: "Gluten", a_milk: "Lait", a_egg: "Œufs", a_fish: "Poisson", a_sesame: "Sésame", a_nuts: "Fruits à coque",
  },
  en: {
    welcome: "Fresh from the stone oven.",
    popular: "Popular",
    popularDesc: "What our guests order most.",
    unavailable: "Currently unavailable",
    empty: "Nothing here yet. Check back soon.",
    allergy: "Allergies? Please speak with our team before ordering.",
    madeBy: "Made by {name}",
    tiktok: "Follow us on TikTok",
    menuBy: "Menu by {name}",
    missing: "This menu doesn't exist. Check the link or scan the QR code again.",
    loading: "Loading menu…",
    categories: "Menu categories",
    language: "Language",
    a_gluten: "Gluten", a_milk: "Milk", a_egg: "Eggs", a_fish: "Fish", a_sesame: "Sesame", a_nuts: "Tree nuts",
  },
  ar: {
    welcome: "طازج من الفرن الحجري.",
    popular: "الأكثر طلبًا",
    popularDesc: "ما يطلبه زبائننا أكثر.",
    unavailable: "غير متوفر حاليًا",
    empty: "لا يوجد شيء هنا حاليًا. عودوا قريبًا.",
    allergy: "هل لديك حساسية؟ يرجى إعلام فريقنا قبل الطلب.",
    madeBy: "من إعداد {name}",
    tiktok: "تابعونا على تيك توك",
    menuBy: "القائمة من {name}",
    missing: "هذه القائمة غير موجودة. تحقق من الرابط أو امسح رمز QR مرة أخرى.",
    loading: "جارٍ تحميل القائمة…",
    categories: "فئات القائمة",
    language: "اللغة",
    a_gluten: "غلوتين", a_milk: "حليب", a_egg: "بيض", a_fish: "سمك", a_sesame: "سمسم", a_nuts: "مكسرات",
  },
} as const;

export type Key = keyof (typeof dict)["fr"];
interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (k: Key, vars?: Record<string, string>) => string }
const LangContext = createContext<Ctx | null>(null);
const STORAGE = "menu-lang";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE);
    if (saved === "fr" || saved === "en" || saved === "ar") return saved;
  } catch { /* storage blocked: ignore */ }
  const nav = navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("ar") ? "ar" : nav.startsWith("en") ? "en" : "fr";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = LANGS[lang].dir;
    // Arabic font is only downloaded when needed.
    if (lang === "ar") void import("@fontsource-variable/noto-sans-arabic/index.css");
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE, l); } catch { /* ignore */ }
  }, []);

  const t = useCallback(
    (k: Key, vars?: Record<string, string>) =>
      Object.entries(vars ?? {}).reduce<string>((s, [n, v]) => s.replace(`{${n}}`, v), dict[lang][k]),
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLang must be used inside <LangProvider>");
  return c;
}
