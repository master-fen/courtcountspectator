import { useAuth } from "@/hooks/use-auth";

const allTabs = ["Матчи", "Информация", "Настройки", "Судьи"] as const;
export type Tab = (typeof allTabs)[number];

export function SectionTabs({
  active = "Матчи" as Tab,
  onChange,
}: {
  active?: Tab;
  onChange?: (tab: Tab) => void;
}) {
  const { isAuthed } = useAuth();
  const tabs = isAuthed ? allTabs : (["Матчи", "Информация"] as readonly Tab[]);
  return (
    <div className="w-full" style={{ padding: "0 12px" }}>
      <div
        className="flex flex-row items-center w-full"
        style={{
          height: 28,
          gap: 8,
          borderBottom: "0.5px solid var(--court-text-soft)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onChange?.(tab)}
              className="flex items-center justify-center"
              style={{
                padding: "4px 10px",
                height: 28,
                marginBottom: "-0.5px",
                borderBottom: isActive
                  ? "2px solid var(--court-primary)"
                  : "2px solid transparent",
                fontFamily: "var(--font-body)",
                fontWeight: isActive ? 600 : 400,
                fontSize: 16,
                lineHeight: "20px",
                color: isActive ? "var(--court-primary)" : "var(--court-text)",
                cursor: "pointer",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
