// components/FormCard.jsx
"use client";

export default function FormCard({ children, green = "#8FE649" }) {
  return (
    <div
      className="backdrop-blur-lg bg-black/70 rounded-xl p-6 transition-all duration-300"
      style={{
        border: `1px solid ${green}44`,
        boxShadow: `0 0 15px ${green}33`,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = `0 0 25px ${green}`)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = `0 0 15px ${green}33`)
      }
    >
      {children}
    </div>
  );
}
