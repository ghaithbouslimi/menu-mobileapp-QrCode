import { Phone } from "lucide-react";
import type { Restaurant } from "../types/menu";
import { LogoMark } from "./Logo";
import { useLang } from "../lib/i18n";

export function Footer({ restaurant: r }: { restaurant: Restaurant }) {
  const { t } = useLang();
  return (
    <footer className="mt-10 border-t border-white/10 px-[18px] pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6">
      <div className="flex items-center gap-2.5">
        <LogoMark size={28} />
        <p className="text-sm">{r.founder ? t("madeBy", { name: r.founder }) : r.name}</p>
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {r.phone && (
          <li>
            <a href={`tel:${r.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 font-medium text-primary">
              <Phone size={16} aria-hidden="true" /> <span dir="ltr">{r.phone}</span>
            </a>
          </li>
        )}
        {r.tiktok && (
          <li>
            <a href={r.tiktok} target="_blank" rel="noopener noreferrer" className="underline decoration-primary underline-offset-4">
              {t("tiktok")}
            </a>
          </li>
        )}
          {r.instagram && (
          <li>
            <a href={r.instagram} target="_blank" rel="noopener noreferrer" className="underline decoration-primary underline-offset-4">
              {t("tiktok")}
            </a>
          </li>
        )}
        {r.address && <li className="text-muted">{r.address}</li>}
        {r.openingHours && <li className="text-muted">{r.openingHours}</li>}
      </ul>
      <p className="mt-5 text-xs text-muted">{t("allergy")}</p>
      {r.poweredBy && <p className="mt-2 text-xs text-muted">{"Powered by Ghaith Bouslimi"}</p>}
    </footer>
  );
}
