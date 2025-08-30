// components/Navbar.jsx
"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header
      className="flex items-center justify-between px-8 py-4 mt-4"
      style={{
        backgroundImage: "url('/bgplain.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="text-white drop-shadow-[0_0_8px_#8FE649] text-2xl font-bold tracking-wide"
      >
        TRACKFOLIO.
      </Link>

      {/* Navigation */}
      <nav className="flex items-center justify-center gap-6">
        <ul className="flex items-center justify-center gap-6 text-gray-300 text-sm sm:text-base
               bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-4 mx-auto">
          <li className="hover:text-[#8FE649] cursor-pointer transition-colors duration-300">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-[#8FE649] cursor-pointer transition-colors duration-300">
            <Link href="/contact">Contact Us</Link>
          </li>
          <li className="hover:text-[#8FE649] cursor-pointer transition-colors duration-300">
            <Link href="/whatsnew">What's New?</Link>
          </li>
          
        </ul>

        {/* Action Buttons */}
        <div className="flex gap-3 ml-4">
          <Link href="/login">
            <button className="h-10 sm:h-12 px-6 sm:px-8 py-2 sm:py-3 bg-transparent border border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#8FE649] transition">
              Log In
            </button>
          </Link>
          <Link href="/create-account">
            <button className="h-10 sm:h-12 px-6 sm:px-8 py-2 sm:py-3 bg-[#8FE649] text-black rounded-full font-semibold hover:bg-white hover:text-[#8FE649] transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
