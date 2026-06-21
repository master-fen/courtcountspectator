import { ArrowLeft } from "lucide-react";

export function TournamentTitle({
  title,
  compact = false,
}: {
  title: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-row bg-court-surface w-full ${compact ? "items-center" : "items-start"}`}
      style={{ padding: "0 12px", gap: 8 }}
    >
      <button
        type="button"
        aria-label="Назад"
        style={{ color: "var(--court-text-strong)", marginTop: compact ? 0 : 2, flexShrink: 0 }}
      >
        <ArrowLeft style={{ width: 24, height: 24 }} />
      </button>
      <div
        className="min-w-0 flex-1"
        style={{
          overflow: "hidden",
          maxHeight: compact ? "21px" : "42px",
          transition: "max-height 300ms cubic-bezier(0.25, 0.1, 0.25, 1)",
          willChange: "max-height",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "21px",
            color: "var(--court-text-strong)",
            margin: 0,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: compact ? 1 : 2,
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
