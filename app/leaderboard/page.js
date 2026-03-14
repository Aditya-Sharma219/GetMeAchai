"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Leaderboard() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setCreators(data);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen text-white p-20">
      <h1 className="text-4xl font-bold text-center mb-10">
        Creator Leaderboard
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">
        {creators.map((creator, index) => (
          <Link
            key={index}
            href={`/${creator.username}`}
            className="flex items-center justify-between bg-slate-800 p-4 rounded-lg hover:bg-slate-700"
          >
            <div className="flex items-center gap-4">
              <img
                src={creator.profilepic || "/default-avatar.png"}
                className="w-12 h-12 rounded-full"
              />

              <div>
                <p className="font-semibold">{creator.name}</p>
                <p className="text-gray-400">@{creator.username}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-green-400 font-bold">₹{creator.total}</p>
              <p className="text-sm text-gray-400">
                {creator.supporters} supporters
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}