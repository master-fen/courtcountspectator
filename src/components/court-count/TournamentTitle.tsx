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
      <h1
        className="min-w-0 flex-1"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: compact ? 15 : 18,
          lineHeight: compact ? "20px" : "21px",
          color: "var(--court-text-strong)",
          margin: 0,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: compact ? 1 : 2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          transition: "font-size 200ms ease, line-height 200ms ease",
          wordBreak: "break-word",
        }}
      >
        {title}
      </h1>
    </div>
  );
}
