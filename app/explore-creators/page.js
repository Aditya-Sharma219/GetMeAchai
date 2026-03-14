"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const ExploreCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await fetch("/api/creators");
        const data = await res.json();
        setCreators(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchCreators();
  }, []);

  if (loading)
    return (
      <div className="text-white text-center mt-20 text-xl">
        Loading creators...
      </div>
    );

  return (
    <div className="min-h-screen text-white px-8 py-24">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Explore Creators
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {creators.map((creator) => (
          <Link
            key={creator._id}
            href={`/${creator.username}`}
            className="bg-slate-800 hover:bg-slate-700 transition p-6 rounded-xl flex flex-col items-center"
          >
            <img
              src={creator.profilepic || "/default-avatar.png"}
              alt="creator"
              className="w-20 h-20 rounded-full mb-4"
            />

            <h2 className="text-lg font-semibold">
              {creator.name}
            </h2>

            <p className="text-gray-400">@{creator.username}</p>

            <span className="mt-3 text-blue-400 text-sm">
              Support Creator →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreCreators;