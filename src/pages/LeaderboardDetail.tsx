"use client";
import React from "react";
import { loadLeaderboard } from "@/data/leaderboard";

export default function LeaderboardDetail() {
  const id = typeof window !== "undefined" ? window.location.pathname.split("/").pop() : null;
  const [entry, setEntry] = React.useState<any | null>(null);

  React.useEffect(() => {
    if (!id) return;
    const all = loadLeaderboard();
    const found = all.find((x) => x.id === id) || null;
    setEntry(found);
  }, [id]);

  if (!entry) {
    return (
      <div>
        <h2 className="text-xl font-bold">Entry not found</h2>
        <a href="/leaderboard" className="text-sky-600 underline">
          Back to leaderboard
        </a>
      </div>
    );
  }

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-2">
        <a href="/leaderboard" className="underline">
          Leaderboard
        </a>
        <span className="ml-2">{entry.name}</span>
      </nav>

      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-2xl font-bold">{entry.name}</h2>
        <p className="text-sm text-gray-600 mt-2">Score: <span className="font-semibold">{entry.score}</span></p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 rounded">
            <div className="text-xs text-slate-500">Date</div>
            <div className="font-medium">{entry.date}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded">
            <div className="text-xs text-slate-500">Fish Caught</div>
            <div className="font-medium">{entry.details?.fishCaught ?? 0}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded">
            <div className="text-xs text-slate-500">Trash Caught</div>
            <div className="font-medium">{entry.details?.trashCaught ?? 0}</div>
          </div>
        </div>

        <div className="mt-4">
          <a href="/leaderboard" className="px-4 py-2 rounded bg-white border">
            Back to Leaderboard
          </a>
        </div>
      </div>
    </div>
  );
}