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
      { name: "description", content: "Трансляция теннисного счёта в реальном времени." },
      { property: "og:title", content: "Court Count" },
      { property: "og:description", content: "Трансляция теннисного счёта в реальном времени." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[420px] pb-28">
        <Header />
        <TournamentTitle title='Первенство г. Люберцы на призы компании «Кухонный Двор»' />
        <SectionTabs />
        <StatusPills />
        <div className="px-4 space-y-3">
          {mockMatches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </div>
      <CreateMatchButton />
    </div>
  );
}
