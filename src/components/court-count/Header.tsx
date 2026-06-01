import { Menu } from "lucide-react";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header
      className="flex flex-row items-center justify-between bg-court-surface"
      style={{ width: 360, height: 64, padding: "16px 24px", gap: 12 }}
    >
      <Logo height={32} />
      <button type="button" aria-label="Меню" style={{ color: "#202020" }}>
        <Menu style={{ width: 24, height: 24 }} />
      </button>
    </header>
  );
}
