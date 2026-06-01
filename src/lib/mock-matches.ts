export type Stage =
  | "Финал"
  | "Полуфинал"
  | "Четвертьфинал"
  | "Матч за 3 место";

export type Player = {
  name: string;
  isServing?: boolean;
  /** Current game score: 0, 15, 30, 40, AD */
  game: string;
  /** Set scores, in order. 1-4 entries. */
  sets: number[];
};

export type Match = {
  id: string;
  court: string;
  stage: Stage;
  timer: string;
  players: [Player, Player];
  message?: string;
};

export const mockMatches: Match[] = [
  {
    id: "m1",
    court: "Корт 5",
    stage: "Полуфинал",
    timer: "01:22",
    players: [
      { name: "Артёмова Лилия", isServing: true, game: "40", sets: [6, 2, 1] },
      { name: "Иванова Анна", game: "15", sets: [2, 6, 1] },
    ],
    message: "Кто-нибудь принесите попить плиз)))",
  },
  {
    id: "m2",
    court: "Корт 7",
    stage: "Четвертьфинал",
    timer: "00:52",
    players: [
      { name: "Джоковичев Николай", game: "15", sets: [2, 1] },
      { name: "Надалян Армен", isServing: true, game: "40", sets: [6, 3] },
    ],
  },
  {
    id: "m3",
    court: "Корт 1",
    stage: "Финал",
    timer: "01:47",
    players: [
      { name: "Бэкхендов Пётр", isServing: true, game: "AD", sets: [7, 6, 5] },
      { name: "Эйсов Максим", game: "40", sets: [5, 7, 4] },
    ],
    message: "Домой приду — сразу лягу спать",
  },
  {
    id: "m4",
    court: "Корт 5",
    stage: "Полуфинал",
    timer: "00:38",
    players: [
      { name: "Тайбрекова Варвара", game: "30", sets: [4] },
      { name: "Аутова Полина", isServing: true, game: "40", sets: [5] },
    ],
  },
  {
    id: "m5",
    court: "Корт 9",
    stage: "Матч за 3 место",
    timer: "02:03",
    players: [
      { name: "Уимблдонов Игорь", isServing: true, game: "40", sets: [6, 6] },
      { name: "Ракеткин Денис", game: "15", sets: [4, 2] },
    ],
    message: "Если мяч улетит ещё дальше, придётся вызывать такси.",
  },
  {
    id: "m6",
    court: "Корт 5",
    stage: "Полуфинал",
    timer: "01:22",
    players: [
      { name: "Мичманский Протор", isServing: true, game: "40", sets: [6, 2, 1] },
      { name: "Черкасов Захар", game: "15", sets: [2, 6, 1] },
    ],
  },
];
