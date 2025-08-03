"use client";

import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="relative w-full bg-gradient-to-b from-black via-[#0A0A0A] to-black text-white overflow-hidden min-h-screen">
      {/* Decorative glowing orb */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8FE649]/10 rounded-full blur-[180px]"></div>
      
      {/* ABOUT SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-20 relative z-10 text-left">
        <h2 className="text-4xl md:text-4xl font-extrabold font-montserrat mb-6">
          <span className="text-[#8FE649] font-montserrat">ABOUT</span> US
        </h2>
        <p className="text-gray-300 text-[15px] md:text-[15px] leading-relaxed max-w-6xl">
          Built for students, by students. Our platform keeps your applications, deadlines, and insights beautifully organized — all in one space. 
          Track deadlines, collaborate with mentors, and access real-time analytics, all designed with a futuristic, minimalistic user interface.
        </p>

        {/* Futuristic Button */}
        <button className="mt-8 px-8 py-3 rounded-full border border-gray-600 
          hover:border-[#8FE649] hover:bg-[#8FE649] hover:text-white
          font-montserrat tracking-wide text-sm transition-all duration-300 
          shadow-[0_0_15px_rgba(143,230,73,0.3)] hover:shadow-[0_0_25px_#8FE649]">
          Know More 
        </button>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-6 mt-24 pb-24 relative z-10">
        <h2 className="text-4xl text-center md:text-4xl font-extrabold font-montserrat mb-6">
          <span className="text-[#8FE649] font-montserrat">FEATURES</span>
        </h2>      
        <p className="text-gray-300 text-[15px] md:text-[15px] leading-relaxed max-w-3xl mx-auto text-center">
          Our tools are designed to help you stay ahead, achieve your goals, and work smarter. Here’s what we offer:
        </p>
  
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureCard 
            title="Analytics" 
            desc="Beautiful dashboards and real-time tracking with customizable charts and progress bars."
            icon="📊"
            accent="from-green-300 to-lime-400"
          />
          <FeatureCard 
            title="Collaboration" 
            desc="Share progress with mentors or teammates with easy access controls and live updates."
            icon="🤝"
            accent="from-green-300 to-lime-400"
          />
          <FeatureCard 
            title="Smart Tools" 
            desc="AI-powered reminders and recommendations help you focus on what matters most."
            icon="⚡"
            accent="from-green-300 to-lime-400"
          />
          <FeatureCard 
            title="Secure Storage" 
            desc="Your data is encrypted and safely backed up in the cloud with zero-trust security."
            icon="🔒"
            accent="from-green-300 to-lime-400"
          />
          <FeatureCard 
            title="Multi-Device Sync" 
            desc="Access your progress and deadlines seamlessly from any device."
            icon="🔄"
            accent="from-green-300 to-lime-400"
          />
          <FeatureCard 
            title="Customizable Workflows" 
            desc="Adapt the platform to your needs with personalized boards and workflows."
            icon="⚙️"
            accent="from-green-300 to-lime-400"
          />
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative z-10 bg-gradient-to-r from-[#8FE649]/20 to-transparent py-16 text-center border-t border-neutral-800">
        <h3 className="text-2xl font-bold mb-4">
          Ready to take control of your applications?
        </h3>
        <p className="text-gray-400 mb-6">Join Trackfolio today and organize your journey like never before.</p>
        <Link 
          href="/signup"
          className="inline-block px-8 py-3 rounded-full bg-[#8FE649] text-black font-semibold hover:shadow-[0_0_30px_#8FE649] transition-all duration-300"
        >
          Get Started
        </Link>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}

/* FEATURE CARD */
function FeatureCard({ icon, title, desc, accent }) {
  return (
    <div className={`group flex flex-col items-center text-center p-8 rounded-2xl 
      bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg shadow-black/30 
      transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(143,230,73,0.4)]`}>
      
      {/* Icon with gradient glow */}
      <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 
        bg-gradient-to-br ${accent} text-2xl shadow-[0_0_25px_rgba(255,255,255,0.1)]`}>
        {icon}
      </div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

/* FOOTER COMPONENT */
function Footer() {
  return (
    <footer className="relative z-10 border-t border-neutral-800 bg-black/90 py-10 px-6 text-gray-400">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h4 className="text-white text-xl font-bold mb-4">
            <span className="text-[#8FE649]">TRACK</span>FOLIO
          </h4>
          <p className="text-sm text-gray-500">
            Built for students, by students. Stay organized and succeed.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 text-sm">
          <h5 className="text-white font-semibold mb-2">Quick Links</h5>
          <Link href="/" className="hover:text-[#8FE649]">Home</Link>
          <Link href="/about" className="hover:text-[#8FE649]">About Us</Link>
          <Link href="/features" className="hover:text-[#8FE649]">Features</Link>
          <Link href="/contact" className="hover:text-[#8FE649]">Contact</Link>
        </div>

        {/* Social Media */}
        <div>
          <h5 className="text-white font-semibold mb-2">Follow Us</h5>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-[#8FE649]">🐦</a>
            <a href="#" className="hover:text-[#8FE649]">📘</a>
            <a href="#" className="hover:text-[#8FE649]">📸</a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-600 mt-6">
        © {new Date().getFullYear()} Trackfolio. All rights reserved.
      </div>
    </footer>
  );
}
