"use client";

import { motion } from "framer-motion";
import { Users, Target, Star, Zap, Calendar, Bell } from "lucide-react";
import Link from "next/link";

export default function WhatsNew() {
  const green = "#8FE649";

  const features = [
    {
      icon: <Users size={48} />,
      title: "Who We Are",
      desc: "Meet the passionate team behind TrackFolio, building tools to simplify placement season.",
    },
    {
      icon: <Target size={48} />,
      title: "Our Mission",
      desc: "Centralize placement data to save students time and stress.",
    },
    {
      icon: <Star size={48} />,
      title: "Our Vision",
      desc: "Empower every student with modern, stress-free tools.",
    },
    {
      icon: <Zap size={48} />,
      title: "Faster Search",
      desc: "Search companies, roles, and dates instantly with improved algorithms.",
    },
    {
      icon: <Calendar size={48} />,
      title: "Drive Scheduling",
      desc: "View all completed and upcoming drives with date-based filters.",
    },
    {
      icon: <Bell size={48} />,
      title: "Real-Time Notifications",
      desc: "Get push notifications for upcoming drives and deadlines.",
    },
  ];

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
      <div className="relative z-10 flex flex-col min-h-screen text-white px-6 py-16 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 text-center drop-shadow-lg"
        >
          <span className="text-[#8FE649]">TrackFolio</span> Features
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl text-center text-gray-200 mb-16 mx-auto text-lg leading-relaxed drop-shadow-md"
        >
          TrackFolio is designed to simplify your placement journey. Here’s an overview of all the features that make it your ultimate placement companion.
        </motion.p>

        {/* Features Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.08 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="backdrop-blur-xl bg-white/10 border border-white/30 rounded-3xl p-6 text-center shadow-xl flex flex-col justify-between"
            >
              <div className="mb-4" style={{ color: green }}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-2xl mb-2">{feature.title}</h3>
              <p className="text-gray-200 text-sm mb-4">{feature.desc}</p>
              
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
