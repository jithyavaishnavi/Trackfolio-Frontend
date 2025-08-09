// components/Navbar.jsx
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "What's New?", href: "/whats-new" },
    { name: "Feedback", href: "/contact" },
    { name: "Login", href: "/login" },
    { name: "Create Account", href: "/create-account" },            
  ];

  return (
    <nav className="flex flex-wrap justify-between items-center py-6 relative z-10 mt-4 gap-4 px-4 sm:px-6 md:px-8 bg-black backdrop-blur-md">
      <Link href="/" className="text-[#8FE649] text-lg sm:text-xl font-bold cursor-pointer">
        TRACKFOLIO.
      </Link>
      <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-gray-300 text-sm sm:text-base">
        {menuItems.map(({ name, href }) => (
          <li key={name} className="hover:text-[#8FE649] cursor-pointer transition-colors">
            <Link href={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
