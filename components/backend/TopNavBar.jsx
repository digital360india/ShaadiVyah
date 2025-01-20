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
    <div className="flex  text-white fixed top-0 w-full h-16 lg:h-20 z-50 bg-[url('/icons/background.svg')] bg-cover bg-center object-cover bg-white">
      <div className="flex items-center justify-center lg:hidden px-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-12 w-12 lg:h-16 lg:w-16 object-cover rounded-full"
        />
      </div>

      <div
        className=" h-[2px] absolute bottom-0 right-0 w-[95%]"
        style={{
          border: "2px solid",
          borderImageSource:
            "linear-gradient(90deg, #B8860B 0%, #EED68A 50%, #B8860B 100%)",
          borderImageSlice: 1,
        }}
      ></div>
    </div>
  );
};

export default TopNavBar;
