import { useEffect, useState } from "react";

export function useScrolled(enter = 48, exit = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let current = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (!current && y > enter) {
        current = true;
        setScrolled(true);
      } else if (current && y < exit) {
        current = false;
        setScrolled(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enter, exit]);
  return scrolled;
}
