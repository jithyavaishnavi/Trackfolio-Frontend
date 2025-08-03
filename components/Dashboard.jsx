"use client";
import { Search, Menu, ArrowRight, Calendar, Clock, Briefcase } from "lucide-react";

export default function Dashboard() {
  const green = "#8FE649";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* BACKGROUND LAYERS */}
      <div className="absolute inset-0 z-0">
        {/* Radial glow center */}
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `radial-gradient(circle at center, rgba(143,230,73,0.1), transparent 70%)`,
          }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.04)_1px)] bg-[size:50px_50px] opacity-20" />
        {/* Subtle particles */}
        <div className="absolute inset-0 pointer-events-none animate-[moveParticles_60s_linear_infinite]" 
          style={{
            background: `url('https://www.transparenttextures.com/patterns/stardust.png')`,
            opacity: 0.06
          }}
        />
      </div>

      {/* Header */}
            <header className="flex items-center justify-between px-8 py-4 border-b border-neutral-800">
              <h1 className="text-2xl font-bold text-white tracking-wide">
                <span className="text-[#8FE649] drop-shadow-[0_0_8px_#8FE649]">TRACK</span>
                FOLIO
              </h1>
              <div className="flex items-center gap-6">
                <nav className="hidden md:flex gap-6 text-sm text-neutral-300">
                  <a href="#" className="hover:text-[#8FE649] transition">Previous</a>
                  <a href="#" className="hover:text-[#8FE649] transition">Today</a>
                  <a href="#" className="hover:text-[#8FE649] transition">Future</a>
                </nav>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="rounded-full bg-neutral-900 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FE649] placeholder-neutral-500"
                  />
                  <Search className="absolute right-3 top-2.5 w-4 h-4 text-neutral-500" />
                </div>
                <button className="md:hidden">
                  <Menu className="w-6 h-6 text-white" />
                </button>
              </div>
            </header>

      {/* HERO */}
      <section className="text-center mt-14 relative z-10 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-green-300 to-lime-500 bg-clip-text text-transparent">
          Welcome Aditya!
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Stop juggling spreadsheets and emails during placement season. Stay organized with one futuristic platform built just for you.
        </p>
      </section>

      {/* COMPANY SECTION */}
      <section className="mt-24 px-10 relative z-10">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
          <span className="text-white">UPCOMING </span>
          <span className="text-lime-400">COMPANIES</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
          {[
            {
              company: "SAP Labs",
              date: "24-08-2025 (Saturday)",
              role: "Software Developer",
              time: "10:00 AM",
            },
            {
              company: "Google",
              date: "30-08-2025 (Friday)",
              role: "SDE Intern",
              time: "9:00 AM",
            },
            {
              company: "Amazon",
              date: "02-09-2025 (Monday)",
              role: "Cloud Engineer",
              time: "11:30 AM",
            },
          ].map((drive, idx) => (
            <div
              key={idx}
              className="relative w-80 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.04]"
            >
              {/* Futuristic border glow */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>

              {/* Card Content */}
              <div className="relative bg-black/60 backdrop-blur-lg rounded-2xl p-8 flex flex-col gap-2 shadow-[0_8px_25px_rgba(143,230,73,0.15)]">
                {/* Company Logo */}
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full text-black font-bold text-xl shadow-md"
                  style={{ background: green }}
                >
                  {drive.company[0]}
                </div>

                {/* Company Name */}
                <h3 className="text-2xl font-bold mt-3 tracking-wide text-green-300">
                  {drive.company}
                </h3>

                {/* Info */}
                <div className="text-sm text-gray-300 space-y-3 mt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{drive.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span>{drive.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{drive.time}</span>
                  </div>
                </div>

                {/* Button */}
                <button
                  className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold rounded-full py-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(143,230,73,0.6)]"
                  style={{
                    background: green,
                    color: "black",
                  }}
                >
                  View Details <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto text-gray-500 text-xs px-10 py-8 border-t border-gray-800 relative z-10 backdrop-blur-lg bg-black/30">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-4 flex-wrap text-gray-400 text-sm">
            {["Home", "About", "Terms of Service", "Privacy Policy", "Cookie Policy", "Contact Us", "Send Feedback"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-all">
                {item}
              </a>
            ))}
          </div>
          <p className="text-gray-400">©2025 Jithya Vaishnavi</p>
        </div>
      </footer>

      {/* Particle animation keyframes */}
      <style jsx>{`
        @keyframes moveParticles {
          from { background-position: 0 0; }
          to { background-position: 1000px 1000px; }
        }
      `}</style>
    </div>
  );
}
