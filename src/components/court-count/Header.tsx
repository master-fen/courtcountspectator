import { useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { BurgerMenu } from "./BurgerMenu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header
        className="relative flex flex-row items-center justify-between bg-court-surface w-full h-12 md:h-16 py-2 md:py-4 px-6"
        style={{ gap: 12 }}
      >
        <Logo className="h-6 md:h-8 w-auto" />
        <button
          type="button"
          aria-label="Меню"
          onClick={() => setMenuOpen(true)}
          style={{ color: "var(--court-text-strong)" }}
        >
          <Menu className="w-[18px] h-[18px] md:w-6 md:h-6" />
        </button>
      </header>
      <BurgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
