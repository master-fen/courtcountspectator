import { useState, useMemo, useEffect } from "react";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/court-count/Header";
import { TournamentTitle } from "@/components/court-count/TournamentTitle";
import { SectionTabs, type Tab } from "@/components/court-count/SectionTabs";
import { StatusPills, type StatusFilter } from "@/components/court-count/StatusPills";
import { MatchCard } from "@/components/court-count/MatchCard";
import { CreateMatchButton } from "@/components/court-count/CreateMatchButton";
import { MatchDetailsSheet } from "@/components/court-count/MatchDetailsSheet";
import { InfoTab } from "@/components/court-count/InfoTab";
import { mockMatches, type Match } from "@/lib/mock-matches";
import { getTournamentById } from "@/lib/mock-tournaments";
import { useAuth } from "@/hooks/use-auth";

/** Rough estimate of how many 21px lines the title needs on mobile (~355 px width). */
function estimateTitleLines(title: string): number {
  const charsPerLine = 32;
  return Math.min(4, Math.max(2, Math.ceil(title.length / charsPerLine)));
}

export const Route = createFileRoute("/tournament/$id")({
  loader: ({ params }) => {
    const tournament = getTournamentById(params.id);
    if (!tournament) throw notFound();
    return { tournament };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.tournament.title ?? "Турнир — Court Count" },
    ],
  }),
  component: TournamentDetail,
});

function TournamentDetail() {
  const { tournament } = Route.useLoaderData();
  const navigate = useNavigate();
  const { isAuthed } = useAuth();
  const [filter, setFilter] = useState<StatusFilter>("Все");
  const [selected, setSelected] = useState<Match | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tab, setTab] = useState<Tab>("Матчи");
  const titleLines = useMemo(() => estimateTitleLines(tournament.title), [tournament.title]);

  useEffect(() => {
    const START = 0;
    const END = 48;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const p = Math.max(0, Math.min(1, (y - START) / (END - START)));
      setScrollProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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
      <div className="flex flex-col items-stretch w-full">
        <div
          className="flex flex-col items-stretch bg-court-surface w-full"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            gap: 12,
            paddingBottom: 8,
          }}
        >
          <Header />
          <TournamentTitle
            title={tournament.title}
            progress={scrollProgress}
            onBack={() => navigate({ to: "/" })}
          />
          <SectionTabs active={tab} onChange={setTab} />
          {tab === "Матчи" && <StatusPills active={filter} onChange={setFilter} />}
        </div>

        <div
          className="flex flex-col items-stretch bg-court-surface w-full"
          style={{ padding: "8px 0 0", gap: 12 }}
        >
          {tab === "Матчи" && (
            <div
              className="flex flex-col items-stretch w-full"
              style={{ gap: 12, padding: `0 12px ${isAuthed ? 64 : 12}px` }}
            >
              {matches.map((m) => (
                <MatchCard key={m.id} match={m} onOpen={() => setSelected(m)} />
              ))}
            </div>
          )}
          {tab === "Информация" && (
            <div style={{ paddingBottom: isAuthed ? 64 : 12 }}>
              <InfoTab />
            </div>
          )}
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
