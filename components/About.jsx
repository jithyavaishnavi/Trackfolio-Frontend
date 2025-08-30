"use client";
import { Users, Target, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const green = "#A7D16C"; // updated green

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: "url('/bg2.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen text-[#F5F5DC] px-6 py-16 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 text-center drop-shadow-lg"
        >
          About <span className="text-[#A7D16C]">TrackFolio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl text-center text-gray-200 mb-16 mx-auto text-lg leading-relaxed drop-shadow-md"
        >
          TrackFolio is your futuristic placement companion. We combine
          simplicity, speed, and style to make sure you’re always one step ahead
          during your placement journey.
        </motion.p>

        {/* Features Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <Users size={48} />,
              title: "Who We Are",
              desc: "A passionate team of developers creating tools for students to excel.",
            },
            {
              icon: <Target size={48} />,
              title: "Our Mission",
              desc: "Centralizing your placement data to save you time and stress.",
            },
            {
              icon: <Star size={48} />,
              title: "Our Vision",
              desc: "Empowering every student with modern, stress-free tools.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.08 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="backdrop-blur-xl bg-[#F5F5DC]/10 border border-black/20 rounded-3xl p-6 text-center shadow-xl"
            >
              <div className="mb-4" style={{ color: green }}>
                {item.icon}
              </div>
              <h3 className="font-semibold text-2xl mb-2">{item.title}</h3>
              <p className="text-gray-200 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <footer className="bg-transparent text-gray-300 px-8 py-6 mt-12">
        <div className="max-w-6xl mx-auto flex items-center sm:flex-row justify-center items-center gap-4 sm:gap-0">
          <div className="text-sm sm:text-base">
            © {new Date().getFullYear()} TRACKFOLIO.
          </div>
        </div>
      </footer>
    </div>
  );
}
