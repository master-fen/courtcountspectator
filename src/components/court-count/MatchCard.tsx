import type { ReactNode } from "react";
import { ChevronRight, Megaphone } from "lucide-react";
import type { Match } from "@/lib/mock-matches";
import { PlayerRow } from "./PlayerRow";

export function MatchCard({ match, onOpen }: { match: Match; onOpen?: () => void }) {
  const maxSets = Math.max(...match.players.map((p) => p.sets.length));

  const isCompleted = match.status === "completed";
  const isActive = match.status === "active";

  return (
    <article
      role={isActive ? "button" : undefined}
      tabIndex={isActive ? 0 : undefined}
      onClick={isActive ? onOpen : undefined}
      onKeyDown={
        isActive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen?.();
              }
            }
          : undefined
      }
      className="flex flex-col items-start overflow-hidden w-full"
      style={{
        border: isCompleted
          ? "1px solid var(--court-completed-border)"
          : "0.5px solid var(--court-card-border)",
        borderRadius: 6,
        background: "var(--court-surface)",
        cursor: isActive ? "pointer" : "default",
      }}
    >
      {/* Header */}
      <div
        className="w-full flex flex-row items-center justify-between text-left"
        style={{
          height: 32,
          padding: "8px 12px",
          gap: 8,
          background: isCompleted
            ? "var(--court-completed-header)"
            : "var(--court-card-header)",
        }}
      >
        <div className="flex items-center" style={{ gap: 8 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background:
                match.status === "completed"
                  ? "var(--court-completed-dot)"
                  : match.status === "paused"
                    ? "var(--court-paused-dot)"
                    : "var(--court-green)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "18px",
              color: "var(--court-text-strong)",
            }}
          >
            {match.court}
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "14px",
              color: "var(--court-text-muted)",
            }}
          >
            {match.stage}
          </span>
        </div>
        <div className="flex items-center" style={{ gap: 4 }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "18px",
              color: "var(--court-text-strong)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {match.timer.split(":").reduce<ReactNode[]>((acc, part, i, arr) => {
              acc.push(<span key={`p${i}`}>{part}</span>);
              if (i < arr.length - 1) {
                acc.push(
                  <span key={`c${i}`} className={isActive ? "animate-timer-blink" : undefined}>:</span>
                );
              }
              return acc;
            }, [])}
          </span>
          {isActive && (
            <ChevronRight
              style={{ width: 16, height: 16, color: "var(--court-text-soft)" }}
            />
          )}
        </div>
      </div>

      {/* Body */}
      <div
        className="w-full flex flex-col"
        style={{
          padding: "16px 12px",
          gap: 12,
          background: "var(--court-surface)",
        }}
      >
        {match.players.map((p, i) => (
          <PlayerRow key={i} player={p} maxSets={maxSets} showGame={isActive} />
        ))}
      </div>

      {/* Message */}
      {match.message && (
        <div
          className="w-full flex flex-row items-start"
          style={{
            padding: "12px 8px",
            gap: 8,
            background: "var(--court-surface-muted)",
          }}
        >
          <Megaphone
            style={{
              width: 14,
              height: 14,
              color: "var(--court-text-muted)",
              transform: "scaleX(-1)",
              flexShrink: 0,
              marginTop: 1,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "14px",
              color: "var(--court-text-soft)",
              letterSpacing: "0.04em",
            }}
          >
            {match.message}
          </span>
        </div>
      )}
    </article>
  );
}
