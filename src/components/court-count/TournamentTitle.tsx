import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const TRANSITION = "opacity 140ms ease, height 140ms ease";

export function TournamentTitle({
  title,
  lines = 2,
  progress = 0,
  onBack,
}: {
  title: string;
  lines?: number;
  /** 0 = fully expanded (`lines` lines), 1 = fully compact (1 line) */
  progress?: number;
  onBack?: () => void;
}) {
  const effectiveLines = Math.max(1, lines);
  const isSingle = effectiveLines === 1;

  // Hysteresis: switch to compact only after p > 0.6, back to full only when p < 0.4.
  // Inside [0.4, 0.6] the mode is sticky — micro-scrolling can't flicker it.
  const [mode, setMode] = useState<"full" | "compact">("full");
  useEffect(() => {
    if (isSingle) return;
    if (progress > 0.6 && mode === "full") setMode("compact");
    else if (progress < 0.4 && mode === "compact") setMode("full");
  }, [progress, mode, isSingle]);

  const compact = !isSingle && mode === "compact";
  const fullHeight = 21 * effectiveLines;
  const height = isSingle ? 21 : compact ? 21 : fullHeight;

  return (
    <div
      className="flex flex-row bg-court-surface w-full"
      style={{
        padding: "8px 12px",
        gap: 8,
        alignItems: isSingle || compact ? "center" : "flex-start",
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
        className="min-w-0 flex-1 relative"
        style={{
          overflow: "hidden",
          height,
          transition: isSingle ? undefined : TRANSITION,
          willChange: "height",
        }}
      >
        {/* Full text layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            opacity: compact ? 0 : 1,
            transition: isSingle ? undefined : TRANSITION,
            pointerEvents: compact ? "none" : "auto",
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
              WebkitLineClamp: compact ? 1 : effectiveLines,
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Compact text layer — only when title can shrink */}
        {!isSingle && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 21,
              overflow: "hidden",
              opacity: compact ? 1 : 0,
              transition: TRANSITION,
              pointerEvents: compact ? "auto" : "none",
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
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
