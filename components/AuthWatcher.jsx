"use client";

import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"; // Adjust the path as needed
import { useRouter, usePathname } from "next/navigation";

export default function AuthWatcher() {
  const { accessToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If no accessToken and user is NOT already on login page, redirect to login
    if (!accessToken && pathname !== "/login") {
      router.push("/login");
    }
  }, [accessToken, pathname, router]);

  return null; // This component doesn't render anything
}
