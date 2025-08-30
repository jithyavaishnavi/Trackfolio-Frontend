// components/Navbar.jsx
"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header
  className="flex items-center justify-between px-8 py-4 "
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
    className="text-[#F5F5DC] drop-shadow-[0_0_8px_#A7D16C] text-2xl font-bold tracking-wide"
  >
    TRACKFOLIO.
  </Link>

  {/* Navigation */}
  <nav className="flex items-center justify-center gap-6">
    <ul
      className="flex items-center justify-center gap-6 text-[#F5F5DC]/80 text-sm sm:text-base
           bg-[#F5F5DC]/10 backdrop-blur-lg border border-black/20 rounded-full px-6 py-4 mx-auto"
    >
      <li className="hover:text-[#A7D16C] cursor-pointer transition-colors duration-300">
        <Link href="/about">About</Link>
      </li>
      <li className="hover:text-[#A7D16C] cursor-pointer transition-colors duration-300">
        <Link href="/contact">Contact Us</Link>
      </li>
      <li className="hover:text-[#A7D16C] cursor-pointer transition-colors duration-300">
        <Link href="/whatsnew">What's New?</Link>
      </li>
    </ul>

    {/* Action Buttons */}
    <div className="flex gap-3 ml-4">
      <Link href="/login">
        <button className="h-10 sm:h-12 px-6 sm:px-8 py-2 sm:py-3 bg-[#A7D16C] backdrop-blur-md bg-[#F5F5DC]/10 border border-black/20 text-[#F5F5DC] rounded-full font-semibold hover:bg-[#F5F5DC] hover:text-[#A7D16C] transition">
          Log In
        </button>
      </Link>
      <Link href="/create-account">
        <button className="h-10 sm:h-12 px-6 sm:px-8 py-2 sm:py-3 bg-[#A7D16C] text-black rounded-full font-semibold hover:bg-[#F5F5DC] hover:text-[#A7D16C] transition">
          Sign Up
        </button>
      </Link>
    </div>
  </nav>
</header>
  );
}

