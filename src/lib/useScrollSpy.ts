import { useEffect, useState } from "react";

/** Distance from viewport top where a section counts as "reached" (sticky nav + scroll-padding). */
const OFFSET = 130;

/** Returns the id of the last section whose top has reached the sticky nav. */
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(`cat-${id}`));
    let raf = 0;
    const update = () => {
      raf = 0;
      let current = ids[0];
      els.forEach((el, i) => { if (el && el.getBoundingClientRect().top <= OFFSET) current = ids[i]; });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) current = ids[ids.length - 1];
      setActive(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
