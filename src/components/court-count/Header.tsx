import { useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { BurgerMenu } from "./BurgerMenu";

export function Header({ compact = false }: { compact?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header
        className="relative flex flex-row items-center justify-between bg-court-surface w-full transition-all duration-200"
        style={{
          gap: 12,
          height: compact ? 36 : 48,
          padding: compact ? "4px 16px" : "8px 24px",
        }}
      >
        <Logo
          className="w-auto transition-all duration-200"
          style={{ height: compact ? 20 : 24 }}
        />
        <button
          type="button"
          aria-label="Меню"
          onClick={() => setMenuOpen(true)}
          style={{ color: "var(--court-text-strong)" }}
        >
          <Menu
            style={{
              width: compact ? 16 : 18,
              height: compact ? 16 : 18,
              transition: "all 200ms",
            }}
          />
        </button>
      </header>
      <BurgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
