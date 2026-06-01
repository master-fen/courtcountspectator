import { Menu } from "lucide-react";

export function Header() {
  return (
    <header
      className="flex flex-row items-center justify-between bg-court-surface"
      style={{ width: 360, height: 64, padding: "16px 24px", gap: 12 }}
    >
      <div className="flex items-center gap-1" style={{ width: 64, height: 32 }}>
        <div
          className="flex items-center justify-center text-white font-bold"
          style={{
            width: 30,
            height: 30,
            borderRadius: 6,
            background: "#9CF73E",
            color: "#202020",
            fontFamily: "var(--font-body)",
            fontSize: 18,
          }}
        >
          C
        </div>
        <div
          className="flex items-center justify-center font-bold"
          style={{
            width: 30,
            height: 30,
            borderRadius: 6,
            background: "#85D0FA",
            color: "#FFFFFF",
            fontFamily: "var(--font-body)",
            fontSize: 18,
          }}
        >
          C
        </div>
      </div>
      <button type="button" aria-label="Меню" style={{ color: "#202020" }}>
        <Menu style={{ width: 24, height: 24 }} />
      </button>
    </header>
  );
}
