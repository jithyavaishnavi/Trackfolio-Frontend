"use client";

import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"; // Adjust path
import { useRouter, usePathname } from "next/navigation";

export default function AuthWatcher() {
  const { accessToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Public pages that don't need auth
  const publicPaths = ["/","/home", "/drivedetails", "/about", "/contact", "/login", "/register", "/create-account","/nextup","/upcoming","/completed"];

  useEffect(() => {
    if (!accessToken && !publicPaths.includes(pathname)) {
      router.push("/login");
    }
  }, [accessToken, pathname, router]);

  return null;
}
