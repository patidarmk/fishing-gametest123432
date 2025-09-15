"use client";
import React from "react";
import GameCanvas from "./GameCanvas";
import HUD from "./HUD";
import Controls from "./Controls";
import { motion } from "framer-motion";
import { saveScore } from "@/data/leaderboard";
import { LEVELS as DATA_LEVELS, type Level as DataLevel } from "@/data/levels";

/**
 * LevelManager ties the GameCanvas with UI and game logic.
 * Now driven by central DATA_LEVELS so levels shown in the rest of the app match the playable levels.
 */

type Props = {
  width?: number;
  height?: number;
  onExit?: () => void;
};

type Popup = {
  id: string;
  text: string;
  x?: number;
  y?: number;
};

const HS_KEY = "fisher_cove_highscore_v1";

export default function LevelManager({ width = 900, height = 480, onExit }: Props) {
  const [levelIndex, setLevelIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [lives, setLives] = React.useState(3);
  const [timer, setTimer] = React.useState<number>(() => DATA_LEVELS[0].durationSec);
  const [paused, setPaused] = React.useState(false);
  const [fishCaught, setFishCaught] = React.useState(0);
  const [trashCaught, setTrashCaught] = React.useState(0);
  const [combo, setCombo] = React.useState(0);
  const [power, setPower] = React.useState<{ magnet?: boolean }>({});
  const [doublePoints, setDoublePoints] = React.useState(false);
  const [popups, setPopups] = React.useState<Popup[]>([]);
  const [gameOver, setGameOver] = React.useState(false);
  const [themeName, setThemeName] = React.useState<string>(DATA_LEVELS[0].title);

  const currentLevel: DataLevel = DATA_LEVELS[levelIndex];
  const difficulty = levelIndex + 1; // passed to canvas; higher -> harder

  React.useEffect(() => {
    setThemeName(currentLevel.title);
    setTimer(currentLevel.durationSec);
    setFishCaught(0);
    setTrashCaught(0);
    setCombo(0);
    setScore(0);
    setLives(3);
    setGameOver(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIndex]);

  // countdown timer
  React.useEffect(() => {
    if (paused || gameOver) return;
    const id = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(id);
          endLevel();
          return 0;
        }
        return Math.max(0, t - 1);
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, gameOver, levelIndex]);

  function addPopup(text: string) {
    const id = String(Math.random());
    setPopups((p) => [...p, { id, text }]);
    setTimeout(() => {
      setPopups((p) => p.filter((x) => x.id !== id));
    }, 1200);
  }

  function onCatch(item: any) {
    const base = item?.points ?? 100;
    const points = doublePoints ? base * 2 : base;
    setScore((s) => s + points);
    setFishCaught((f) => f + 1);
    setCombo((c) => c + 1);
    addPopup(`+${points}`);
  }

  function onTrash(item: any) {
    const penalty = Math.abs(item?.points ?? 50);
    setScore((s) => Math.max(0, s - penalty));
    setTrashCaught((t) => t + 1);
    setCombo(0);

    // use functional update to reliably get newLives
    setLives((prevLives) => {
      const newLives = Math.max(0, prevLives - 1);
      if (newLives <= 0) {
        // small delay to show animation then end
        setTimeout(() => {
          setGameOver(true);
          endGame();
        }, 400);
      }
      return newLives;
    });

    addPopup(`-${penalty}`);
  }

  function onMiss() {
    setCombo(0);
    // no score change
  }

  function togglePause() {
    setPaused((p) => !p);
  }

  function restartLevel() {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setTimer(currentLevel.durationSec);
    setFishCaught(0);
    setTrashCaught(0);
    setCombo(0);
  }

  function nextLevel() {
    if (levelIndex < DATA_LEVELS.length - 1) {
      setLevelIndex((i) => i + 1);
    } else {
      // finished campaign
      setGameOver(true);
      endGame(true);
    }
  }

  function endLevel() {
    const targetCatches = currentLevel.requiredCatches ?? 0;
    const targetScore = currentLevel.targetScore ?? 0;

    if ((targetCatches && fishCaught >= targetCatches) || (targetScore && score >= targetScore)) {
      // level cleared
      addPopup("Level Cleared!");
      setTimeout(() => nextLevel(), 1000);
    } else {
      // failed level
      setGameOver(true);
      endGame();
    }
  }

  function endGame(finished = false) {
    // Save score to leaderboard (with minimal details)
    const entry = {
      id: String(Date.now()),
      name: "Player",
      score,
      date: new Date().toISOString().split("T")[0],
      details: {
        fishCaught,
        trashCaught,
        accuracy: fishCaught + trashCaught > 0 ? Math.round((fishCaught / (fishCaught + trashCaught)) * 100) : 0,
      },
    };
    saveScore(entry);
    // Save highscore key also
    const rawHS = localStorage.getItem(HS_KEY);
    const currentHigh = rawHS ? Number(rawHS) : 0;
    if (score > currentHigh) localStorage.setItem(HS_KEY, String(score));
  }

  // powerups
  function activatePower(type: "magnet" | "time" | "double") {
    if (type === "magnet") {
      setPower({ magnet: true });
      setTimeout(() => setPower({}), 5000);
    } else if (type === "time") {
      // add time
      setTimer((t) => t + 6);
    } else if (type === "double") {
      setDoublePoints(true);
      setTimeout(() => setDoublePoints(false), 8000);
    }
  }

  // small UI to show stats and game-over summary
  return (
    <div className="w-full">
      <div className="mb-4">
        <HUD score={score} level={levelIndex + 1} timer={timer} lives={lives} onSaveHighScore={() => {}} />
      </div>

      <div className="rounded-lg overflow-hidden shadow-lg border bg-white">
        <div className="relative">
          {/* Thematic header bar */}
          <div className="absolute left-4 top-4 px-3 py-1 rounded-full bg-white/70 text-sm font-medium shadow">
            {themeName}
          </div>

          <GameCanvas
            width={width}
            height={height}
            difficulty={Math.max(1, Math.floor(currentLevel.speedMultiplier * difficulty))}
            onCatch={onCatch}
            onTrash={onTrash}
            onMiss={onMiss}
            paused={paused}
            power={power}
          />
        </div>

        <div className="p-4">
          <Controls
            onDrop={() => {
              window.dispatchEvent(new PointerEvent("pointerdown"));
            }}
            onReel={() => {
              window.dispatchEvent(new PointerEvent("pointerdown"));
            }}
            paused={paused}
            onPause={togglePause}
            onRestart={restartLevel}
            onPowerup={activatePower}
          />

          {/* popups */}
          <div className="absolute right-6 top-28 flex flex-col items-end space-y-2 pointer-events-none">
            {popups.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: -8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md shadow text-sm font-semibold text-sky-700"
              >
                {p.text}
              </motion.div>
            ))}
          </div>

          {/* game over summary */}
          {gameOver && (
            <div className="mt-4 p-4 bg-gradient-to-br from-indigo-50 to-emerald-50 rounded-md border shadow">
              <h3 className="text-lg font-bold mb-2">Game Over</h3>
              <p className="text-sm text-gray-600 mb-2">
                Score: <span className="font-semibold">{score}</span> | Fish:{" "}
                <span className="font-semibold">{fishCaught}</span> | Trash:{" "}
                <span className="font-semibold">{trashCaught}</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setGameOver(false);
                    restartLevel();
                  }}
                  className="px-4 py-2 bg-sky-600 text-white rounded-md shadow"
                >
                  Play Again
                </button>
                <button
                  onClick={() => {
                    if (onExit) onExit();
                  }}
                  className="px-4 py-2 bg-white border rounded-md"
                >
                  Exit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}