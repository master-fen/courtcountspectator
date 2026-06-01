import { mockMatches, type Match } from "./mock-matches";

export type Tournament = {
  id: string;
  name: string;
  city: string;
  countryFlag: "ru";
  startDate: string;
  endDate: string;
  matchIds: string[];
};

export const mockTournaments: Tournament[] = [
  {
    id: "tosno",
    name: "Кубок Тосно теннис академии с очень длинным названием, чтобы было видно перенос по словам",
    city: "Тосно",
    countryFlag: "ru",
    startDate: "25 августа",
    endDate: "10 сентября",
    matchIds: ["m1", "m2", "m6"],
  },
  {
    id: "lyubertsy",
    name: "Первенство г. Люберцы на призы компании «Кухонный Двор»",
    city: "Люберцы",
    countryFlag: "ru",
    startDate: "12 сентября",
    endDate: "20 сентября",
    matchIds: ["m3", "m4"],
  },
  {
    id: "moscow-open",
    name: "Открытый турнир Москвы среди любителей",
    city: "Москва",
    countryFlag: "ru",
    startDate: "1 октября",
    endDate: "8 октября",
    matchIds: ["m5"],
  },
];

export function getTournamentById(id: string): Tournament | undefined {
  return mockTournaments.find((t) => t.id === id);
}

export function getMatchesForTournament(tournament: Tournament): Match[] {
  return tournament.matchIds
    .map((id) => mockMatches.find((m) => m.id === id))
    .filter((m): m is Match => Boolean(m));
}
