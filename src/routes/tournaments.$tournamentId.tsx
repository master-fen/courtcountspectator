import { createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/court-count/Header";
import { TournamentTitle } from "@/components/court-count/TournamentTitle";
import { SectionTabs } from "@/components/court-count/SectionTabs";
import { StatusPills } from "@/components/court-count/StatusPills";
import { MatchCard } from "@/components/court-count/MatchCard";
import { CreateMatchButton } from "@/components/court-count/CreateMatchButton";
import {
  getMatchesForTournament,
  getTournamentById,
} from "@/lib/mock-tournaments";

export const Route = createFileRoute("/tournaments/$tournamentId")({
  head: () => ({
    meta: [
      { title: "Турнир — Court Count" },
      { name: "description", content: "Трансляция матчей турнира." },
    ],
  }),
  loader: ({ params }) => {
    const tournament = getTournamentById(params.tournamentId);
    if (!tournament) throw notFound();
    return { tournament };
  },
  notFoundComponent: () => (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: "var(--court-bg)",
        color: "var(--court-text-strong)",
        fontFamily: "var(--font-body)",
      }}
    >
      Турнир не найден
    </div>
  ),
  component: TournamentPage,
});

function TournamentPage() {
  const { tournament } = Route.useLoaderData();
  const matches = getMatchesForTournament(tournament);

  return (
    <div
      className="min-h-screen w-full flex justify-center"
      style={{ background: "var(--court-bg)", fontFamily: "var(--font-body)" }}
    >
      <div
        className="flex flex-col items-center"
        style={{ width: 360, gap: 4 }}
      >
        <Header />

        <div
          className="flex flex-col items-center bg-court-surface"
          style={{ width: 360, padding: "12px 0 0", gap: 12 }}
        >
          <div
            className="flex flex-col items-center"
            style={{ width: 360, gap: 16 }}
          >
            <TournamentTitle title={tournament.name} />
            <SectionTabs />
            <StatusPills />
          </div>

          <div
            className="flex flex-col items-start"
            style={{ width: 344, gap: 12, paddingBottom: 64 }}
          >
            {matches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </div>

        <CreateMatchButton />
      </div>
    </div>
  );
}
