"use client";

export default function HeroWithFooter() {
  return (
    <section className="bg-black text-white">
      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-10 text-left">
        <h1 className="text-2xl md:text-3xl font-extrabold font-montserrat leading-snug mb-3">
          One platform to track <span className="text-[#8FE649]">every step</span> of <br /> your placement journey.
        </h1>
        <p className="text-gray-300 text-[14px] md:text-[14px] leading-relaxed pr-70 max-w-6xl mx-auto text-left">
          Built for students, by students. Our platform keeps your applications, 
          deadlines, and insights beautifully organized — all in one space.Built for students, by students. Our platform keeps your applications, 
          deadlines, and insights beautifully organized 
        </p>
        <button className="mt-3 w-40 px-6 py-2 rounded-full shadow-[0_0_10px_#8FE649] bg-[#8FE649] text-white font-montserrat text-sm hover:scale-105 hover:shadow-[0_0_20px_#8FE649] transition-all">
          Sign In
        </button>
      </div>

      {/* FOOTER */}
      <footer className="bg-[] py-3 text-[#8FE649] shadow-[0_-2px_10px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center px-6 text-sm">
          {/* Menu Links */}
          <div className="flex flex-wrap gap-4 mb-2 md:mb-0 font-poppins font-medium">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">Send Feedback</a>
          </div>
          {/* Copyright */}
          <div className="text-sm">
            ©2025 <span className="font-montserrat">Jithya Vaishnavi</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
