"use client";
import React from "react";
import Link from "next/link";
import { Search, LogOut, Menu } from "lucide-react";

export default function NavBarMain({ handleLogout }) {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-neutral-800">
      {/* Logo */}
      <Link
        href="/home"
        className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_#8FE649]"
      >
        TRACKFOLIO.
      </Link>

      <div className="flex items-center gap-6">
        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm text-neutral-300">
          <a href="#" className="hover:text-[#8FE649] transition">
            Previous
          </a>
          <a href="#" className="hover:text-[#8FE649] transition">
            Today
          </a>
          <a href="#" className="hover:text-[#8FE649] transition">
            Future
          </a>
        </nav>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FE649] placeholder-neutral-500"
            aria-label="Search companies"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-neutral-500" />
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 px-3 py-2 bg-transparent hover:bg-[#8FE649] rounded-md transition"
        >
          <LogOut size={16} />
        </button>

        {/* Mobile Menu */}
        <button className="md:hidden" aria-label="Open menu">
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>
    </header>
  );
}
