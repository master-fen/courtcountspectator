import { ArrowLeft } from "lucide-react";

export function TournamentTitle({
  title,
  lines = 2,
  clamped = false,
  onBack,
}: {
  title: string;
  lines?: number;
  /** Force single-line display with ellipsis (when tabs overlay the lower lines) */
  clamped?: boolean;
  onBack?: () => void;
}) {
  const effectiveLines = Math.max(1, lines);
  const isSingle = effectiveLines === 1;
  const visibleLines = clamped ? 1 : effectiveLines;
  const height = 21 * effectiveLines;

  return (
    <div
      className="flex flex-row bg-court-surface w-full"
      style={{
        padding: "8px 12px",
        gap: 8,
        alignItems: isSingle || clamped ? "center" : "flex-start",
      }}
    >
      <button
        type="button"
        aria-label="Назад"
        onClick={onBack}
        style={{
          color: "var(--court-text-strong)",
          flexShrink: 0,
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: onBack ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          height: 21,
        }}
      >
        <ArrowLeft style={{ width: 24, height: 24 }} />
      </button>

      <div
        className="min-w-0 flex-1"
        style={{ height: clamped ? 21 : height, overflow: "hidden" }}
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
            WebkitLineClamp: visibleLines,
            overflow: "hidden",
            wordBreak: "break-word",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
