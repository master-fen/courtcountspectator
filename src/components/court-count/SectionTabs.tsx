const tabs = ["Матчи", "Настройки", "Судьи"] as const;

export function SectionTabs({ active = "Матчи" as (typeof tabs)[number] }) {
  return (
    <div className="px-4 border-b border-border">
      <div className="flex gap-6">
        {tabs.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              type="button"
              className={`relative py-3 text-base ${
                isActive
                  ? "text-court-blue-strong font-semibold"
                  : "text-foreground"
              }`}
            >
              {tab}
              {isActive && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-court-blue-strong rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
