export function StatusPills({ active = "Активные" }: { active?: string }) {
  const pills = ["Активные", "Завершённые"];
  return (
    <div className="px-4 py-3 flex gap-2">
      {pills.map((pill) => {
        const isActive = pill === active;
        return (
          <button
            key={pill}
            type="button"
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              isActive
                ? "border border-court-blue-strong text-court-blue-strong"
                : "text-foreground"
            }`}
          >
            {pill}
          </button>
        );
      })}
    </div>
  );
}
