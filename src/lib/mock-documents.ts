import raspisanie from "@/assets/docs/raspisanie.pdf.asset.json";
import setka from "@/assets/docs/setka.pdf.asset.json";
import afisha from "@/assets/docs/afisha.pdf.asset.json";

export type DocumentKind = "pdf" | "image";

export type TournamentDocument = {
  id: string;
  title: string;
  updatedLabel: string;
  url: string;
  kind: DocumentKind;
};

export const mockDocuments: TournamentDocument[] = [
  {
    id: "schedule",
    title: "Расписание",
    updatedLabel: "Обновлено сегодня в 08:30",
    url: raspisanie.url,
    kind: "pdf",
  },
  {
    id: "grid",
    title: "Сетка Юношей",
    updatedLabel: "Обновлено вчера в 21:00",
    url: setka.url,
    kind: "pdf",
  },
  {
    id: "poster",
    title: "Афиша турнира",
    updatedLabel: "Обновлено 15 мая",
    url: afisha.url,
    kind: "pdf",
  },
];
