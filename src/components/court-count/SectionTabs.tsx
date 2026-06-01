const tabs = ["Матчи", "Настройки", "Судьи"] as const;
type Tab = (typeof tabs)[number];

export function SectionTabs({ active = "Матчи" as Tab }: { active?: Tab }) {
  return (
    <div style={{ width: 360, padding: "0 12px" }}>
      <div
        className="flex flex-row items-center"
        style={{
          width: 336,
          height: 31,
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
              className="flex items-center justify-center"
              style={{
                padding: "2px 8px",
                height: 31,
                marginBottom: "-0.5px",
                borderBottom: isActive
                  ? "2px solid var(--court-primary)"
                  : "2px solid transparent",
                fontFamily: "var(--font-body)",
                fontWeight: isActive ? 600 : 400,
                fontSize: 16,
                lineHeight: "20px",
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
