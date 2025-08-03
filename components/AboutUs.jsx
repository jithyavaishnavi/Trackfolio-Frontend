"use client";
import { Users, Target, Star } from "lucide-react";

export default function About() {
  const green = "#8FE649";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-16 relative">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `radial-gradient(circle at center, rgba(143,230,73,0.1), transparent 70%)`,
          }}
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat tracking-wide z-10">
          About <span style={{ color: green }}>TrackFolio</span>
        </h1>
        <p className="text-gray-300 max-w-2xl z-10">
          TrackFolio is a futuristic platform built to simplify your placement season. 
          We help you stay organized with one clean dashboard—no more spreadsheets, no more chaos.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-3 gap-6 px-6 md:px-20 mt-10">
        <div
          className="p-6 rounded-xl bg-black shadow-lg relative text-center transition hover:scale-105"
          style={{ border: `1px solid ${green}44` }}
        >
          <Users size={40} style={{ color: green }} className="mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Who We Are</h3>
          <p className="text-gray-400 text-sm">
            We’re a team of passionate developers building tools for students to stay ahead during placements.
          </p>
        </div>
        <div
          className="p-6 rounded-xl bg-black shadow-lg relative text-center transition hover:scale-105"
          style={{ border: `1px solid ${green}44` }}
        >
          <Target size={40} style={{ color: green }} className="mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
          <p className="text-gray-400 text-sm">
            To provide one centralized platform that keeps your data organized and accessible anytime.
          </p>
        </div>
        <div
          className="p-6 rounded-xl bg-black shadow-lg relative text-center transition hover:scale-105"
          style={{ border: `1px solid ${green}44` }}
        >
          <Star size={40} style={{ color: green }} className="mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
          <p className="text-gray-400 text-sm">
            Empower every student with tools that reduce stress and increase productivity during placement prep.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 md:px-20 mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Meet the Team</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {["Jithya", "Aditya"].map((name, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-black shadow-lg relative text-center transition hover:scale-105"
              style={{ border: `1px solid ${green}44` }}
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gray-800 mb-4"></div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-gray-400 text-sm">Frontend / Backend Developer</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm mt-16 mb-6">
        © 2025 TrackFolio. All rights reserved.
      </footer>
    </div>
  );
}
