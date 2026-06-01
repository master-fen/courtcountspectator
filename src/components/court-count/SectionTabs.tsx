const defaultTabs = ["Матчи", "Настройки", "Судьи"] as const;

export function SectionTabs<T extends string>({
  tabs = defaultTabs as unknown as readonly T[],
  active,
}: {
  tabs?: readonly T[];
  active?: T;
} = {}) {
  const list = tabs;
  const current = active ?? list[0];
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
        {list.map((tab) => {
          const isActive = tab === current;
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
