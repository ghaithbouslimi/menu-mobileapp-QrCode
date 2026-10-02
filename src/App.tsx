import { lazy, Suspense, useEffect, useState } from "react";
import { applyTheme } from "./config/theme";
import { DEFAULT_SLUG, loadRestaurant } from "./data";
import type { RestaurantData } from "./types/menu";
import { useLang } from "./lib/i18n";
import MenuPage from "./pages/MenuPage";

const QrGeneratorPage = lazy(() => import("./pages/QrGeneratorPage"));

/** "/" -> default restaurant, "/menu/:slug" -> that restaurant. */
function getSlug(): string {
  const m = location.pathname.match(/\/menu\/([^/]+)/);
  return m ? decodeURIComponent(m[1]) : DEFAULT_SLUG;
}

function MenuApp() {
  const { t } = useLang();
  const [data, setData] = useState<RestaurantData | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    loadRestaurant(getSlug()).then((d) => {
      if (!d) return setMissing(true);
      applyTheme(d.theme);
      document.title = `${d.restaurant.name} | Menu`;
      setData(d);
    });
  }, []);

  if (missing) return <p className="p-6">{t("missing")}</p>;
  if (!data) return <div className="grid min-h-dvh place-items-center text-muted" role="status">{t("loading")}</div>;
  return <MenuPage data={data} />;
}

/** "/qr" -> QR generator (separate lazy chunk, never loaded for customers). */
export default function App() {
  if (/\/qr\/?$/.test(location.pathname)) {
    return <Suspense fallback={null}><QrGeneratorPage /></Suspense>;
  }
  return <MenuApp />;
}
