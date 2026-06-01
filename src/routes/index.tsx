import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/court-count/Header";
import { PageTitle } from "@/components/court-count/PageTitle";
import { SectionTabs } from "@/components/court-count/SectionTabs";
import { TournamentCard } from "@/components/court-count/TournamentCard";
import { SearchBar } from "@/components/court-count/SearchBar";
import { CreateMatchButton } from "@/components/court-count/CreateMatchButton";
import { mockTournaments } from "@/lib/mock-tournaments";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Мои турниры — Court Count" },
      {
        name: "description",
        content: "Список ваших теннисных турниров.",
      },
      { property: "og:title", content: "Мои турниры — Court Count" },
      {
        property: "og:description",
        content: "Список ваших теннисных турниров.",
      },
    ],
  }),
  component: Index,
});

function Index() {
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
            <PageTitle>Мои турниры</PageTitle>
            <SectionTabs
              tabs={["Текущие", "Завершенные"] as const}
              active="Текущие"
            />
            <SearchBar />
          </div>

          <div
            className="flex flex-col items-start self-center"
            style={{ width: 336, gap: 8, paddingBottom: 64 }}
          >
            {mockTournaments.map((t) => (
              <TournamentCard key={t.id} tournament={t} />
            ))}
          </div>
        </div>

        <CreateMatchButton label="Создать турнир" />
      </div>
    </div>
  );
}
