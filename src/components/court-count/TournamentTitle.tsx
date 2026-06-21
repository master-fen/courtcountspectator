import { ArrowLeft } from "lucide-react";

export function TournamentTitle({ title }: { title: string }) {
  return (
    <div
      className="flex flex-row items-start bg-court-surface w-full"
      style={{ padding: "0 12px", gap: 8 }}
    >
      <button
        type="button"
        aria-label="Назад"
        style={{ color: "var(--court-text-strong)", marginTop: 2, flexShrink: 0 }}
      >
        <ArrowLeft style={{ width: 24, height: 24 }} />
      </button>
      <h1
        className="min-w-0 flex-1"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 18,
          lineHeight: "21px",
          color: "var(--court-text-strong)",
          margin: 0,
        }}
      >
        {title}
      </h1>
    </div>
  );
}
