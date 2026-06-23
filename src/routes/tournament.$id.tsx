import { useState, useMemo, useEffect, useRef } from "react";
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
  return Math.min(4, Math.max(1, Math.ceil(title.length / charsPerLine)));
}

const HEADER_HEIGHT = 48;
const TITLE_PADDING_Y = 8;
const LINE_HEIGHT = 21;
/** Top offset where the tabs/filters block sticks (header + title top padding + first line). */
const TABS_STICKY_TOP = HEADER_HEIGHT + TITLE_PADDING_Y + LINE_HEIGHT; // 77

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
  const [tab, setTab] = useState<Tab>("Матчи");
  const [titleClamped, setTitleClamped] = useState(false);
  const clampedRef = useRef(false);
  const titleLines = useMemo(() => estimateTitleLines(tournament.title), [tournament.title]);

  useEffect(() => {
    if (titleLines <= 1) return;
    // Tabs become sticky once scrollY exceeds (titleHeight + bottomPadding - distance above sticky point).
    // Title occupies 21*L + 16 px starting at y=HEADER_HEIGHT. Tabs natural y = HEADER + 21*L + 16.
    // They stick once scrollY >= (HEADER + 21*L + 16) - TABS_STICKY_TOP = 21*L - 13.
    const threshold = LINE_HEIGHT * titleLines - 13;
    const enter = threshold;
    const exit = Math.max(0, threshold - 6); // small hysteresis
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const current = clampedRef.current;
      if (!current && y >= enter) {
        clampedRef.current = true;
        setTitleClamped(true);
      } else if (current && y <= exit) {
        clampedRef.current = false;
        setTitleClamped(false);
      }
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
  }, [titleLines]);

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
        {/* Header — top sticky layer */}
        <div
          className="bg-court-surface w-full"
          style={{ position: "sticky", top: 0, zIndex: 40 }}
        >
          <Header />
        </div>

        {/* Title — sticky just under the header; tabs slide over its lower lines */}
        <div
          className="bg-court-surface w-full"
          style={{ position: "sticky", top: HEADER_HEIGHT, zIndex: 10 }}
        >
          <TournamentTitle
            title={tournament.title}
            lines={titleLines}
            clamped={titleClamped}
            onBack={() => navigate({ to: "/" })}
          />
        </div>

        {/* Tabs + filters — sticky overlay that "catches up" to the title */}
        <div
          className="flex flex-col items-stretch bg-court-surface w-full"
          style={{
            position: "sticky",
            top: TABS_STICKY_TOP,
            zIndex: 30,
            gap: 12,
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
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
