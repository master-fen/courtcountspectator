import { LogIn, LogOut, Menu, Moon, Sun } from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const { theme, toggle } = useTheme();
  const { isAuthed, toggle: toggleAuth } = useAuth();
  return (
    <header
      className="relative flex flex-row items-center justify-between bg-court-surface"
      style={{ width: 360, height: 64, padding: "16px 24px", gap: 12 }}
    >
      <Logo height={32} />
      <button
        type="button"
        onClick={toggle}
        aria-label="Переключить тему"
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "var(--court-text-strong)",
        }}
      >
        {theme === "dark" ? (
          <Sun style={{ width: 24, height: 24 }} />
        ) : (
          <Moon style={{ width: 24, height: 24 }} />
        )}
      </button>
      <div className="flex flex-row items-center" style={{ gap: 12 }}>
        <button
          type="button"
          onClick={toggleAuth}
          aria-label={isAuthed ? "Выйти" : "Войти"}
          style={{ color: "var(--court-text-strong)" }}
        >
          {isAuthed ? (
            <LogOut style={{ width: 24, height: 24 }} />
          ) : (
            <LogIn style={{ width: 24, height: 24 }} />
          )}
        </button>
        <button
          type="button"
          aria-label="Меню"
          style={{ color: "var(--court-text-strong)" }}
        >
          <Menu style={{ width: 24, height: 24 }} />
        </button>
      </div>
    </header>
  );
}
