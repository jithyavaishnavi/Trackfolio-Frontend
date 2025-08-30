"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Briefcase, Clock, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function SearchDatePage() {
  const router = useRouter();
  const { authFetch, logout } = useAuth();

  const greenGradient = "linear-gradient(135deg, #8fe649, #4caf50)";

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");

  const fetchCompanies = async (selectedDate = "") => {
    try {
      setLoading(true);

      const endpoint = selectedDate
        ? `/drives/findByDate?date=${selectedDate}`
        : `/drives/findAll`; // fallback if no date selected

      const res = await authFetch(endpoint, { method: "GET" });

      const data = await res.json();
      const formattedData = data.map((drive) => {
        const dateObj = new Date(drive.driveDatetime);
        return {
          id: drive.id,
          company: drive.companyName,
          role: drive.role,
          date: dateObj.toLocaleDateString(),
          time: dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });

      setCompanies(formattedData);
      setError("");
    } catch (err) {
      console.error(err);
      setCompanies([]);
      setError(err.message || "Could not load data.");
      if (err.message.includes("Session expired")) {
        logout();
        router.push("/home");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    fetchCompanies(selectedDate);
  };

  return (
    <section className="mt-10 mb-12 max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-12 text-white text-center">
        Completed Drives
      </h2>

      <div className="relative mb-6 flex justify-center">
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="border border-gray-500 bg-black/50 text-white p-2 rounded-lg focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : companies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {companies.map((drive, idx) => (
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
              <Link
                href={`/drives/${drive.id}`}
                className="mt-4 flex items-center justify-center gap-2 rounded-full py-2 px-4 font-semibold text-black hover:opacity-90 transition-all duration-300"
                style={{ background: greenGradient }}
                aria-label={`View details for ${drive.company}`}
              >
                View Details <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="col-span-full text-center text-gray-300">
          {error || "No drives found."}
        </p>
      )}
    </section>
  );
}
