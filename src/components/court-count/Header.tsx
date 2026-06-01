import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
      <div className="flex items-center gap-1.5">
        <div className="w-9 h-9 rounded-md bg-court-green flex items-center justify-center text-white font-bold text-lg">
          C
        </div>
        <div className="w-9 h-9 rounded-md bg-court-blue-strong flex items-center justify-center text-white font-bold text-lg">
          C
        </div>
      </div>
      <button
        type="button"
        aria-label="Меню"
        className="p-2 text-foreground"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
}
