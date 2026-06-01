import { Link } from "@tanstack/react-router";
import { Calendar, Trophy } from "lucide-react";
import type { Tournament } from "@/lib/mock-tournaments";

function RuFlag() {
  return (
    <span
      aria-label="Россия"
      className="inline-flex overflow-hidden"
      style={{
        width: 20,
        height: 14,
        borderRadius: 2,
        flexShrink: 0,
      }}
    >
      <span style={{ flex: 1, background: "#FFFFFF" }} />
      <span
        style={{
          position: "absolute",
          width: 20,
          height: 14,
          background:
            "linear-gradient(to bottom, #FFFFFF 0 33.33%, #0039A6 33.33% 66.66%, #D52B1E 66.66% 100%)",
        }}
      />
    </span>
  );
}

export function TournamentCard({ tournament }: { tournament: Tournament }) {
  return (
    <Link
      to="/tournaments/$tournamentId"
      params={{ tournamentId: tournament.id }}
      className="block"
      style={{ width: 344 }}
    >
      <article
        className="flex flex-col overflow-hidden"
        style={{
          width: 344,
          border: "0.5px solid var(--court-border)",
          borderRadius: 6,
          background: "var(--court-surface)",
          padding: 16,
          gap: 12,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: 16,
            lineHeight: "22px",
            color: "var(--court-text-strong)",
            margin: 0,
            wordBreak: "break-word",
          }}
        >
          {tournament.name}
        </h2>

        <div className="flex flex-row items-start" style={{ gap: 12 }}>
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 64,
              height: 64,
              borderRadius: 8,
              background: "var(--court-surface-muted)",
            }}
          >
            <Trophy
              style={{ width: 32, height: 32, color: "#E5B53A" }}
              strokeWidth={1.75}
            />
          </div>

          <div
            className="flex flex-col justify-center"
            style={{ gap: 8, minHeight: 64, flex: 1 }}
          >
            <div className="flex flex-row items-center" style={{ gap: 8 }}>
              <span
                aria-label="Россия"
                className="relative inline-block overflow-hidden flex-shrink-0"
                style={{ width: 20, height: 14, borderRadius: 2 }}
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
                  color: "var(--court-text-strong)",
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
                  color: "var(--court-text-muted)",
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
                  color: "var(--court-text-strong)",
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
