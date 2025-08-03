"use client";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
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
          Get in <span style={{ color: green }}>Touch</span>
        </h1>
        <p className="text-gray-300 max-w-2xl z-10">
          Have questions or feedback? We’d love to hear from you!  
          Drop us a message, and our team will get back to you shortly.
        </p>
      </section>

      {/* Contact Info */}
      <section className="grid md:grid-cols-3 gap-6 px-6 md:px-20 mt-10">
        <div
          className="p-6 rounded-xl bg-black shadow-lg relative text-center transition hover:scale-105"
          style={{ border: `1px solid ${green}44` }}
        >
          <Mail size={40} style={{ color: green }} className="mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Email</h3>
          <p className="text-gray-400 text-sm">support@trackfolio.com</p>
        </div>
        <div
          className="p-6 rounded-xl bg-black shadow-lg relative text-center transition hover:scale-105"
          style={{ border: `1px solid ${green}44` }}
        >
          <Phone size={40} style={{ color: green }} className="mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Phone</h3>
          <p className="text-gray-400 text-sm">+91 98765 43210</p>
        </div>
        <div
          className="p-6 rounded-xl bg-black shadow-lg relative text-center transition hover:scale-105"
          style={{ border: `1px solid ${green}44` }}
        >
          <MapPin size={40} style={{ color: green }} className="mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Address</h3>
          <p className="text-gray-400 text-sm">Bangalore, India</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-6 md:px-40 mt-16">
        <form
          className="p-6 md:p-8 rounded-xl shadow-lg bg-black"
          style={{ border: `1px solid ${green}44` }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Send us a <span style={{ color: green }}>Message</span>
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 mb-4 rounded-md bg-black text-sm text-white placeholder-gray-500 transition-all duration-300"
            style={{ border: `1px solid ${green}44` }}
            onFocus={(e) => (e.target.style.border = `1px solid ${green}`)}
            onBlur={(e) => (e.target.style.border = `1px solid ${green}44`)}
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 mb-4 rounded-md bg-black text-sm text-white placeholder-gray-500 transition-all duration-300"
            style={{ border: `1px solid ${green}44` }}
            onFocus={(e) => (e.target.style.border = `1px solid ${green}`)}
            onBlur={(e) => (e.target.style.border = `1px solid ${green}44`)}
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-3 mb-4 rounded-md bg-black text-sm text-white placeholder-gray-500 transition-all duration-300"
            style={{ border: `1px solid ${green}44` }}
            onFocus={(e) => (e.target.style.border = `1px solid ${green}`)}
            onBlur={(e) => (e.target.style.border = `1px solid ${green}44`)}
          ></textarea>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-white font-semibold transition-all duration-300"
            style={{ background: green, boxShadow: `0 0 8px ${green}` }}
            onMouseEnter={(e) =>
              (e.target.style.boxShadow = `0 0 20px ${green}`)
            }
            onMouseLeave={(e) =>
              (e.target.style.boxShadow = `0 0 8px ${green}`)
            }
          >
            Send Message <Send size={18} />
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm mt-16 mb-6">
        © 2025 TrackFolio. All rights reserved.
      </footer>
    </div>
  );
}
