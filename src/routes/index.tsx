import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/court-count/Header";
import { TournamentTitle } from "@/components/court-count/TournamentTitle";
import { SectionTabs } from "@/components/court-count/SectionTabs";
import { StatusPills, type StatusFilter } from "@/components/court-count/StatusPills";
import { MatchCard } from "@/components/court-count/MatchCard";
import { CreateMatchButton } from "@/components/court-count/CreateMatchButton";
import { mockMatches } from "@/lib/mock-matches";
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
            <StatusPills />
          </div>

          <div
            className="flex flex-col items-stretch w-full"
            style={{ gap: 12, padding: `0 12px ${isAuthed ? 64 : 12}px` }}
          >
            {mockMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </div>

        {isAuthed && <CreateMatchButton />}
      </div>
    </div>
  );
}
