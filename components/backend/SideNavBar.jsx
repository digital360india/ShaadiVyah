'use client'
import Link from "next/link";
import { FiHome, FiTag, FiImage, FiGift, FiUser } from "react-icons/fi";
import { FaImages } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Updated import
import { destroyCookie } from "nookies";
import React from "react";

export const SideNavBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, "token");
    router.push("/login");
  };
  return (
    <>
      <div className="bg-gradient-to-b hidden md:block from-[#FF1053] to-[#F7ACCF] text-white min-h-full top-0 fixed w-1/5">
        <Link href="/dashboard">
          <div className="flex items-center justify-center py-4 text-7xl">
            <img src="/logo.png" alt="" className="h-20 w-20 rounded-full" />
          </div>
        </Link>
        <div className="flex flex-col space-y-6 ml-5 ">
          <Link href="/dashboard">
            <div className="flex items-center px-4 py-2 hover:text-lightpink  hover:bg-slate">
              <FiHome className="mr-2" />
              <span>Home</span>
            </div>
          </Link>
          <Link href="/dashboard/portfolio">
            <div className="flex items-center px-4 py-2   hover:text-white  hover:bg-slate">
              <FiTag className="mr-2" />
              <span>Portfolio</span>
            </div>
          </Link>
          <Link href="/dashboard/images">
            <div className="flex items-center px-4 py-2   hover:text-white  hover:bg-slate">
              <FaImages className="mr-2" />
              <span>Images</span>
            </div>
          </Link>
          <Link href="/dashboard/services">
            <div className="flex items-center px-4 py-2   hover:text-white  hover:bg-slate">
              <FiGift className="mr-2" />
              <span>My Services</span>
            </div>
          </Link>
          <div
            onClick={handleLogout}
            className="flex items-center px-4 py-2 cursor-pointer hover:text-white hover:bg-slate"
          >
            <FiUser className="mr-2" />
            <span>Logout</span>
          </div>
        </div>
      </div>
      <div className="w-screen md:hidden z-10  bg-gradient-to-r from-[#FF1053] to-[#F7ACCF] text-white flex justify-between fixed bottom-0 lg:hidden px-4">
        <Link href="/dashboard">
          <div className="py-[20px]">
            <FiHome className=" w-[40px] h-[40px] " />
          </div>
        </Link>
        <Link href="/dashboard/portfolio">
          <div className="py-[20px]">
            <FiTag className=" w-[40px] h-[40px]" />
          </div>
        </Link>
        <Link href="/dashboard/images">
          <div className="py-[20px]">
            <FiImage className=" w-[40px] h-[40px]" />
          </div>
        </Link>
        <Link href="/dashboard/services">
          <div className="py-[20px]">
            <FiGift className=" w-[40px] h-[40px]" />
          </div>
        </Link>
      
      </div>
    </>
  );
};
