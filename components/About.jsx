"use client";
import { Users, Target, Star } from "lucide-react";

export default function About() {
  const green = "#8FE649";

  return (
    <div
      className="min-h-screen flex flex-col relative z-0"
      style={{
        backgroundImage: `url('https://i.pinimg.com/1200x/68/41/56/6841566e3471ff089e2b2389ae208a01.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for darkening the background so text is readable */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Content on top */}
      <div className="relative z-10 flex flex-col min-h-screen text-white px-6 py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          About <span style={{ color: green }}>TrackFolio</span>
        </h1>

        <p className="max-w-xl text-center text-gray-300 mb-12 mx-auto">
          TrackFolio is a futuristic platform built to simplify your placement season. We help you stay organized with one clean dashboard—no more spreadsheets, no more chaos.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <Users size={40} style={{ color: green }} className="mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Who We Are</h3>
            <p className="text-gray-300 text-sm">
              We’re a team of passionate developers building tools for students to stay ahead during placements.
            </p>
          </div>
          <div className="text-center">
            <Target size={40} style={{ color: green }} className="mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
            <p className="text-gray-300 text-sm">
              To provide one centralized platform that keeps your data organized and accessible anytime.
            </p>
          </div>
          <div className="text-center">
            <Star size={40} style={{ color: green }} className="mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
            <p className="text-gray-300 text-sm">
              Empower every student with tools that reduce stress and increase productivity during placement prep.
            </p>
          </div>
        </div>

        <section className="w-full text-center">
          <h2 className="text-2xl font-bold mb-6">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-xl mx-auto">
            {["Jithya", "Aditya"].map((name, idx) => (
              <div key={idx} className="bg-[#8FE649] rounded-lg p-6 text-black">
                <div className="w-20 h-20 mx-auto rounded-full bg-black mb-4"></div>
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-sm">Frontend / Backend Developer</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
