import { useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { BurgerMenu } from "./BurgerMenu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header
        className="relative flex flex-row items-center justify-between bg-court-surface"
        style={{ width: 360, height: 64, padding: "16px 24px", gap: 12 }}
      >
        <Logo height={32} />
        <button
          type="button"
          aria-label="Меню"
          onClick={() => setMenuOpen(true)}
          style={{ color: "var(--court-text-strong)" }}
        >
          <Menu style={{ width: 24, height: 24 }} />
        </button>
      </header>
      <BurgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
