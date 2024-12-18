"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { FiUser } from "react-icons/fi";
import React from "react";

const TopNavBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, "token");
    router.push("/login");
  };

  return (
    <div className="flex bg-gradient-to-r from-[#FF1053] to-[#F7ACCF] text-white fixed top-0 w-full h-16 lg:h-20 z-50 shadow-lg">
      <div className="flex items-center justify-center lg:hidden px-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-12 w-12 lg:h-16 lg:w-16 object-cover rounded-full"
        />
      </div>

 
    </div>
  );
};

export default TopNavBar;
