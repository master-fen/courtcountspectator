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
      className="flex flex-row items-start bg-court-surface w-full transition-all duration-200"
      style={{ padding: "0 12px", gap: 8 }}
    >
      <button
        type="button"
        aria-label="Назад"
        style={{
          color: "var(--court-text-strong)",
          marginTop: 2,
          flexShrink: 0,
        }}
      >
        <ArrowLeft
          style={{
            width: compact ? 18 : 24,
            height: compact ? 18 : 24,
            transition: "all 200ms",
          }}
        />
      </button>
      <h1
        className="min-w-0 flex-1"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: compact ? 14 : 18,
          lineHeight: compact ? "17px" : "21px",
          color: "var(--court-text-strong)",
          margin: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: compact ? "nowrap" : "normal",
          transition: "font-size 200ms, line-height 200ms",
        }}
      >
        {title}
      </h1>
    </div>
  );
}
