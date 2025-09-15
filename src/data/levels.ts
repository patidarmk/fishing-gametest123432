export type Level = {
  id: string;
  title: string;
  description: string;
  targetScore: number;
  requiredCatches: number; // alternative win condition
  durationSec: number; // level time limit
  speedMultiplier: number; // multiplies fish base speed
  trashRate: number; // probability modifier for trash spawns
  theme: "lake" | "river" | "ocean" | "night" | "cave" | "reef" | "atoll" | "fjord" | "mangrove" | "deepsea";
  bg: { sky: string; water: string };
};

export const LEVELS: Level[] = [
  {
    id: "lvl_01",
    title: "Serene Lake",
    description: "A calm sheltered lake with slow-moving fish — perfect for learning the ropes.",
    targetScore: 200,
    requiredCatches: 8,
    durationSec: 90,
    speedMultiplier: 1.0,
    trashRate: 0.06,
    theme: "lake",
    bg: { sky: "linear-gradient(180deg,#a7f3d0,#86efac)", water: "linear-gradient(180deg,#60a5fa,#3b82f6)" },
  },
  {
    id: "lvl_02",
    title: "Rushing River",
    description: "Fast currents make fish quicker and trickier — timing is everything here.",
    targetScore: 420,
    requiredCatches: 10,
    durationSec: 85,
    speedMultiplier: 1.25,
    trashRate: 0.08,
    theme: "river",
    bg: { sky: "linear-gradient(180deg,#dbeafe,#93c5fd)", water: "linear-gradient(180deg,#38bdf8,#0ea5e9)" },
  },
  {
    id: "lvl_03",
    title: "Open Ocean",
    description: "Wide-open waters host larger targets and stronger currents — watch the speed.",
    targetScore: 850,
    requiredCatches: 12,
    durationSec: 75,
    speedMultiplier: 1.5,
    trashRate: 0.12,
    theme: "ocean",
    bg: { sky: "linear-gradient(180deg,#bfdbfe,#93c5fd)", water: "linear-gradient(180deg,#0ea5e9,#0369a1)" },
  },
  {
    id: "lvl_04",
    title: "Moonlight Night",
    description: "Night fishing: visibility is lower but rare nocturnal species appear.",
    targetScore: 1250,
    requiredCatches: 15,
    durationSec: 65,
    speedMultiplier: 1.7,
    trashRate: 0.14,
    theme: "night",
    bg: { sky: "linear-gradient(180deg,#0f172a,#0b1220)", water: "linear-gradient(180deg,#075985,#002244)" },
  },
  {
    id: "lvl_05",
    title: "Sunken Cavern",
    description: "Narrow caverns hide treasure and more trash — precision and patience pay off.",
    targetScore: 2600,
    requiredCatches: 20,
    durationSec: 60,
    speedMultiplier: 2.0,
    trashRate: 0.18,
    theme: "cave",
    bg: { sky: "linear-gradient(180deg,#0b1220,#001219)", water: "linear-gradient(180deg,#0f172a,#001219)" },
  },
  {
    id: "lvl_06",
    title: "Coral Reef",
    description: "Colorful reef life — smaller fish but frequent spawns and occasional rare gems.",
    targetScore: 400,
    requiredCatches: 14,
    durationSec: 70,
    speedMultiplier: 1.15,
    trashRate: 0.07,
    theme: "reef",
    bg: { sky: "linear-gradient(180deg,#fff7ed,#fee2b3)", water: "linear-gradient(180deg,#7dd3fc,#0369a1)" },
  },
  {
    id: "lvl_07",
    title: "Tropical Atoll",
    description: "Warm waters and lively schools — focus on chaining catches to build combos.",
    targetScore: 900,
    requiredCatches: 18,
    durationSec: 72,
    speedMultiplier: 1.35,
    trashRate: 0.09,
    theme: "atoll",
    bg: { sky: "linear-gradient(180deg,#e0f2fe,#bae6fd)", water: "linear-gradient(180deg,#60a5fa,#06b6d4)" },
  },
  {
    id: "lvl_08",
    title: "Rocky Fjord",
    description: "Steep cliffs and strong currents — big fish lurk in the eddies.",
    targetScore: 1500,
    requiredCatches: 16,
    durationSec: 68,
    speedMultiplier: 1.6,
    trashRate: 0.13,
    theme: "fjord",
    bg: { sky: "linear-gradient(180deg,#c7d2fe,#93c5fd)", water: "linear-gradient(180deg,#2563eb,#0b3d91)" },
  },
  {
    id: "lvl_09",
    title: "Mangrove Pass",
    description: "Narrow channels with hidden pockets — careful casting helps avoid trash snags.",
    targetScore: 1100,
    requiredCatches: 17,
    durationSec: 66,
    speedMultiplier: 1.4,
    trashRate: 0.16,
    theme: "mangrove",
    bg: { sky: "linear-gradient(180deg,#d1fae5,#bbf7d0)", water: "linear-gradient(180deg,#34d399,#0ea5a3)" },
  },
  {
    id: "lvl_10",
    title: "Abyssal Deep",
    description: "Venturing deep — very rare monsters and treasures appear, but danger is high.",
    targetScore: 5000,
    requiredCatches: 25,
    durationSec: 80,
    speedMultiplier: 2.3,
    trashRate: 0.2,
    theme: "deepsea",
    bg: { sky: "linear-gradient(180deg,#0b1220,#020617)", water: "linear-gradient(180deg,#001219,#020617)" },
  },
];

export const LEVEL_SUMMARY = LEVELS.map((l) => ({ id: l.id, title: l.title }));