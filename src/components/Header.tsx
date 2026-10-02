import type { Restaurant } from "../types/menu";
import { LogoMark, Wordmark } from "./Logo";
import { LanguageSwitch } from "./LanguageSwitch";

export function Header({ restaurant }: { restaurant: Restaurant }) {
  return (
    <header className="flex h-16 items-center justify-between gap-2 px-[18px]">
      <div className="flex items-center gap-2">
        <LogoMark size={30} />
        <Wordmark name={restaurant.name} />
      </div>
      <LanguageSwitch />
    </header>
  );
}
