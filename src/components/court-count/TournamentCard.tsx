import { Link } from "@tanstack/react-router";
import { Calendar, Trophy } from "lucide-react";
import type { Tournament } from "@/lib/mock-tournaments";

export function TournamentCard({ tournament }: { tournament: Tournament }) {
  return (
    <Link
      to="/tournaments/$tournamentId"
      params={{ tournamentId: tournament.id }}
      className="block"
      style={{ width: 336 }}
    >
      <article
        className="flex flex-col overflow-hidden"
        style={{
          width: 336,
          border: "0.5px solid var(--court-border)",
          borderRadius: 4,
          background: "var(--court-surface)",
          padding: 12,
          gap: 8,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: 14,
            lineHeight: "17px",
            color: "var(--court-text-strong)",
            margin: 0,
            wordBreak: "break-word",
          }}
        >
          {tournament.name}
        </h2>

        <div className="flex flex-row items-end" style={{ gap: 12 }}>
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 54,
              height: 51,
              padding: 8,
              borderRadius: 8,
              background: "var(--court-trophy-bg)",
            }}
          >
            <Trophy
              style={{
                width: 26,
                height: 26,
                color: "var(--court-trophy-icon)",
              }}
              strokeWidth={1.75}
              fill="var(--court-trophy-icon)"
            />
          </div>

          <div className="flex flex-col" style={{ gap: 8, flex: 1 }}>
            <div className="flex flex-row items-center" style={{ gap: 8 }}>
              <span
                aria-label="Россия"
                className="relative inline-block overflow-hidden flex-shrink-0"
                style={{ width: 18, height: 14, borderRadius: 1 }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, #FFFFFF 0 33.33%, #0039A6 33.33% 66.66%, #D52B1E 66.66% 100%)",
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "18px",
                  color: "var(--court-text-soft)",
                }}
              >
                {tournament.city}
              </span>
            </div>
            <div className="flex flex-row items-center" style={{ gap: 8 }}>
              <Calendar
                style={{
                  width: 16,
                  height: 16,
                  color: "var(--court-text-soft)",
                  flexShrink: 0,
                }}
                strokeWidth={1.75}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "18px",
                  color: "var(--court-text-soft)",
                }}
              >
                {tournament.startDate} — {tournament.endDate}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
