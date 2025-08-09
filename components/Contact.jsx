"use client";
import { Send } from "lucide-react";

export default function Contact() {
  const green = "#8FE649";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-16">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6 text-center">
        Get in <span style={{ color: green }}>Touch</span>
      </h1>

      {/* Description */}
      <p className="max-w-xl text-center text-gray-400 mb-12">
        Have questions or feedback? We’d love to hear from you! Drop us a message, and our team will get back to you shortly.
      </p>

      {/* Contact Form */}
      <form
        className="w-full max-w-md bg-black border border-white rounded-lg p-6 shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Form submitted!");
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          className="w-full mb-4 px-4 py-3 rounded bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8FE649]"
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full mb-4 px-4 py-3 rounded bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8FE649]"
          required
        />

        <textarea
          rows="4"
          placeholder="Your Message"
          className="w-full mb-6 px-4 py-3 rounded bg-black border border-white text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-[#8FE649]"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-[#8FE649] hover:bg-[#8FE649] transition-colors duration-300 py-3 rounded-full font-semibold flex justify-center items-center gap-2"
        >
          Send Message <Send size={18} />
        </button>
      </form>

      
    </div>
  );
}
