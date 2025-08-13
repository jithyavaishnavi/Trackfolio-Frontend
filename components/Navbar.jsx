// components/Navbar.jsx
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div>
    {/* Navbar */}
        <header className="flex items-center justify-between px-8 py-4 mt-4">
          <Link href="/" className="max-w- text-[#ffffff] drop-shadow-[0_0_8px_#8FE649] text-2xl font-bold tracking-wide">
            TRACKFOLIO.
          </Link>

          <nav className="flex flex-wrap justify-between items-center gap-6">
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-gray-300 text-sm sm:text-base mt-4 ">
              <li className="hover:text-[#8FE649] cursor-pointer">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-[#8FE649] cursor-pointer">
                <Link href="/about">About</Link>
              </li>
              <li className="hover:text-[#8FE649] cursor-pointer">
                <Link href="/contact">Contact Us</Link>
              </li>
              <li className="hover:text-[#8FE649] cursor-pointer">
                <Link href="/whats-new">What's New?</Link>
              </li>
              <li className="hover:text-[#8FE649] cursor-pointer">
                <Link href="/contact">Feedback</Link>
              </li>

            </ul>
          </nav>
          <Link href="/login">
            <button className=" h-10 flex justify-center items-center bg-transparent font-semibold text-white border border-white rounded-full px-6 sm:px-8 py-2 sm:py-3 hover:bg-white hover:text-[#8FE649] transition text-sm sm:text-base">
              LogIn
            </button>
          </Link>
        </header>
    </div>
  );
};


