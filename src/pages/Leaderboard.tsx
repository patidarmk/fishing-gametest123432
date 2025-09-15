"use client";
import React from "react";
import { loadLeaderboard, ScoreEntry } from "@/data/leaderboard";

export default function LeaderboardPage() {
  const [items, setItems] = React.useState<ScoreEntry[]>([]);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(0);
  const PAGE_SIZE = 5;

  React.useEffect(() => {
    setItems(loadLeaderboard());
  }, []);

  const filtered = items.filter((it) => it.name.toLowerCase().includes(query.toLowerCase()));
  const paged = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Leaderboard</h2>
          <p className="text-sm text-gray-500">Top scores saved locally (top 25).</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Search by name"
            className="px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="bg-white rounded-md shadow divide-y">
        {paged.map((it) => (
          <div key={it.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-xs text-gray-500">{it.date} — Fish: {it.details?.fishCaught ?? 0}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{it.score}</div>
              <a href={`/leaderboard/${it.id}`} className="text-xs text-sky-600 underline">
                Details
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">{filtered.length} scores</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(0, p - 1))} className="px-3 py-1 border rounded-md">
            Prev
          </button>
          <div className="px-2">
            {page + 1} / {Math.max(1, totalPages)}
          </div>
          <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} className="px-3 py-1 border rounded-md">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}