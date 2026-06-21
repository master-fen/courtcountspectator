import type { ReactNode } from "react";
import { Megaphone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import type { Match } from "@/lib/mock-matches";
import { PlayerRow } from "./PlayerRow";

function BlinkingTimer({ value, blink }: { value: string; blink: boolean }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-body)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {value.split(":").reduce<ReactNode[]>((acc, part, i, arr) => {
        acc.push(<span key={`p${i}`}>{part}</span>);
        if (i < arr.length - 1) {
          acc.push(
            <span key={`c${i}`} className={blink ? "animate-timer-blink" : undefined}>:</span>
          );
        }
        return acc;
      }, [])}
    </span>
  );
}

export function MatchDetailsSheet({
  match,
  open,
  onOpenChange,
}: {
  match: Match | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!match) return null;

  const maxSets = Math.max(...match.players.map((p) => p.sets.length));
  const isActive = match.status === "active";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="p-0 border-0 [&>button]:hidden gap-0"
        style={{
          background: "var(--court-surface)",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <VisuallyHidden.Root>
          <SheetTitle>{`${match.court} — ${match.stage}`}</SheetTitle>
          <SheetDescription>Детали матча</SheetDescription>
        </VisuallyHidden.Root>

        {/* Drag handle */}
        <div className="flex justify-center" style={{ paddingTop: 8, paddingBottom: 8 }}>
          <span
            style={{
              width: 36,
              height: 4,
              borderRadius: 9999,
              background: "var(--court-text-muted)",
              opacity: 0.4,
            }}
          />
        </div>

        <div
          className="flex flex-col w-full"
          style={{ padding: "8px 16px 20px", gap: 16 }}
        >
          {/* Header */}
          <div className="flex flex-row items-center justify-between" style={{ gap: 8 }}>
            <div className="flex items-center" style={{ gap: 8 }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: "20px",
                  color: "var(--court-text-strong)",
                }}
              >
                {match.court}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "18px",
                  color: "var(--court-text-muted)",
                }}
              >
                {match.stage}
              </span>
            </div>
            <div className="flex items-center" style={{ gap: 6 }}>
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
                {match.status === "completed"
                  ? "Завершён"
                  : match.status === "paused"
                    ? "На паузе"
                    : "Активен"}
              </span>
            </div>
          </div>

          {/* Players */}
          <div className="flex flex-col w-full" style={{ gap: 12 }}>
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
                borderRadius: 6,
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

          {/* Divider */}
          <div style={{ height: 1, background: "var(--court-card-border)", width: "100%" }} />

          {/* Meta */}
          <div className="flex flex-col" style={{ gap: 8 }}>
            {match.startTime && (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "18px",
                  color: "var(--court-text-soft)",
                }}
              >
                Начало матча: {match.startTime}
              </span>
            )}
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "18px",
                color: "var(--court-text-soft)",
              }}
            >
              Продолжительность: <BlinkingTimer value={match.timer} blink={isActive} />
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
