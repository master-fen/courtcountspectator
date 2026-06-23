import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";


type Props = {
  open: boolean;
  onClose: () => void;
};

export function BurgerMenu({ open, onClose }: Props) {
  const { theme, toggle: toggleTheme } = useTheme();
  const { isAuthed, toggle: toggleAuth } = useAuth();
  const navigate = useNavigate();
  const isDark = theme === "dark";


  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const lockedAxis = useRef<"h" | "v" | null>(null);
  const [dragX, setDragX] = useState(0);
  const SWIPE_THRESHOLD = 80;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    lockedAxis.current = null;
    setDragX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (lockedAxis.current === null) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        lockedAxis.current = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
      }
    }
    if (lockedAxis.current === "h" && dx > 0) {
      setDragX(dx);
    }
  };

  const handleTouchEnd = () => {
    if (lockedAxis.current === "h" && dragX >= SWIPE_THRESHOLD) {
      onClose();
    }
    touchStart.current = null;
    lockedAxis.current = null;
    setDragX(0);
  };

  if (!open) return null;

  const navItems = [
    { label: "Турниры", active: true },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <button
        type="button"
        aria-label="Закрыть меню"
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          border: "none",
          padding: 0,
          cursor: "default",
        }}
      />
      <aside
        role="dialog"
        aria-modal="true"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{
          position: "relative",
          width: 280,
          maxWidth: "85vw",
          height: "100%",
          background: "var(--court-surface)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 24px rgba(0,0,0,0.25)",
          transform: dragX > 0 ? `translateX(${dragX}px)` : undefined,
          transition: dragX > 0 ? "none" : "transform 200ms ease",
          touchAction: "pan-y",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                if (item.label === "Турниры") {
                  navigate({ to: "/" });
                  onClose();
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "14px 24px",
                background: item.active
                  ? "color-mix(in oklab, var(--court-primary) 18%, transparent)"
                  : "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: "20px",
                fontWeight: item.active ? 600 : 400,
                color: "var(--court-text-strong)",
                textAlign: "left",
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>


        <div
          style={{
            height: 1,
            background: "var(--court-border, var(--court-text-soft))",
            opacity: 0.4,
            margin: "8px 16px",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 24px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: "20px",
              color: "var(--court-text-strong)",
            }}
            aria-pressed={isDark}
          >
            <span>Тёмная тема</span>
            <span
              style={{
                width: 36,
                height: 20,
                borderRadius: 999,
                background: isDark
                  ? "var(--court-primary)"
                  : "color-mix(in oklab, var(--court-text-soft) 60%, transparent)",
                position: "relative",
                transition: "background 150ms ease",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: isDark ? 18 : 2,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#fff",
                  transition: "left 150ms ease",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              />
            </span>
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 24px",
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: "20px",
              color: "var(--court-text-strong)",
            }}
          >
            <span>Язык</span>
            <span style={{ color: "var(--court-text)" }}>RU</span>
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: "var(--court-border, var(--court-text-soft))",
            opacity: 0.4,
            margin: "8px 16px",
          }}
        />

        <div style={{ padding: "16px 24px" }}>
          <button
            type="button"
            onClick={() => {
              toggleAuth();
              onClose();
            }}
            style={{
              width: "100%",
              height: 44,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: "var(--court-primary)",
              color: "var(--court-on-primary)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 16,
              lineHeight: "20px",
            }}
          >
            {isAuthed ? "Выйти" : "Войти"}
          </button>
        </div>
      </aside>
    </div>
  );
}
