import { useAuth } from "@/hooks/use-auth";

const allTabs = ["Матчи", "Информация", "Настройки", "Судьи"] as const;
type Tab = (typeof allTabs)[number];

export function SectionTabs({
  active = "Матчи" as Tab,
  compact = false,
}: {
  active?: Tab;
  compact?: boolean;
}) {
  const { isAuthed } = useAuth();
  const tabs = isAuthed ? allTabs : (["Матчи", "Информация"] as readonly Tab[]);
  return (
    <div className="w-full" style={{ padding: "0 12px" }}>
      <div
        className="flex flex-row items-center w-full transition-all duration-200"
        style={{
          height: compact ? 24 : 28,
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
              className="flex items-center justify-center transition-all duration-200"
              style={{
                padding: compact ? "2px 8px" : "4px 10px",
                height: compact ? 24 : 28,
                marginBottom: "-0.5px",
                borderBottom: isActive
                  ? "2px solid var(--court-primary)"
                  : "2px solid transparent",
                fontFamily: "var(--font-body)",
                fontWeight: isActive ? 600 : 400,
                fontSize: compact ? 14 : 16,
                lineHeight: compact ? "18px" : "20px",
                color: isActive ? "var(--court-primary)" : "var(--court-text)",
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
