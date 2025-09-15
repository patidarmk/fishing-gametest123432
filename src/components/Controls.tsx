"use client";
import React from "react";
import { Bolt, Clock, Magnet, Pause, Play, RefreshCw, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

type Props = {
  onDrop?: () => void;
  onReel?: () => void;
  onPause?: () => void;
  paused?: boolean;
  onRestart?: () => void;
  onPowerup?: (type: "magnet" | "time" | "double") => void;
};

export default function Controls({ onDrop, onReel, paused, onPause, onRestart, onPowerup }: Props) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={onDrop}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-400 text-white shadow-lg hover:scale-105 transition-transform"
          title="Drop Hook"
        >
          <ArrowDownCircle size={18} /> Drop
        </button>

        <button
          onClick={onReel}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow hover:scale-105 transition-transform border"
          title="Reel In"
        >
          <ArrowUpCircle size={18} /> Reel
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPowerup?.("magnet")}
          className="p-2 rounded-md bg-white shadow hover:scale-105 transition-transform border"
          title="Magnet (5s)"
        >
          <Magnet className="text-sky-500" size={18} />
        </button>
        <button
          onClick={() => onPowerup?.("time")}
          className="p-2 rounded-md bg-white shadow hover:scale-105 transition-transform border"
          title="Time Freeze (5s)"
        >
          <Clock className="text-amber-500" size={18} />
        </button>
        <button
          onClick={() => onPowerup?.("double")}
          className="p-2 rounded-md bg-white shadow hover:scale-105 transition-transform border"
          title="Double Points (8s)"
        >
          <Bolt className="text-emerald-500" size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPause}
          className="p-2 rounded-md bg-white shadow hover:scale-105 transition-transform border"
          title={paused ? "Resume" : "Pause"}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>

        <button
          onClick={onRestart}
          className="p-2 rounded-md bg-white shadow hover:scale-105 transition-transform border"
          title="Restart"
        >
          <RefreshCw size={16} />
        </button>
      </div>
    </div>
  );
}