import { useState } from "react";
import { LogoMark } from "./Logo";

/** Lazy photo. With no photo (or a broken one) it shows a quiet branded placeholder. */
export function SmartImage({ src, alt, className = "" }: { src?: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`grid place-items-center overflow-hidden bg-surface ${className}`} aria-hidden="true">
        <span className="opacity-25"><LogoMark size={30} /></span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
