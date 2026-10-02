import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download } from "lucide-react";
import { LogoMark } from "../components/Logo";

/** Owner utility at /qr. Pre-filled with the site's own address, so opening it on the live site gives the right QR. */
export default function QrGeneratorPage() {
  const [url, setUrl] = useState(location.origin + import.meta.env.BASE_URL);
  const [png, setPng] = useState("");
  const [svg, setSvg] = useState("");
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    let current = true;
    try { new URL(url); } catch { setInvalid(true); return; }
    setInvalid(false);
    const o = { errorCorrectionLevel: "H" as const, margin: 2, width: 1024, color: { dark: "#0A0A0A", light: "#FFFFFF" } };
    Promise.all([QRCode.toDataURL(url, o), QRCode.toString(url, { ...o, type: "svg" })]).then(([p, s]) => {
      if (current) { setPng(p); setSvg(s); }
    });
    return () => { current = false; };
  }, [url]);

  const svgHref = svg ? URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })) : "";
  const btn = "flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold";

  return (
    <main className="mx-auto min-h-dvh max-w-md px-[18px] py-8">
      <div className="flex items-center gap-2.5"><LogoMark size={34} /><h1 className="font-heading text-2xl font-extrabold">QR code generator</h1></div>
      <label htmlFor="url" className="mt-6 block text-sm text-muted">Menu link (the address customers will open)</label>
      <input id="url" type="url" value={url} onChange={(e) => setUrl(e.target.value.trim())} inputMode="url" autoComplete="off"
        className="mt-1.5 w-full rounded-[var(--radius)] border border-white/15 bg-surface px-3.5 py-3 text-[15px]" />
      {invalid && <p role="alert" className="mt-2 text-sm text-secondary">Enter a full link starting with https://</p>}

      <div className="mt-6 grid place-items-center rounded-[var(--radius)] bg-white p-4">
        {png && !invalid ? <img src={png} alt={`QR code for ${url}`} className="size-64 max-w-full" /> : <div className="size-64" />}
      </div>

      <div className="mt-5 flex gap-3">
        <a href={png} download="mama-mia-qr.png" aria-disabled={!png || invalid} className={`${btn} bg-primary text-on-primary`}><Download size={16} aria-hidden="true" /> PNG</a>
        <a href={svgHref} download="mama-mia-qr.svg" aria-disabled={!svg || invalid} className={`${btn} bg-surface`}><Download size={16} aria-hidden="true" /> SVG</a>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-muted">Before printing: scan it with your phone camera. Print at least 3 cm wide, black on white. Use SVG for large prints such as posters or stickers.</p>
    </main>
  );
}
