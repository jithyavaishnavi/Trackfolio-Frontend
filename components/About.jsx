"use client";
import { Users, Target, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const green = "#8FE649";

  return (
    <div
      className="min-h-screen flex flex-col relative z-0"
      style={{
        backgroundImage: `url('')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen text-white px-6 py-16 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-8 text-center"
        >
          About <span className="text-[#8FE649]">TrackFolio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl text-center text-gray-300 mb-16 mx-auto text-lg"
        >
          TrackFolio is a futuristic platform built to simplify your placement season.
          We help you stay organized with one clean dashboard—no more spreadsheets, no more chaos.
        </motion.p>

        {/* Features Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Users size={40} className="mx-auto mb-4" />,
              title: "Who We Are",
              desc: "We’re a team of passionate developers building tools for students to stay ahead during placements.",
            },
            {
              icon: <Target size={40} className="mx-auto mb-4" />,
              title: "Our Mission",
              desc: "To provide one centralized platform that keeps your data organized and accessible anytime.",
            },
            {
              icon: <Star size={40} className="mx-auto mb-4" />,
              title: "Our Vision",
              desc: "Empower every student with tools that reduce stress and increase productivity during placement prep.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform"
            >
              <div style={{ color: green }}>{item.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <section className="w-full text-center">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8"
          >
            Meet the Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Jithya", role: "Frontend / Backend Developer" },
              { name: "Aditya", role: "Frontend / Backend Developer" },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center hover:scale-105 transition-transform"
              >
                <div className="w-24 h-24 rounded-full bg-[#8FE649]/30 mb-4 flex items-center justify-center text-black font-bold text-lg">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-xl">{member.name}</h3>
                <p className="text-gray-300 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
