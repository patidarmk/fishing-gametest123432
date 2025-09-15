"use client";
import React from "react";
import { LEVELS } from "@/data/levels";

export default function LevelDetail() {
  // get id from path; simple extraction using window.location
  const id = typeof window !== "undefined" ? window.location.pathname.split("/").pop() : null;
  const level = LEVELS.find((l) => l.id === id) ?? LEVELS[0];

  return (
    <div>
      <nav className="text-sm text-slate-500 mb-4">
        <a href="/" className="hover:underline">
          Home
        </a>{" "}
        &nbsp;/&nbsp; <a href="/levels" className="hover:underline">Levels</a> &nbsp;/&nbsp; <span className="font-medium">{level.title}</span>
      </nav>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{level.title}</h2>
            <p className="text-slate-500 mb-4">{level.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded">
                <div className="text-xs text-slate-500">Target Score</div>
                <div className="font-bold">{level.targetScore}</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded">
                <div className="text-xs text-slate-500">Required Catches</div>
                <div className="font-bold">{level.requiredCatches}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <a href={`/game?level=${level.id}`} className="px-4 py-2 bg-sky-600 text-white rounded">
                Play
              </a>
              <a href="/levels" className="px-4 py-2 bg-white rounded">
                Back
              </a>
            </div>
          </div>

          <div className="w-48 text-center">
            <div className="h-32 w-full rounded bg-gradient-to-b from-sky-200 to-sky-400 mb-3"></div>
            <div className="text-xs text-slate-500">Theme: {level.theme}</div>
          </div>
        </div>
      </div>
    </div>
  );
}