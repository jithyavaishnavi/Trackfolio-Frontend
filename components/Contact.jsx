"use client";
import { Linkedin } from "lucide-react";

export default function Contact() {
  const green = "#8FE649";
  const linkedInURL = "https://www.linkedin.com/in/your-profile"; // replace with your LinkedIn

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-white"
      style={{
        backgroundImage: "url('/bg2.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
        Get in <span style={{ color: green }}>Touch</span>
      </h1>

      <p className="max-w-xl text-center text-gray-300 mb-12 text-lg">
        Have questions or feedback? Reach out to us directly on LinkedIn.
      </p>

      <a
        href="https://www.linkedin.com/in/jithya-vaishnavi-6761a820a/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-[#8FE649] text-black px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#8FE649] transition-colors duration-300"
      >
        <Linkedin size={24} /> Contact on LinkedIn
      </a>
    </div>
  );
}
