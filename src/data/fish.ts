export type FishType = {
  id: string;
  name: string;
  speed: number; // horizontal speed
  size: number; // visual size (px)
  points: number; // points when caught
  color: string;
  rarity?: number; // 1 = common, bigger = rarer
  isTrash?: boolean;
};

export const FISH_TYPES: FishType[] = [
  { id: "f_blue", name: "Blue Minnow", speed: 0.6, size: 18, points: 10, color: "#60A5FA", rarity: 1 },
  { id: "f_orange", name: "Orange Snapper", speed: 0.9, size: 26, points: 20, color: "#FB923C", rarity: 1 },
  { id: "f_green", name: "Green Trout", speed: 0.75, size: 22, points: 15, color: "#34D399", rarity: 1 },
  { id: "f_shadow", name: "Shadow Tuna", speed: 1.4, size: 34, points: 40, color: "#334155", rarity: 2 },
  { id: "f_golden", name: "Golden Koi", speed: 0.5, size: 30, points: 150, color: "#F59E0B", rarity: 6 }, // rare
  { id: "t_can", name: "Tin Can", speed: 0.5, size: 20, points: -15, color: "#9CA3AF", isTrash: true },
  { id: "t_boot", name: "Old Boot", speed: 0.4, size: 28, points: -25, color: "#6B7280", isTrash: true },
  { id: "t_bottle", name: "Plastic Bottle", speed: 0.6, size: 16, points: -10, color: "#93C5FD", isTrash: true },
  { id: "t_treasure", name: "Treasure Chest", speed: 0.3, size: 36, points: 250, color: "#C084FC", rarity: 8 }, // very rare treasure
];

/*
  Tuning notes:
  - spawn rates and which types appear are controlled in src/data/levels.ts and LevelManager.
  - To make fish faster with difficulty, multiply their 'speed' by level.speedMultiplier.
  - To adjust point balance, change points here.
*/