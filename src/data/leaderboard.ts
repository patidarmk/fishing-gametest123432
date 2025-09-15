export type ScoreEntry = {
  id: string;
  name: string;
  score: number;
  date: string;
  details?: {
    fishCaught: number;
    trashCaught: number;
    accuracy: number;
  };
};

const STORAGE_KEY = "fisher_cove_leaderboard_v1";

export const initialLeaderboard: ScoreEntry[] = [
  {
    id: "1",
    name: "Ava Marlow",
    score: 12850,
    date: "2025-06-01",
    details: { fishCaught: 42, trashCaught: 5, accuracy: 88 },
  },
  {
    id: "2",
    name: "Kai Rivers",
    score: 11200,
    date: "2025-06-07",
    details: { fishCaught: 36, trashCaught: 2, accuracy: 92 },
  },
  {
    id: "3",
    name: "Maya Finch",
    score: 9800,
    date: "2025-04-18",
    details: { fishCaught: 29, trashCaught: 6, accuracy: 83 },
  },
  {
    id: "4",
    name: "Liam Shore",
    score: 8700,
    date: "2025-03-02",
    details: { fishCaught: 24, trashCaught: 9, accuracy: 72 },
  },
  {
    id: "5",
    name: "Noah Cove",
    score: 7600,
    date: "2024-12-29",
    details: { fishCaught: 20, trashCaught: 4, accuracy: 80 },
  },
];

export function loadLeaderboard(): ScoreEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLeaderboard));
      return initialLeaderboard;
    }
    const parsed = JSON.parse(raw) as ScoreEntry[];
    return parsed;
  } catch (e) {
    console.error("Failed to load leaderboard", e);
    return initialLeaderboard;
  }
}

export function saveScore(entry: ScoreEntry) {
  const current = loadLeaderboard();
  const next = [entry, ...current].sort((a, b) => b.score - a.score).slice(0, 25);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}