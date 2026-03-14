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

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full text-white flex items-center justify-between px-6 py-4 z-50 transition-all duration-300 ${
        scrolling ? "bg-blue-950/85 shadow-lg" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="text-2xl font-extrabold tracking-wide">
        GetMeChai
      </Link>

      {/* 🔎 Search Bar */}
      <div className="relative hidden md:block">
        <input
          type="text"
          placeholder="Search creators..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-lg bg-slate-800 text-white placeholder-gray-400 w-64 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  alt="avatar"
                  className="w-6 h-6 rounded-full"
                />
                {user.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Welcome */}
      {session && session.user?.name && (
        <span className="hidden md:block text-lg font-medium">
          Welcome, {session.user.name.split(" ")[0]}!
        </span>
      )}

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Links */}
      <ul
        className={`md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-blue-950 md:bg-transparent transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <li className="py-2 px-6 hover:text-blue-500 md:py-0 md:px-0">
          <Link href="/">Home</Link>
        </li>

        <li className="py-2 px-6 hover:text-blue-500 md:py-0 md:px-0">
          <Link href="/about">About</Link>
        </li>

        <li className="py-2 px-6 hover:text-blue-500 md:py-0 md:px-0">
          <Link href="/contact">Contact</Link>
        </li>

        <li className="py-2 px-6 hover:text-blue-500 md:py-0 md:px-0">
          <Link href={`/${session?.user?.username || ""}`}>Your page</Link>
        </li>

        <li className="py-2 px-6 md:py-0 md:px-0">
          {session ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:bg-gradient-to-l font-medium rounded-lg text-sm px-5 py-2.5 shadow-lg"
              >
                Dashboard
              </Link>

              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5 text-sm"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l font-medium rounded-lg text-sm px-5 py-2.5 shadow-lg"
            >
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;