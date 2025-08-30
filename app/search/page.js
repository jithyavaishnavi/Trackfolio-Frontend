"use client";
import React from "react";
import NavBarMain from "@/components/NavBarMain";
import Search from "@/components/SearchPage";
import { useAuth } from "@/contexts/AuthContext";


export default function SearchPage() {
 const { logout } = useAuth();


 return (
   <div className="min-h-screen bg-black text-white">
     <NavBarMain handleLogout={logout} />
     <Search />
   </div>
 );
}

