"use client";
import { useSession, signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // 🔎 Search Users
  useEffect(() => {
    const searchUsers = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    const timer = setTimeout(searchUsers, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 text-white transition-all duration-300 ${
        scrolling ? "bg-blue-950/90 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-wide">
          GetMeChai
        </Link>

        {/* 🔎 Search Bar (center) */}
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Search creators..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white placeholder-gray-400 w-72 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {results.length > 0 && (
            <div className="absolute top-11 left-0 bg-white text-black w-full rounded-lg shadow-lg overflow-hidden">
              {results.map((user) => (
                <Link
                  key={user.username}
                  href={`/${user.username}`}
                  onClick={() => setResults([])}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200"
                >
                  <img
                    src={user.profilepic || "/default-avatar.png"}
                    className="w-6 h-6 rounded-full"
                  />
                  {user.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">

          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>

          <Link href="/explore-creators" className="hover:text-blue-400">
            Explore
          </Link>

          <Link href="/leaderboard" className="hover:text-blue-400">
            Leaderboard
          </Link>

          <Link href="/about" className="hover:text-blue-400">
            About
          </Link>

          <Link href="/contact" className="hover:text-blue-400">
            Contact
          </Link>

          {session && (
            <Link
              href={`/${session?.user?.username || ""}`}
              className="hover:text-blue-400"
            >
              Your Page
            </Link>
          )}

          {session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 rounded-lg text-sm"
              >
                Dashboard
              </Link>

              <button
                onClick={() => signOut()}
                className="bg-red-600 px-4 py-2 rounded-lg text-sm"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg text-sm"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-950 px-6 pb-6 flex flex-col gap-4">

          <Link href="/">Home</Link>
          <Link href="/explore-creators">Explore Creators</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          {session && (
            <Link href={`/${session?.user?.username || ""}`}>
              Your Page
            </Link>
          )}

          {session ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button onClick={() => signOut()} className="text-left">
                Sign out
              </button>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;