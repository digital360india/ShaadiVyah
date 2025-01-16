"use client";
import Link from "next/link";
import { FiHome, FiTag, FiImage, FiGift, FiUser } from "react-icons/fi";
import { FaImages } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation"; // Importing usePathname
import { destroyCookie } from "nookies";
import React from "react";
import Image from "next/image";

export const SideNavBar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  const handleLogout = () => {
    destroyCookie(null, "token");
    router.push("/login");
  };

  const isActive = (path) => pathname === path; // Check if a route is active

  return (
    <>
      {/* Desktop Sidebar */}

      <div className="hidden md:block bg-[url('/icons/navbar.svg')] bg-cover bg-center object-cover text-white min-h-screen fixed w-1/5 font-Merriweather">
        <div className="absolute top-0 left-0 z-50">
          <Image
            src="/icons/upperframe.svg"
            alt="upper frame"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </div>

        <div className="flex flex-col">
          <Link href="/dashboard">
            <div className="flex items-center justify-center py-3">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-28 w-28 rounded-full"
              />
            </div>
          </Link>
          <div className="flex flex-col space-y-4 px-4 mt-6">
            {/* <Link href="/dashboard">
              <div
                className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  isActive("/dashboard")
                    ? "bg-white text-[#FF1053]"
                    : "hover:bg-white hover:text-[#FF1053]"
                }`}
              >
                <FiHome className="mr-3 text-lg" />
                <span className="text-base font-medium">Home</span>
              </div>
            </Link> */}
            <Link href="/dashboard/portfolio">
              <div
                className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all relative ${
                  isActive("/dashboard/portfolio")
                    ? "bg-gradient-to-r from-[#B8860B] to-transparent"
                    : "hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent "
                }`}
              >
                <Image
                  src="/icons/Document.svg"
                  alt="Portfolio Icon"
                  width={1000}
                  height={1000}
                  className="w-[20px] h-[20px] mr-3"
                />
                <span className="text-base font-medium">Portfolio</span>
              </div>
            </Link>

            <Link href="/dashboard/images">
              <div
                className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  isActive("/dashboard/images")
                    ? "bg-gradient-to-r from-[#B8860B] to-transparent"
                    : "hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent "
                }`}
              >
                <FaImages className="mr-3 text-lg" />
                <span className="text-base font-medium">Images</span>
              </div>
            </Link>
            <Link href="/dashboard/services">
              <div
                className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  isActive("/dashboard/services")
                    ? "bg-gradient-to-r from-[#B8860B] to-transparent"
                    : "hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent "
                }`}
              >
                <Image
                  src="/icons/Chat.svg"
                  alt="upper frame"
                  width={1000}
                  height={1000}
                  className="w-[20px] h-[20px] mr-3"
                />
                <span className="text-base font-medium">My Services</span>
              </div>
            </Link>

            <div>OTHERS</div>

            <Link href="/dashboard/contact">
              <div
                className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  isActive("/dashboard/contact")
                    ? "bg-gradient-to-r from-[#B8860B] to-transparent"
                    : "hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent "
                }`}
              >
                <Image
                  src="/icons/Profile.svg"
                  alt="upper frame"
                  width={1000}
                  height={1000}
                  className="w-[20px] h-[20px] mr-3"
                />
                <span className="text-base font-medium">Contact Us</span>
              </div>
            </Link>

            <Link href="/dashboard/help">
              <div
                className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  isActive("/dashboard/help")
                    ? "bg-gradient-to-r from-[#B8860B] to-transparent"
                    : "hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent "
                }`}
              >
                <Image
                  src="/icons/Info.svg"
                  alt="upper frame"
                  width={1000}
                  height={1000}
                  className="w-[20px] h-[20px] mr-3"
                />
                <span className="text-base font-medium">Help</span>
              </div>
            </Link>
            <div
              onClick={handleLogout}
              className="flex items-center px-4 py-3 hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent transition-all rounded-lg cursor-pointer"
            >
              <FiUser className="mr-3 text-lg" />
              <span className="text-base font-medium">Logout</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-50">
          <Image
            src="/icons/bottomframe.svg"
            alt="bottom frame"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed inset-x-0 bottom-0 bg-gradient-to-r from-[#FF1053] to-[#F7ACCF] text-white flex justify-around py-3 z-50 shadow-md">
        <Link href="/dashboard">
          <div
            className={`flex flex-col items-center ${
              isActive("/dashboard")
                ? "text-white scale-105"
                : "text-gray-300  "
            }`}
          >
            <FiHome className="w-6 h-6" />
            <span className="text-sm">Home</span>
          </div>
        </Link>
        <Link href="/dashboard/portfolio">
          <div
            className={`flex flex-col items-center ${
              isActive("/dashboard/portfolio")
                ? "text-white scale-105 "
                : "text-gray-300 "
            }`}
          >
            <FiTag className="w-6 h-6" />
            <span className="text-sm">Portfolio</span>
          </div>
        </Link>
        <Link href="/dashboard/images">
          <div
            className={`flex flex-col items-center ${
              isActive("/dashboard/images")
                ? "text-white scale-105"
                : "text-gray-300 "
            }`}
          >
            <FiImage className="w-6 h-6" />
            <span className="text-sm">Images</span>
          </div>
        </Link>
        <Link href="/dashboard/services">
          <div
            className={`flex flex-col items-center ${
              isActive("/dashboard/services")
                ? "text-white scale-105"
                : "text-gray-300 "
            }`}
          >
            <FiGift className="w-6 h-6" />
            <span className="text-sm">Services</span>
          </div>
        </Link>
        <div
          onClick={handleLogout}
          className="flex flex-col items-center cursor-pointer"
        >
          <FiUser className="w-6 h-6" />
          <span className="text-sm">Logout</span>
        </div>
      </div>
    </>
  );
};
