"use client";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";
import { destroyCookie } from "nookies";
import React from "react";
import Image from "next/image";

export const SideNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    destroyCookie(null, "token");
    router.push("/login");
  };

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}

      <div
        className="hidden md:block bg-[url('/icons/navbar.svg')] bg-cover bg-center object-cover text-white min-h-screen fixed w-1/5 font-Merriweather z-30"
        style={{
          boxShadow: "25px 0 30px rgba(185, 0, 89, 0.2)",
        }}
      >
        <div className="absolute top-0 left-0 z-10">
          <Image
            src="/icons/upperframe.svg"
            alt="upper frame"
            width={1000}
            height={1000}
            className="w-full h-auto "
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-center py-3 z-30">
            <Link href="/dashboard">
              <Image
                width={1000}
                height={1000}
                src="/logo.png"
                alt="Logo"
                className="h-[110px] w-[110px] rounded-full cursor-pointer "
              />
            </Link>
          </div>
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
                <Image
                  src="/icons/images.svg"
                  alt="upper frame"
                  width={1000}
                  height={1000}
                  className="w-[20px] h-[20px] mr-3"
                />
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

      <div className="md:hidden fixed inset-x-0 bottom-0 z-50">
        <div className="w-full h-1 bg-gradient-border "></div>
        <div className=" bg-[#A11C5C] text-white flex justify-around py-2 ">
          {/* <Link href="/dashboard">
            <div
              className={`relative flex flex-col items-center ${
                isActive("/dashboard")
                  ? "scale-105 bg-white w-[52px] h-[52px] rounded-full top-[-35px]"
                  : "text-gray-300 "
              }`}
            >
              {isActive("/dashboard") && (
                <Image
                  src="/icons/circle_frame.svg"
                  alt="Active Frame"
                  width={1000}
                  height={1000}
                  className="absolute top-[-13.5px] w-20 h-20"
                />
              )}
              <Image
                src={
                  isActive("/dashboard")
                    ? "/icons/Chart.svg"
                    : "/icons/Document.svg"
                }
                alt="Portfolio Icon"
                width={1000}
                height={1000}
                className={`${
                  isActive("/dashboard") ? "mt-4 w-5 h-5  " : "mt-0 w-6 h-6"
                }`}
              />
              <span
                className={` text-sm  ${
                  isActive("/dashboard") ? "invisible" : ""
                }`}
              >
                Home
              </span>
            </div>
          </Link> */}
          <Link href="/dashboard/portfolio">
            <div
              className={`relative flex flex-col items-center ${
                isActive("/dashboard/portfolio")
                  ? "scale-105 bg-white w-[52px] h-[52px] rounded-full top-[-35px]"
                  : "text-gray-300 "
              }`}
            >
              {isActive("/dashboard/portfolio") && (
                <Image
                  src="/icons/circle_frame.svg"
                  alt="Active Frame"
                  width={1000}
                  height={1000}
                  className="absolute top-[-13.5px] w-20 h-20"
                />
              )}
              <Image
                src={
                  isActive("/dashboard/portfolio")
                    ? "/icons/Document11.svg"
                    : "/icons/Document.svg"
                }
                alt="Portfolio Icon"
                width={1000}
                height={1000}
                className={`${
                  isActive("/dashboard/portfolio")
                    ? "mt-4 w-5 h-5  "
                    : "mt-0 w-6 h-6"
                }`}
              />
              <span
                className={` text-sm  ${
                  isActive("/dashboard/portfolio") ? "invisible" : ""
                }`}
              >
                Portfolio
              </span>
            </div>
          </Link>

          <Link href="/dashboard/images">
            <div
              className={`relative flex flex-col items-center ${
                isActive("/dashboard/images")
                  ? "scale-105 bg-white w-[52px] h-[52px] rounded-full top-[-35px]"
                  : "text-gray-300 "
              }`}
            >
              {isActive("/dashboard/images") && (
                <Image
                  src="/icons/circle_frame.svg"
                  alt="Active Frame"
                  width={1000}
                  height={1000}
                  className="absolute top-[-13.5px] w-20 h-20"
                />
              )}
              <Image
                src={
                  isActive("/dashboard/images")
                    ? "/icons/famicons_images-sharp.svg"
                    : "/icons/images.svg"
                }
                alt="Portfolio Icon"
                width={1000}
                height={1000}
                className={`${
                  isActive("/dashboard/images")
                    ? "mt-4 w-5 h-5  "
                    : "mt-0 w-6 h-6"
                }`}
              />
              <span
                className={` text-sm  ${
                  isActive("/dashboard/images") ? "invisible" : ""
                }`}
              >
                Images
              </span>
            </div>
          </Link>
          <Link href="/dashboard/services">
            <div
              className={`relative flex flex-col items-center ${
                isActive("/dashboard/services")
                  ? "scale-105 bg-white w-[52px] h-[52px] rounded-full top-[-35px]"
                  : "text-gray-300 "
              }`}
            >
              {isActive("/dashboard/services") && (
                <Image
                  src="/icons/circle_frame.svg"
                  alt="Active Frame"
                  width={1000}
                  height={1000}
                  className="absolute top-[-13.5px] w-20 h-20"
                />
              )}
              <Image
                src={
                  isActive("/dashboard/services")
                    ? "/icons/Chat11.svg"
                    : "/icons/Chat.svg"
                }
                alt="Portfolio Icon"
                width={1000}
                height={1000}
                className={`${
                  isActive("/dashboard/services")
                    ? "mt-4 w-5 h-5  "
                    : "mt-0 w-6 h-6"
                }`}
              />
              <span
                className={` text-sm  ${
                  isActive("/dashboard/services") ? "invisible" : ""
                }`}
              >
                Services
              </span>
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
      </div>
    </>
  );
};
