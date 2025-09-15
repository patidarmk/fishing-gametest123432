"use client";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";

const NotFound = () => {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Link to="/" className="text-sky-600 hover:text-sky-800 underline">Return to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;