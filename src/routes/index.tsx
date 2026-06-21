import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/court-count/Header";
import { TournamentTitle } from "@/components/court-count/TournamentTitle";
import { SectionTabs } from "@/components/court-count/SectionTabs";
import { StatusPills, type StatusFilter } from "@/components/court-count/StatusPills";
import { MatchCard } from "@/components/court-count/MatchCard";
import { CreateMatchButton } from "@/components/court-count/CreateMatchButton";
import { MatchDetailsSheet } from "@/components/court-count/MatchDetailsSheet";
import { mockMatches, type Match } from "@/lib/mock-matches";
import { useAuth } from "@/hooks/use-auth";

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
  const { isAuthed } = useAuth();
  const [filter, setFilter] = useState<StatusFilter>("Все");
  const [selected, setSelected] = useState<Match | null>(null);

  const matches = useMemo(() => {
    const active = mockMatches.filter((m) => m.status !== "completed");
    const completed = mockMatches.filter((m) => m.status === "completed");
    if (filter === "Активные") return active;
    if (filter === "Завершённые") return completed;
    return [...active, ...completed];
  }, [filter]);

  return (
    <div
      className="min-h-screen w-full flex justify-center"
      style={{ background: "var(--court-bg)", fontFamily: "var(--font-body)" }}
    >
      <div
        className="flex flex-col items-stretch w-full"
        style={{ gap: 4 }}
      >
        <Header />

        <div
          className="flex flex-col items-stretch bg-court-surface w-full"
          style={{
            padding: "8px 0 0",
            gap: 12,
          }}
        >
          <div className="flex flex-col items-stretch w-full" style={{ gap: 12 }}>
            <TournamentTitle title='Первенство г. Люберцы на призы компании «Кухонный Двор»' />
            <SectionTabs />
            <StatusPills active={filter} onChange={setFilter} />
          </div>

          <div
            className="flex flex-col items-stretch w-full"
            style={{ gap: 12, padding: `0 12px ${isAuthed ? 64 : 12}px` }}
          >
            {matches.map((m) => (
              <MatchCard
                key={m.id}
                match={m}
                onOpen={() => setSelected(m)}
              />
            ))}
          </div>
        </div>

        {isAuthed && <CreateMatchButton />}

        <MatchDetailsSheet
          match={selected}
          open={!!selected}
          onOpenChange={(o) => !o && setSelected(null)}
        />
      </div>
    </div>
  );
}
