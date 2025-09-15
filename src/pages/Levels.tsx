"use client";
import React from "react";
import { LEVELS } from "@/data/levels";

export default function LevelsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Choose a Level</h2>
          <p className="text-sm text-gray-500">Pick a challenge — each level changes speed, duration and trash rate.</p>
        </div>
        <div>
          <a href="/" className="text-sm text-sky-600 underline">
            Back
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {LEVELS.map((lvl) => (
          <div key={lvl.id} className="rounded-xl p-4 shadow bg-white dark:bg-slate-800 border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{lvl.title}</h3>
              <div className="text-xs text-slate-500">{lvl.durationSec}s</div>
            </div>
            <p className="text-sm text-slate-600 mb-3">{lvl.description}</p>
            <div className="flex items-center justify-between">
              <a className="px-3 py-2 rounded bg-sky-600 text-white" href={`/game?level=${lvl.id}`}>
                Play
              </a>
              <a href={`/levels/${lvl.id}`} className="text-slate-500 text-sm">
                Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}