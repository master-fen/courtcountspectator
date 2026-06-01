import { ChevronRight, Megaphone } from "lucide-react";
import type { Match } from "@/lib/mock-matches";

function TennisBallIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.85" />
      <path
        d="M3.5 9c4 1 7 4 8 11M20.5 9c-4 1-7 4-8 11M3.5 15c4-1 7-4 8-11M20.5 15c-4-1-7-4-8-11"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MatchCard({ match }: { match: Match }) {
  const maxSets = Math.max(...match.players.map((p) => p.sets.length));

  return (
    <article className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <button
        type="button"
        className="w-full flex items-center gap-2 px-3 py-2.5 bg-court-blue text-left"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-court-green shrink-0" />
        <span className="font-semibold text-foreground">{match.court}</span>
        <span className="text-muted-foreground text-sm">{match.stage}</span>
        <span className="ml-auto flex items-center gap-1 text-foreground tabular-nums">
          {match.timer}
          <ChevronRight className="w-4 h-4" />
        </span>
      </button>

      {/* Players */}
      <div className="px-3 py-3 space-y-2">
        {match.players.map((player, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 min-w-0">
              <span className="text-foreground truncate">{player.name}</span>
              {player.isServing && (
                <TennisBallIcon className="w-4 h-4 text-foreground shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-3 tabular-nums">
              <span className="w-8 h-7 border border-foreground rounded flex items-center justify-center text-foreground">
                {player.game}
              </span>
              {Array.from({ length: maxSets }).map((_, i) => (
                <span
                  key={i}
                  className="w-4 text-center text-foreground"
                >
                  {player.sets[i] ?? ""}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Message */}
      {match.message && (
        <div className="px-3 pb-3 -mt-1 flex items-center gap-2 text-muted-foreground text-sm">
          <Megaphone className="w-4 h-4 shrink-0" />
          <span className="truncate">{match.message}</span>
        </div>
      )}
    </article>
  );
}
