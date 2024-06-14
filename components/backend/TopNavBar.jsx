"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Updated import
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
    <div className="flex bg-gradient-to-r from-[#FF1053] to-[#F7ACCF] text-white fixed lg:w-4/5 w-full text-2xl text-slate bg-primary h-20">
      <div className="justify-center items-center flex lg:hidden">
        <img
          src="/images/logo1.png"
          height={1000}
          width={1000}
          className="w-32 h-32 object-cover"
          alt="Logo"
        />
      </div>
      <div className="flex space-x-5 pb-5 px-10 justify-end items-end w-full">
        <div onClick={handleLogout} className=" p-1 shadow-md hover:bg-pink gap-2 bg-white rounded full  flex cursor-pointer text-base text-[#F7ACCF] z-10 ">
            <FiUser className="" />
            <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;