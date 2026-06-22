export type Tournament = {
  id: string;
  title: string;
  city: string;
  /** ISO country code (lowercase) for flag emoji. Default "ru". */
  country?: string;
  dateLabel: string;
  info?: string;
  status: "current" | "completed";
};

export const mockTournaments: Tournament[] = [
  {
    id: "lyubertsy",
    title: "Первенство г. Люберцы на призы компании «Кухонный Двор»",
    city: "Люберцы",
    dateLabel: "20 июня — 28 июня",
    status: "current",
  },
  {
    id: "tosno",
    title: "Кубок Тосно теннис академии",
    city: "Тосно",
    dateLabel: "25 августа — 10 сентября",
    info: "Какая-то очень важная информация связанная с кубком Тосно Теннис Академии",
    status: "current",
  },
  {
    id: "perm",
    title:
      "Кубок Тосно теннис академии с очень длинным названием, чтобы было видно перенос по словам",
    city: "Пермь",
    dateLabel: "15 августа — 3 сентября",
    info: "Какая-то очень важная информация связанная с кубком Тосно Теннис Академии",
    status: "current",
  },
  {
    id: "vyborg",
    title: "Турнир посвященный памяти ценам на оперативную память",
    city: "Выборг",
    dateLabel: "25 августа — 10 сентября",
    status: "current",
  },
  {
    id: "spb",
    title: "Кубок прекрасного дорогого грузинского сухого вина 1934 года",
    city: "Санкт-Петербург",
    dateLabel: "25 августа — 10 сентября",
    status: "current",
  },
];

export function getTournamentById(id: string): Tournament | undefined {
  return mockTournaments.find((t) => t.id === id);
}
