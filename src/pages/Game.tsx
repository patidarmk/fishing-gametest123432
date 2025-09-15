"use client";
import React from "react";
import LevelManager from "@/components/LevelManager";
import { Link } from "@tanstack/react-router";

export default function GamePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <nav className="text-sm text-gray-500">
            <Link to="/" className="underline mr-2">
              Home
            </Link>
            / <span className="ml-2 font-medium">Play</span>
          </nav>
          <h2 className="text-2xl font-bold">Play — Fisher's Cove</h2>
          <p className="text-sm text-gray-500">Tap or click to drop the hook. Spacebar also works on desktop.</p>
        </div>
        <div>
          <Link to="/" className="text-sm text-sky-600 underline">
            Back to home
          </Link>
        </div>
      </div>

      <LevelManager width={960} height={520} onExit={() => { window.history.back(); }} />
    </div>
  );
}