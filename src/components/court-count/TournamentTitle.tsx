import { ArrowLeft } from "lucide-react";

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
  const p = isSingle ? 0 : Math.max(0, Math.min(1, progress));
  const fullHeight = 21 * effectiveLines;

  const height = fullHeight - (fullHeight - 21) * p;
  const fullOpacity = Math.max(0, 1 - p * 1.4);
  const compactOpacity = Math.max(0, (p - 0.2) / 0.8);
  const fullTranslate = -10 * p;
  const compactTranslate = 10 * (1 - p);

  return (
    <div
      className="flex flex-row bg-court-surface w-full"
      style={{
        padding: "8px 12px",
        gap: 8,
        alignItems: isSingle ? "center" : "flex-start",
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
          height: isSingle ? 21 : 21 + 2 * (1 - p),
        }}
      >
        <ArrowLeft style={{ width: 24, height: 24 }} />
      </button>

      <div
        className="min-w-0 flex-1 relative"
        style={{
          overflow: "hidden",
          height,
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
            opacity: fullOpacity,
            transform: `translateY(${fullTranslate}px)`,
            pointerEvents: p > 0.5 ? "none" : "auto",
            willChange: "opacity, transform",
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
              WebkitLineClamp: effectiveLines,
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
              opacity: compactOpacity,
              transform: `translateY(${compactTranslate}px)`,
              pointerEvents: p > 0.5 ? "auto" : "none",
              willChange: "opacity, transform",
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
