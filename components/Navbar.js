"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();


  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScrolling(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full text-white flex items-center justify-between px-6 py-4 z-50
                     transition-all duration-300 ${scrolling ? "bg-blue-950/85 shadow-lg" : "bg-transparent"}`}
    >
      {/* Logo */}
      <Link href="/" className="text-2xl font-extrabold tracking-wide">
        GetMeChai
      </Link>

      {/* Welcome Message */}
      {session && session.user?.name && (
        <span className="hidden md:block text-lg font-medium">
          Welcome, {session.user.name.split(" ")[0]}!
        </span>
      )}

      {/* Mobile Menu Button */}
      <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Navbar Links */}
      <ul className={`md:flex md:items-center md:space-x-6 absolute md:static 
                      top-16 left-0 w-full md:w-auto bg-blue-950 md:bg-transparent transition-all duration-300 
                      ${menuOpen ? "block" : "hidden"}`}>
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
        <Link href={`/${session?.user?.name?.split(" ")[0] || ""}`}>Your page</Link>
        </li>
        <li className="py-2 px-6 md:py-0 md:px-0">
          {session ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:bg-gradient-to-l 
                          focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 
                          font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          shadow-lg shadow-green-800/50 hover:shadow-green-500/50"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-medium rounded-lg px-5 py-2.5 text-sm"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l 
                        focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 
                        font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                        shadow-lg shadow-purple-800/50 hover:shadow-purple-500/50"
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
