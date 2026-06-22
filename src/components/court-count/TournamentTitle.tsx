import { ArrowLeft } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";

export function TournamentTitle({
  title,
  progress = 0,
  onBack,
}: {
  title: string;
  /** 0 = fully expanded, 1 = fully compact. Only used when title wraps to 2 lines. */
  progress?: number;
  onBack?: () => void;
}) {
  const p = Math.max(0, Math.min(1, progress));

  // Measure how many lines the title actually occupies at the expanded size.
  const measureRef = useRef<HTMLSpanElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const check = () => {
      const lineHeight = 21;
      const h = el.getBoundingClientRect().height;
      setIsMultiline(h > lineHeight * 1.5);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [title]);

  // Single-line: no collapse animation — just a static 21px row.
  if (!isMultiline) {
    return (
      <div
        className="flex flex-row bg-court-surface w-full items-center"
        style={{ padding: "0 12px", gap: 8 }}
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
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <ArrowLeft style={{ width: 24, height: 24 }} />
        </button>
        <div className="min-w-0 flex-1" style={{ height: 21, overflow: "hidden" }}>
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
        {/* hidden measurement node */}
        <span
          ref={measureRef}
          aria-hidden
          style={{
            position: "absolute",
            visibility: "hidden",
            pointerEvents: "none",
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "21px",
            // approximate available width: viewport minus back btn (24) minus gap (8) minus horizontal padding (24)
            width: "calc(100% - 56px)",
            wordBreak: "break-word",
          }}
        >
          {title}
        </span>
      </div>
    );
  }

  const height = 42 - 21 * p; // 42 -> 21
  const fullOpacity = Math.max(0, 1 - p * 1.4);
  const compactOpacity = Math.max(0, (p - 0.2) / 0.8);
  const fullTranslate = -10 * p;
  const compactTranslate = 10 * (1 - p);

  return (
    <div
      className="flex flex-row bg-court-surface w-full items-start"
      style={{ padding: "0 12px", gap: 8 }}
    >
      <button
        type="button"
        aria-label="Назад"
        onClick={onBack}
        style={{
          color: "var(--court-text-strong)",
          marginTop: 2 * (1 - p),
          flexShrink: 0,
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: onBack ? "pointer" : "default",
        }}
      >
        <ArrowLeft style={{ width: 24, height: 24 }} />
      </button>

      <div
        className="min-w-0 flex-1 relative"
        style={{ overflow: "hidden", height, willChange: "height" }}
      >
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
              WebkitLineClamp: 2,
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {title}
          </h1>
        </div>

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

        {/* hidden measurement node — re-checks when width changes */}
        <span
          ref={measureRef}
          aria-hidden
          style={{
            position: "absolute",
            visibility: "hidden",
            pointerEvents: "none",
            top: 0,
            left: 0,
            width: "100%",
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 18,
            lineHeight: "21px",
            wordBreak: "break-word",
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
