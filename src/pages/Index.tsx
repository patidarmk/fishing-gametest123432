"use client";
import React from "react";
import { Link } from "@tanstack/react-router";

export default function Index() {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl font-extrabold">Cast a line and reel in the fun</h1>
        <p className="mt-3 text-gray-600">
          Fisher's Cove is a charming arcade fishing game — snack-sized levels, colorful fish,
          and a leaderboard to show off your best catches.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Link
            to="/game"
            className="px-5 py-3 rounded-lg bg-gradient-to-br from-sky-600 to-emerald-500 text-white font-semibold shadow"
          >
            Play Now
          </Link>
          <Link to="/leaderboard" className="text-sm text-gray-600 underline">
            View Leaderboard
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="p-3 bg-white rounded-md shadow">
            <div className="text-sm font-semibold">Multiple Levels</div>
            <div className="text-xs text-gray-500">Lake, River, Ocean, Night & Treasure Cave</div>
          </div>
          <div className="p-3 bg-white rounded-md shadow">
            <div className="text-sm font-semibold">Power-ups</div>
            <div className="text-xs text-gray-500">Magnet, Time Freeze, Double Points</div>
          </div>
          <div className="p-3 bg-white rounded-md shadow">
            <div className="text-sm font-semibold">Smooth Canvas</div>
            <div className="text-xs text-gray-500">HTML5 Canvas rendering & animated HUD</div>
          </div>
          <div className="p-3 bg-white rounded-md shadow">
            <div className="text-sm font-semibold">Local Leaderboard</div>
            <div className="text-xs text-gray-500">Top 25 scores saved to your browser</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-gradient-to-br from-white to-sky-50 rounded-xl shadow-lg">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-emerald-400 text-white text-2xl font-bold shadow">
              F
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold">Ready to fish?</h3>
            <p className="text-sm text-gray-600 mt-2">
              Tap or click to drop your hook. Use Spacebar on desktop. Collect fish, avoid trash,
              and climb the leaderboard!
            </p>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/game"
              className="px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold shadow"
            >
              Start Game
            </Link>
            <Link to="/about" className="px-4 py-2 rounded-lg border">
              About
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}