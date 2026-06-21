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
        className="min-w-0 flex-1 relative"
        style={{
          overflow: "hidden",
          height: compact ? 21 : 42,
          transition: "height 300ms cubic-bezier(0.4, 0, 0.2, 1)",
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
            transform: `translateY(${compact ? -12 : 0}px)`,
            transition:
              "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: compact ? "none" : "auto",
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
              WebkitLineClamp: 2,
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Compact text layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 21,
            overflow: "hidden",
            opacity: compact ? 1 : 0,
            transform: `translateY(${compact ? 0 : 12}px)`,
            transition:
              "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: compact ? "auto" : "none",
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
      </div>
    </div>
  );
}
