import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/court-count/Header";
import { TournamentTitle } from "@/components/court-count/TournamentTitle";
import { SectionTabs } from "@/components/court-count/SectionTabs";
import { StatusPills } from "@/components/court-count/StatusPills";
import { MatchCard } from "@/components/court-count/MatchCard";
import { CreateMatchButton } from "@/components/court-count/CreateMatchButton";
import { mockMatches } from "@/lib/mock-matches";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Court Count" },
      {
        name: "description",
        content: "Трансляция теннисного счёта в реальном времени.",
      },
      { property: "og:title", content: "Court Count" },
      {
        property: "og:description",
        content: "Трансляция теннисного счёта в реальном времени.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div
      className="min-h-screen w-full flex justify-center"
      style={{ background: "#DBE3E6", fontFamily: "var(--font-body)" }}
    >
      <div
        className="flex flex-col items-center"
        style={{ width: 360, gap: 4 }}
      >
        <Header />

        <div
          className="flex flex-col items-center bg-court-surface"
          style={{
            width: 360,
            padding: "12px 0 0",
            gap: 16,
          }}
        >
          <TournamentTitle title='Первенство г. Люберцы на призы компании «Кухонный Двор»' />
          <div className="flex flex-col items-center" style={{ gap: 16, width: 360 }}>
            <SectionTabs />
            <StatusPills />
          </div>

          <div
            className="flex flex-col items-start"
            style={{ width: 344, gap: 12, paddingBottom: 16 }}
          >
            {mockMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </div>

        <CreateMatchButton />
      </div>
    </div>
  );
}
