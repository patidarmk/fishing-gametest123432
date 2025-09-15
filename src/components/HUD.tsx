"use client";
import React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * HUD accepts props for score/timer/lives and saves / reads high score from localStorage.
 * It also displays animated popups when points change (handled via parent).
 */

type Props = {
  score: number;
  level: number;
  timer: number;
  lives: number;
  onSaveHighScore?: (score: number) => void;
};

const HS_KEY = "fisher_cove_highscore_v1";

export default function HUD({ score, level, timer, lives, onSaveHighScore }: Props) {
  const [high, setHigh] = React.useState<number>(() => {
    const raw = localStorage.getItem(HS_KEY);
    return raw ? Number(raw) : 0;
  });

  useEffect(() => {
    if (score > high) {
      setHigh(score);
      localStorage.setItem(HS_KEY, String(score));
      if (onSaveHighScore) onSaveHighScore(score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  return (
    <div className="w-full flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-md p-3 shadow-md border border-gray-100">
      <div className="flex items-center space-x-4">
        <div>
          <div className="text-xs text-gray-500">Score</div>
          <div className="text-2xl font-bold text-sky-600">{score}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500">High</div>
          <div className="text-lg font-semibold text-amber-600">{high}</div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Level</div>
          <div className="text-lg font-semibold">{level}</div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-right">
          <div className="text-xs text-gray-500">Time</div>
          <div className="text-lg font-semibold">{Math.max(0, Math.ceil(timer))}s</div>
        </div>

        <div>
          <div className="text-xs text-gray-500">Lives</div>
          <div className="text-lg font-semibold">{lives}</div>
        </div>
      </div>
    </div>
  );
}