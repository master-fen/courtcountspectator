import { ArrowLeft } from "lucide-react";

export function TournamentTitle({
  title,
  progress = 0,
}: {
  title: string;
  /** 0 = fully visible (2 lines), 1 = fully hidden */
  progress?: number;
}) {
  const p = Math.max(0, Math.min(1, progress));

  const height = 42 * (1 - p);
  const opacity = Math.max(0, 1 - p * 1.6);
  const translateY = -12 * p;

  return (
    <div
      className="flex flex-row bg-court-surface w-full items-start"
      style={{ padding: "0 12px", gap: 8 }}
    >
      <button
        type="button"
        aria-label="Назад"
        style={{
          color: "var(--court-text-strong)",
          marginTop: 2 * (1 - p),
          flexShrink: 0,
          opacity,
          transform: `translateY(${translateY}px)`,
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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            opacity,
            transform: `translateY(${translateY}px)`,
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
      </div>
    </div>
  );
}
