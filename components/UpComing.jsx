"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Briefcase, Clock, ArrowRight } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080/drives/type?type=upcoming";

export default function Upcoming() {
  const router = useRouter();
  const greenGradient = "linear-gradient(135deg, #8fe649, #4caf50)";

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch upcoming companies");
        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        console.error(err);
        setCompanies([]); // fallback to empty list
        setError("Could not load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleViewDetails = (id) => {
    router.push(`/company/${id}`);
  };

  return (
    <section className="mt-10 mb-12 max-w-6xl mx-auto px-4">
      <h2 className="text-4xl md:text-4xl font-bold mb-12 text-white text-center">
        Upcoming Drives
      </h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {companies.length > 0 ? (
            companies.map((drive, idx) => (
              <motion.div
                key={drive.id || idx}
                className="relative bg-black/60 backdrop-blur-lg rounded-2xl p-6 flex flex-col gap-4 shadow-[0_8px_25px_rgba(143,230,73,0.15)] hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5, type: "tween" }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full text-black font-bold text-xl shadow-md"
                  style={{ background: greenGradient }}
                >
                  {drive.company?.[0] || "?"}
                </div>

                <h3 className="text-2xl font-bold text-green-300">
                  {drive.company}
                </h3>

                <div className="text-gray-300 space-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>{drive.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <span>{drive.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>{drive.time}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleViewDetails(drive.id)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full py-2 px-4 font-semibold text-black hover:opacity-90 transition-all duration-300"
                  style={{ background: greenGradient }}
                  aria-label={`View details for ${drive.company}`}
                >
                  View Details <ArrowRight size={16} />
                </button>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-300">
              No drives found.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
