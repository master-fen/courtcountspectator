import { ChevronRight, FileText, Image as ImageIcon } from "lucide-react";
import type { TournamentDocument } from "@/lib/mock-documents";

export function DocumentCard({
  document,
  onOpen,
}: {
  document: TournamentDocument;
  onOpen: () => void;
}) {
  const Icon = document.kind === "pdf" ? FileText : ImageIcon;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-row items-center w-full text-left"
      style={{
        background: "var(--court-surface)",
        border: "0.5px solid var(--court-card-border)",
        borderRadius: 6,
        padding: "16px 12px",
        gap: 12,
        cursor: "pointer",
      }}
    >
      <span
        className="flex items-center justify-center shrink-0"
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: "var(--court-primary-soft)",
        }}
      >
        <Icon style={{ width: 20, height: 20, color: "var(--court-primary)" }} />
      </span>
      <span className="flex flex-col flex-1 min-w-0" style={{ gap: 2 }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 16,
            lineHeight: "20px",
            color: "var(--court-text-strong)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {document.title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: 12,
            lineHeight: "16px",
            color: "var(--court-text-soft)",
          }}
        >
          {document.updatedLabel}
        </span>
      </span>
      <ChevronRight
        style={{ width: 20, height: 20, color: "var(--court-text-soft)", flexShrink: 0 }}
      />
    </button>
  );
}
