export type StatusFilter = "Все" | "Активные" | "Завершённые";

export function StatusPills({
  active = "Все",
  onChange,
}: {
  active?: StatusFilter;
  onChange?: (value: StatusFilter) => void;
}) {
  const pills: StatusFilter[] = ["Все", "Активные", "Завершённые"];
  return (
    <div
      className="flex flex-row items-start w-full"
      style={{ padding: "0 12px", gap: 0 }}
    >
      {pills.map((pill) => {
        const isActive = pill === active;
        return (
          <button
            key={pill}
            type="button"
            onClick={() => onChange?.(pill)}
            className="flex items-center"
            style={{
              padding: "8px 12px",
              gap: 8,
              height: 28,
              borderRadius: 6,
              border: isActive
                ? "1px solid var(--court-primary)"
                : "1px solid transparent",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "18px",
              color: isActive ? "var(--court-primary)" : "var(--court-text)",
              background: "transparent",
            }}
          >
            {pill}
          </button>
        );
      })}
    </div>
  );
}
