"use client";
import Link from "next/link";
import { FiHome, FiTag, FiUser, FiGift } from "react-icons/fi";
import { FaImages } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { destroyCookie } from "nookies";
import React from "react";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";
import Image from "next/image";

export const SideNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    destroyCookie(null, "admintoken");
    router.push("/admin/login");
  };
  const isActive = (path) => pathname === path;

  return (
    <>
      <div
        className="bg-[url('/icons/navbar.svg')]  text-white min-h-full top-0 fixed w-1/5"
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
        <Link href="/admin/dashboard">
          <div className="flex items-center justify-center py-4 text-7xl">
            <img src="/logo.png" alt="" className="h-20 w-20 rounded-full" />
          </div>
        </Link>
        <div className="flex flex-col space-y-4 ml-5 ">
          <Link href="/admin/dashboard">
            <div
              className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all ${
                isActive("/admin/dashboard")
                  ? "bg-gradient-to-r from-[#B8860B] to-transparent"
                  : "hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent "
              }`}
            >
              <FiHome className="mr-2" />
              <span>Home</span>
            </div>
          </Link>
          <Link href="/admin/dashboard/approvalrequests">
            <div
              className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all ${
                isActive("/admin/dashboard/approvalrequests")
                  ? "bg-gradient-to-r from-[#B8860B] to-transparent"
                  : "hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent "
              }`}
            >
              <TiTickOutline className="mr-2" />
              <span>Approvals</span>
            </div>
          </Link>
          <Link href="/admin/dashboard/editdata">
            <div
              className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all ${
                isActive("/admin/dashboard/editdata")
                  ? "bg-gradient-to-r from-[#B8860B] to-transparent"
                  : "hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent "
              }`}
            >
              <FaEdit className="mr-2" />
              <span>Edit Venue Data</span>
            </div>
          </Link>
          <Link href="/admin/dashboard/editmakeupdata">
            <div
              className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all ${
                isActive("/admin/dashboard/editmakeupdata")
                  ? "bg-gradient-to-r from-[#B8860B] to-transparent"
                  : "hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent "
              }`}
            >
              <FaEdit className="mr-2" />
              <span>Edit Makeup Data</span>
            </div>
          </Link>

          <Link href="/admin/dashboard/editphotographerdata">
            <div
              className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all ${
                isActive("/admin/dashboard/editphotographerdata")
                  ? "bg-gradient-to-r from-[#B8860B] to-transparent"
                  : "hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent "
              }`}
            >
              <FaEdit className="mr-2" />
              <span>Edit Photographer Data</span>
            </div>
          </Link>
          <Link href="/admin/dashboard/vendors">
            <div
              className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all ${
                isActive("/admin/dashboard/vendors")
                  ? "bg-gradient-to-r from-[#B8860B] to-transparent"
                  : "hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent "
              }`}
            >
              <MdOutlinePeopleAlt className="mr-2" />
              <span>Vendors</span>
            </div>
          </Link>
          <Link href="/admin/dashboard/leads">
            <div
              className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all ${
                isActive("/admin/dashboard/leads")
                  ? "bg-gradient-to-r from-[#B8860B] to-transparent"
                  : "hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent "
              }`}
            >
              <MdOutlinePeopleAlt className="mr-2" />
              <span>Leads</span>
            </div>
          </Link>
          <Link href="/admin/dashboard/team-member">
            <div
              className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all ${
                isActive("/admin/dashboard/team-member")
                  ? "bg-gradient-to-r from-[#B8860B] to-transparent"
                  : "hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent "
              }`}
            >
              <MdOutlinePeopleAlt className="mr-2" />
              <span>Team Member</span>
            </div>
          </Link>
          <div
            onClick={handleLogout}
            className="z-20 flex items-center px-4 py-3 hover:bg-gradient-to-r hover:from-[#B8860B] hover:to-transparent transition-all rounded-lg cursor-pointer"
            >
            <FiUser className="mr-2" />
            <span>Logout</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 z-10">
          <Image
            src="/icons/bottomframe.svg"
            alt="bottom frame"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="w-screen md:hidden bg-gradient-to-r from-[#FF1053] to-[#F7ACCF] text-white flex justify-between fixed bottom-0 lg:hidden px-4">
        <Link href="/dashboard">
          <div className="py-[20px]">
            <FiHome className="w-[40px] h-[40px]" />
          </div>
        </Link>
        <Link href="/admin/dashboard/approvalrequests">
          <div className="py-[20px]">
            <FiTag className="w-[40px] h-[40px]" />
          </div>
        </Link>
        <Link href="/admin/dashboard/editdata">
          <div className="py-[20px]">
            <FiUser className="w-[40px] h-[40px]" />
          </div>
        </Link>
        <Link href="/admin/dashboard/vendors">
          <div className="py-[20px]">
            <FiGift className="w-[40px] h-[40px]" />
          </div>
        </Link>
        <div onClick={handleLogout} className="py-[20px] cursor-pointer">
          <FiUser className="w-[40px] h-[40px]" />
        </div>
      </div>
    </>
  );
};
