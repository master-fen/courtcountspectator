export type Stage =
  | "Финал"
  | "Полуфинал"
  | "Четвертьфинал"
  | "Матч за 3 место";

export type SetScore = {
  score: number;
  /** Tiebreak index, shown as a superscript next to the score. */
  tb?: number;
};

export type Player = {
  name: string;
  isServing?: boolean;
  /** Current game score: 0, 15, 30, 40, AD */
  game: string;
  /** Set scores, in order. 1-4 entries. */
  sets: SetScore[];
};

export type MatchStatus = "active" | "paused" | "completed";

export type Match = {
  id: string;
  court: string;
  stage: Stage;
  timer: string;
  status: MatchStatus;
  players: [Player, Player];
  message?: string;
  /** Match start time, e.g. "13:00". */
  startTime?: string;
  /** Time when match was paused, e.g. "13:45". */
  pausedAt?: string;
  /** Match end time (completed matches), e.g. "16:43". */
  endTime?: string;
};

export const mockMatches: Match[] = [
  {
    id: "m1",
    court: "Корт 5",
    stage: "Полуфинал",
    timer: "01:22",
    status: "active",
    startTime: "13:00",
    players: [
      {
        name: "Артёмова Лилия",
        isServing: true,
        game: "40",
        sets: [{ score: 6 }, { score: 2 }, { score: 1 }],
      },
      {
        name: "Иванова Анна",
        game: "15",
        sets: [{ score: 2 }, { score: 6 }, { score: 1 }],
      },
    ],
    message: "Кто-нибудь принесите попить плиз)))",
  },
  {
    id: "m2",
    court: "Корт 7",
    stage: "Четвертьфинал",
    timer: "00:52",
    status: "active",
    startTime: "13:00",
    players: [
      {
        name: "Джоковичев Николай",
        game: "15",
        sets: [{ score: 2 }, { score: 1 }],
      },
      {
        name: "Надалян Армен",
        isServing: true,
        game: "40",
        sets: [{ score: 6 }, { score: 3 }],
      },
    ],
  },
  {
    id: "p1",
    court: "Корт 3",
    stage: "Четвертьфинал",
    timer: "01:05",
    status: "paused",
    startTime: "13:00",
    pausedAt: "13:45",
    players: [
      {
        name: "Сафинов Марат",
        game: "30",
        sets: [{ score: 4 }, { score: 3 }],
      },
      {
        name: "Курниковский Артём",
        game: "30",
        sets: [{ score: 6 }, { score: 2 }],
      },
    ],
    message: "Пауза: дождь. Матч возобновится после высыхания корта.",
  },
  {
    id: "m3",
    court: "Корт 1",
    stage: "Финал",
    timer: "01:47",
    status: "active",
    startTime: "13:00",
    players: [
      {
        name: "Бэкхендов Пётр",
        isServing: true,
        game: "AD",
        // mock tb indices
        sets: [{ score: 7, tb: 7 }, { score: 6, tb: 4 }, { score: 5 }],
      },
      {
        name: "Эйсов Максим",
        game: "40",
        sets: [{ score: 6, tb: 5 }, { score: 7, tb: 7 }, { score: 4 }],
      },
    ],
    message: "Домой приду — сразу лягу спать",
  },
  {
    id: "m4",
    court: "Корт 5",
    stage: "Полуфинал",
    timer: "00:38",
    status: "active",
    startTime: "13:00",
    players: [
      { name: "Тайбрекова Варвара", game: "30", sets: [{ score: 4 }] },
      {
        name: "Аутова Полина",
        isServing: true,
        game: "40",
        sets: [{ score: 5 }],
      },
    ],
  },
  {
    id: "m5",
    court: "Корт 9",
    stage: "Матч за 3 место",
    timer: "02:03",
    status: "active",
    startTime: "13:00",
    players: [
      {
        name: "Уимблдонов Игорь",
        isServing: true,
        game: "40",
        sets: [{ score: 6 }, { score: 6 }],
      },
      {
        name: "Ракеткин Денис",
        game: "15",
        sets: [{ score: 4 }, { score: 2 }],
      },
    ],
    message: "Если мяч улетит ещё дальше, придётся вызывать такси.",
  },
  {
    id: "m6",
    court: "Корт 5",
    stage: "Полуфинал",
    timer: "01:22",
    status: "active",
    startTime: "13:00",
    players: [
      {
        name: "Мичманский Протор",
        isServing: true,
        game: "40",
        sets: [{ score: 6 }, { score: 2 }, { score: 1 }],
      },
      {
        name: "Черкасов Захар",
        game: "15",
        sets: [{ score: 2 }, { score: 6 }, { score: 1 }],
      },
    ],
  },

  // ===== Завершённые =====
  {
    id: "c1",
    court: "Корт 2",
    stage: "Полуфинал",
    timer: "01:14",
    status: "completed",
    startTime: "13:00",
    endTime: "14:14",
    players: [
      {
        name: "Слипкнотов Игорь",
        game: "",
        sets: [{ score: 6 }, { score: 3 }],
      },
      {
        name: "Металликов Артём",
        game: "",
        sets: [{ score: 4 }, { score: 6 }],
      },
    ],
  },
  {
    id: "c2",
    court: "Корт 7",
    stage: "Четвертьфинал",
    timer: "02:31",
    status: "completed",
    startTime: "14:00",
    endTime: "16:31",
    players: [
      {
        name: "Джоковичев Николай",
        game: "",
        // mock tb indices for 6:7 and 7:6
        sets: [{ score: 6, tb: 5 }, { score: 7, tb: 7 }, { score: 10 }],
      },
      {
        name: "Надалян Армен",
        game: "",
        sets: [{ score: 7, tb: 7 }, { score: 6, tb: 3 }, { score: 8 }],
      },
    ],
  },
  {
    id: "c3",
    court: "Корт 3",
    stage: "Полуфинал",
    timer: "00:48",
    status: "completed",
    startTime: "15:00",
    endTime: "15:48",
    players: [
      {
        name: "Тайбрекова Варвара",
        game: "",
        sets: [{ score: 6 }, { score: 6 }],
      },
      {
        name: "Аутова Полина",
        game: "",
        sets: [{ score: 1 }, { score: 0 }],
      },
    ],
  },
  {
    id: "c4",
    court: "Корт 1",
    stage: "Финал",
    timer: "02:12",
    status: "completed",
    startTime: "13:00",
    endTime: "15:12",
    players: [
      {
        name: "Бэкхендов Пётр",
        game: "",
        sets: [{ score: 4 }, { score: 6 }, { score: 7, tb: 7 }],
      },
      {
        name: "Эйсов Максим",
        game: "",
        sets: [{ score: 6 }, { score: 4 }, { score: 6, tb: 5 }],
      },
    ],
  },
  {
    id: "c5",
    court: "Корт 9",
    stage: "Матч за 3 место",
    timer: "00:56",
    status: "completed",
    startTime: "16:00",
    endTime: "16:56",
    players: [
      {
        name: "Уимблдонов Игорь",
        game: "",
        sets: [{ score: 6 }, { score: 2 }],
      },
      {
        name: "Ракеткин Денис",
        game: "",
        sets: [{ score: 2 }, { score: 6 }],
      },
    ],
  },
];
