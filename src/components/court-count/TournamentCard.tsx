import { Trophy, CalendarDays } from "lucide-react";
import type { Tournament } from "@/lib/mock-tournaments";

function FlagRU() {
  return (
    <svg
      width={18}
      height={14}
      viewBox="0 0 18 14"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ flexShrink: 0, borderRadius: 1 }}
    >
      <rect width="18" height="14" fill="#FFFFFF" />
      <rect y="4.667" width="18" height="4.667" fill="#0039A6" />
      <rect y="9.333" width="18" height="4.667" fill="#D52B1E" />
    </svg>
  );
}

export function TournamentCard({
  tournament,
  onOpen,
}: {
  tournament: Tournament;
  onOpen?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full text-left"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 8,
        padding: 12,
        background: "var(--court-surface)",
        border: "0.5px solid var(--court-border)",
        borderRadius: 4,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 14,
          lineHeight: "118.8%",
          color: "var(--court-text-strong)",
          wordBreak: "break-word",
        }}
      >
        {tournament.title}
      </div>

      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 58,
            height: 54,
            borderRadius: 8,
            background: "var(--court-surface-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Trophy size={26} fill="#E9C943" color="#E9C943" strokeWidth={1.5} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 8,
            flex: 1,
            minWidth: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FlagRU />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: "18px",
                color: "var(--court-text-soft)",
              }}
            >
              {tournament.city}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CalendarDays size={16} color="var(--court-text-soft)" />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: "18px",
                color: "var(--court-text-soft)",
              }}
            >
              {tournament.dateLabel}
            </span>
          </div>
        </div>
      </div>

      {tournament.info && (
        <div
          style={{
            padding: 12,
            background: "var(--court-surface-muted)",
            borderRadius: 4,
            fontFamily: "var(--font-body)",
            fontSize: 12,
            lineHeight: "14px",
            letterSpacing: "0.04em",
            color: "var(--court-text-strong)",
          }}
        >
          {tournament.info}
        </div>
      )}
    </button>
  );
}
