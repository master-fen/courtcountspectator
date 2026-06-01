import { ChevronRight, Megaphone } from "lucide-react";
import type { Match, Player } from "@/lib/mock-matches";

function TennisBallIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" fill="#393C3D" />
      <path
        d="M3.5 9c4 1 7 4 8 11M20.5 9c-4 1-7 4-8 11M3.5 15c4-1 7-4 8-11M20.5 15c-4-1-7-4-8-11"
        stroke="#FEFEFE"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayerRow({ player, maxSets }: { player: Player; maxSets: number }) {
  return (
    <div
      className="flex flex-row items-center justify-between"
      style={{ gap: 12, height: 18 }}
    >
      <div className="flex items-center min-w-0" style={{ gap: 8 }}>
        <span
          className="truncate"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "18px",
            color: "#202020",
          }}
        >
          {player.name}
        </span>
        {player.isServing && <TennisBallIcon size={18} />}
      </div>
      <div className="flex flex-row items-center" style={{ gap: 19 }}>
        <span
          className="flex items-center justify-center"
          style={{
            width: 20,
            height: 20,
            borderRadius: 2,
            border: "0.5px solid #393C3D",
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "18px",
            color: "#1A1A1A",
            padding: 2,
          }}
        >
          {player.game}
        </span>
        <div className="flex flex-row items-center" style={{ gap: 12 }}>
          {Array.from({ length: maxSets }).map((_, i) => (
            <span
              key={i}
              className="text-center"
              style={{
                width: 9,
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "18px",
                color: "#202020",
              }}
            >
              {player.sets[i] ?? ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MatchCard({ match }: { match: Match }) {
  const maxSets = Math.max(...match.players.map((p) => p.sets.length));

  return (
    <article
      className="flex flex-col items-start overflow-hidden"
      style={{
        width: 344,
        border: "0.5px solid #929C9F",
        borderRadius: 6,
        background: "#FEFEFE",
      }}
    >
      {/* Header */}
      <button
        type="button"
        className="w-full flex flex-row items-center justify-between text-left"
        style={{
          height: 32,
          padding: "8px 12px",
          gap: 8,
          background: "rgba(133, 208, 250, 0.25)",
        }}
      >
        <div className="flex items-center" style={{ gap: 8 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: "#9CF73E",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "18px",
              color: "#202020",
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
              color: "#393C3D",
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
              color: "#202020",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {match.timer}
          </span>
          <ChevronRight style={{ width: 16, height: 16, color: "#525556" }} />
        </div>
      </button>

      {/* Body */}
      <div
        className="w-full flex flex-col"
        style={{
          padding: match.message ? "16px 12px 0" : "16px 12px",
          gap: 12,
          background: "#FEFEFE",
        }}
      >
        {match.players.map((p, i) => (
          <PlayerRow key={i} player={p} maxSets={maxSets} />
        ))}
      </div>

      {/* Message */}
      {match.message && (
        <div
          className="w-full flex flex-row items-start"
          style={{
            padding: "12px 8px",
            gap: 8,
            background: "#F2F6F7",
          }}
        >
          <Megaphone
            style={{
              width: 14,
              height: 14,
              color: "#393C3D",
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
              color: "#525556",
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
