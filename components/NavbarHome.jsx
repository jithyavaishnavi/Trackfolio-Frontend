import React from "react";
import { Menu } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"] });

export default function Navbar() {
  return (
    <header
      className={`relative flex items-center justify-between px-8 py-4 border-b border-neutral-800 bg-gradient-to-b from-black via-neutral-950 to-black shadow-md shadow-[#8FE649]/20 ${montserrat.className}`}
    >
      {/* Logo - left */}
      <h1 className="text-2xl font-bold text-white tracking-wide">
        <span className="text-[#8FE649] drop-shadow-[0_0_8px_#8FE649]">TRACK</span>
        FOLIO
      </h1>

      {/* Nav links - centered */}
      <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex gap-10 text-sm text-neutral-300">
        {["Home", "About Us", "Contact Us"].map((link, i) => (
          <a
            key={i}
            href="#"
            className="relative group hover:text-[#8FE649] transition duration-300"
          >
            {link}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#8FE649] rounded-full group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </a>
        ))}
      </nav>

      {/* Mobile menu - right */}
      <button className="md:hidden hover:scale-110 transition-transform">
        <Menu className="w-7 h-7 text-[#8FE649] drop-shadow-[0_0_6px_#8FE649]" />
      </button>
    </header>
  );
}
