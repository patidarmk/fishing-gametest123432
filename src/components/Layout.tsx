"use client";
import React from "react";
import Header from "./Header";
import { MadeWithApplaa } from "./made-with-applaa";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
          {children}
        </motion.div>
      </main>
      <footer className="mt-8">
        <div className={cn("container mx-auto px-4 py-6", "flex items-center justify-between")}>
          <div className="text-sm text-gray-500">© {new Date().getFullYear()} Fisher's Cove</div>
          <MadeWithApplaa />
        </div>
      </footer>
    </div>
  );
};

export default Layout;