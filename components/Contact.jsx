"use client";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";


export default function Contact() {
  const green = "#8FE649";
  const linkedInURL = "https://www.linkedin.com/in/your-profile"; // replace with your LinkedIn

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-[#F5F5DC]"
      style={{
        backgroundImage: "url('/bg2.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
        Get in <span style={{ color: "#A7D16C" }}>Touch</span>
      </h1>

      <p className="max-w-xl text-center text-gray-300 mb-12 text-lg">
        Have questions or feedback? Reach out to us directly on LinkedIn.
      </p>

      {/* Team Section */}
      <section className="w-full text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 drop-shadow-lg"
        ></motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {[
            {
              name: "Jithya Vaishnavi",
              role: "Frontend Developer",
              techStack: "Tech stack - Next.js, TailwindCSS",
              linkedin:
                "https://www.linkedin.com/in/jithya-vaishnavi-6761a820a/",
            },
            {
              name: "Adithya Hemchand",
              role: "Backend Developer",
              techStack: "Tech stack - Spring Boot | Database - PostgreSQL",
              db: "",
              linkedin: "https://www.linkedin.com/in/adithya-hemchand/",
            },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="backdrop-blur-xl bg-[#F5F5DC]/10 border border-black/20 rounded-3xl p-8 flex flex-col items-center shadow-lg"
            >
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-2xl text-[#F5F5DC] hover:text-[#A7D16C]"
              >
                {member.name}
              </a>
              <div className="flex flex-col items-center gap-2 mt-2">
                <p className="text-gray-200 text-sm">{member.role}</p>
                {member.techStack && (
                  <p className="text-gray-200 text-sm">{member.techStack}</p>
                )}
                {member.db && (
                  <p className="text-gray-200 text-sm">{member.db}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
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
