import { useState, useMemo, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Header } from "@/components/court-count/Header";
import { TournamentCard } from "@/components/court-count/TournamentCard";
import { mockTournaments } from "@/lib/mock-tournaments";

type TabKey = "current" | "completed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Турниры — Court Count" },
      {
        name: "description",
        content: "Список текущих и завершённых теннисных турниров.",
      },
      { property: "og:title", content: "Турниры — Court Count" },
      {
        property: "og:description",
        content: "Список текущих и завершённых теннисных турниров.",
      },
    ],
  }),
  component: TournamentsList,
});

function TournamentsList() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("current");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const byStatus = mockTournaments.filter((t) =>
      tab === "current" ? t.status === "current" : t.status === "completed",
    );
    const q = query.trim().toLowerCase();
    if (!q) return byStatus;
    return byStatus.filter((t) => t.title.toLowerCase().includes(q));
  }, [tab, query]);

  return (
    <div
      className="min-h-screen w-full flex justify-center"
      style={{ background: "var(--court-bg)", fontFamily: "var(--font-body)" }}
    >
      <div className="flex flex-col items-stretch w-full">
        <div
          className="flex flex-col items-stretch bg-court-surface w-full"
          style={{ position: "sticky", top: 0, zIndex: 30 }}
        >
          <Header />
        </div>

        <div
          className="flex flex-col items-stretch bg-court-surface w-full"
          style={{ padding: "16px 12px", gap: 16, flex: 1 }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "26px",
              letterSpacing: "0.02em",
              color: "var(--court-text-strong)",
              margin: 0,
            }}
          >
            Турниры
          </h1>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 0,
              borderBottom: "0.5px solid var(--court-text-soft)",
              height: 29,
            }}
          >
            {(
              [
                { key: "current", label: "Текущие" },
                { key: "completed", label: "Завершенные" },
              ] as { key: TabKey; label: string }[]
            ).map((t) => {
              const active = t.key === tab;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  style={{
                    padding: "2px 8px",
                    height: 29,
                    marginBottom: "-0.5px",
                    borderBottom: active
                      ? "1px solid var(--court-primary)"
                      : "1px solid transparent",
                    fontFamily: "var(--font-body)",
                    fontSize: 16,
                    lineHeight: "20px",
                    fontWeight: active ? 600 : 400,
                    color: active ? "var(--court-primary)" : "var(--court-text-strong)",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 12px",
              height: 31,
              background: "var(--court-completed-header)",
              borderRadius: 8,
            }}
          >
            <Search size={14} color="var(--court-text-soft)" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по названию"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: "18px",
                color: "var(--court-text-strong)",
              }}
            />
          </div>

          {/* List */}
          {visible.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {visible.map((t) => (
                <TournamentCard
                  key={t.id}
                  tournament={t}
                  onOpen={() =>
                    navigate({ to: "/tournament/$id", params: { id: t.id } })
                  }
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: "24px 12px",
                textAlign: "center",
                color: "var(--court-text-soft)",
                fontSize: 14,
              }}
            >
              {tab === "completed"
                ? "Завершённых турниров пока нет"
                : "Ничего не найдено"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
