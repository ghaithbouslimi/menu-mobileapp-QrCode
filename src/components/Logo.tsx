export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Mama Mia">
      <circle cx="24" cy="24" r="24" fill="var(--color-primary)" />
      <path d="M10 15Q24 6 38 15L24 40Z" fill="var(--color-on-primary)" />
      <path d="M10 15Q24 6 38 15" stroke="var(--color-on-primary)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="19" cy="20" r="2.6" fill="var(--color-primary)" />
      <circle cx="28" cy="21" r="2.6" fill="var(--color-primary)" />
      <circle cx="24" cy="29" r="2.4" fill="var(--color-primary)" />
    </svg>
  );
}

/** Brand name always stays left-to-right Latin, even in Arabic mode. */
export function Wordmark({ name }: { name: string }) {
  const [main, by] = name.split(" by ");
  return (
    <span dir="ltr" className="flex items-baseline gap-1.5 leading-none" style={{ fontFamily: "var(--font-heading)" }}>
      <span className="text-xl font-extrabold tracking-tight">{main}</span>
      {by && <span className="hidden text-xs text-muted min-[360px]:inline">by {by}</span>}
    </span>
  );
}
