"use client";
import React from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center shadow-md">
              <motion.div
                animate={{ rotate: [0, 8, 0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="text-white font-extrabold text-xl select-none"
              >
                F
              </motion.div>
            </div>
            <div>
              <Link to="/" className="flex items-baseline">
                <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-emerald-500">
                  Fisher's Cove
                </h1>
                <span className="ml-2 text-xs text-gray-500">Beta</span>
              </Link>
              <p className="text-xs text-gray-400">A playful fishing adventure</p>
            </div>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/game" className="text-gray-700 hover:text-sky-600 font-medium">
              Play
            </Link>
            <Link to="/leaderboard" className="text-gray-700 hover:text-sky-600 font-medium">
              Leaderboard
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-sky-600 font-medium">
              About
            </Link>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-gray-700 hover:text-sky-600 font-medium"
            >
              Shop
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Open menu"
              className="p-2 rounded-md bg-white/60 shadow-sm border border-gray-200"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-gray-200/50 bg-white/90 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-2">
            <Link to="/game" onClick={() => setOpen(false)} className="block font-medium text-gray-700">
              Play
            </Link>
            <Link to="/leaderboard" onClick={() => setOpen(false)} className="block font-medium text-gray-700">
              Leaderboard
            </Link>
            <Link to="/about" onClick={() => setOpen(false)} className="block font-medium text-gray-700">
              About
            </Link>
            <a className="block font-medium text-gray-700">Shop</a>
          </div>
        </div>
      )}
    </header>
  );
}