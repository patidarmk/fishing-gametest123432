"use client";
import React from "react";

const Team = [
  { name: "Ava Marlow", role: "Lead Designer", bio: "Loves waves and pixel art." },
  { name: "Kai Rivers", role: "Gameplay Engineer", bio: "Physics nerd and fishing enthusiast." },
  { name: "Maya Finch", role: "Audio Designer", bio: "Composes relaxing ocean loops." },
];

export default function About() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">About Fisher's Cove</h2>
        <p className="text-gray-600">A playful arcade fishing experience built as a demo with smooth canvas rendering and cute visuals.</p>
      </div>

      <div className="bg-white rounded-md shadow p-4">
        <h3 className="font-semibold mb-2">Our Mission</h3>
        <p className="text-gray-600">Build delightful, accessible games that run anywhere — phones, tablets, and desktops.</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Team.map((m) => (
            <div key={m.name} className="p-4 bg-white rounded-md shadow">
              <div className="font-medium">{m.name}</div>
              <div className="text-sm text-gray-500">{m.role}</div>
              <p className="text-sm mt-2 text-gray-600">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}