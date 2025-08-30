"use client";
import Link from "next/link"; // add at the top
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Briefcase, Clock, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const API_TYPE = "nextup"; // can be "upcoming", "nextup", "completed"
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || `/drives/type?type=${API_TYPE}`;

export default function NextUp() {
  const router = useRouter();
  const { authFetch, logout } = useAuth();
  const greenGradient = "linear-gradient(135deg, #8fe649, #4caf50)";

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCompanies = async () => {
    try {
      setLoading(true);

      const res = await authFetch(API_URL, { method: "GET" });

      if (!res) {
        router.push("/home");
        return;
      }

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Failed to fetch completed drives.");
        return;
      }

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
      setError("Could not load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleViewDetails = (id) => {
    router.push(`/drives/${id}`);
  };

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
  <section className="mt-2 mb-12 max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-2 text-[#F5F5DC] text-center mt-30">
      Next Up
    </h2>
    <p className="text-sm text-[#F5F5DC] text-center mb-30">
      Drives scheduled for today and tomorrow
    </p>

    {loading ? (
      <div className="flex justify-center py-10">
        <div className="w-10 h-10 border-4 border-[#A7D16C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : companies.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {companies.map((drive, idx) => (
          <motion.div
            key={drive.id || idx}
            className="relative bg-white/6 backdrop-blur-lg rounded-2xl p-4 flex flex-col gap-4 shadow-[0_8px_25px_rgba(167,209,108,0.15)] hover:scale-[1.03] transition-transform duration-200 cursor-pointer w-70 h-70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: idx * 0.1,
              duration: 0.5,
              type: "tween",
            }}
          >
            <h3 className="text-2xl font-bold text-[#A7D16C]">
              {drive.company}
            </h3>
            <div className="text-[#F5F5DC]/80 space-y-2 mt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#F5F5DC]/60" />
                <span>{drive.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#F5F5DC]/60" />
                <span>{drive.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#F5F5DC]/60" />
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
      <p className="col-span-full text-center text-[#F5F5DC]/80">
        {error || "No drives found."}
      </p>
    )}
  </section>
</div>
  );
}