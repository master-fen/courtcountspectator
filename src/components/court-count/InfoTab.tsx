import { lazy, Suspense, useState } from "react";
import { DocumentCard } from "./DocumentCard";
import { mockDocuments, type TournamentDocument } from "@/lib/mock-documents";

const DocumentLightbox = lazy(() =>
  import("./DocumentLightbox").then((m) => ({ default: m.DocumentLightbox })),
);

export function InfoTab() {
  const [active, setActive] = useState<TournamentDocument | null>(null);

  return (
    <div
      className="flex flex-col items-stretch w-full"
      style={{ gap: 12, padding: "0 12px" }}
    >
      {mockDocuments.map((doc) => (
        <DocumentCard key={doc.id} document={doc} onOpen={() => setActive(doc)} />
      ))}

      {active && (
        <Suspense fallback={null}>
          <DocumentLightbox document={active} onClose={() => setActive(null)} />
        </Suspense>
      )}
    </div>
  );
}
