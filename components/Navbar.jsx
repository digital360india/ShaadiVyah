"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="hidden md:flex justify-around items-center font-lato font-medium text-lg z-50">
        <div>
          <Link href={"/"}>
            <img src={"/logo.png"} className="w-32 h-32 object-fill" />
          </Link>
        </div>
        <div className="flex pl-48 gap-8 font-medium">
          <Link href={"/services"}>Our Services</Link>
          <Link href={"/about"}>About Us</Link>
          <Link href={"/contact"}>Contact</Link>
        </div>
        <div className="flex gap-2">
          <div className="border border-pink text-pink px-4 py-2 rounded-3xl">
            <Link href={"/login"}>Login as vendor</Link>
          </div>
          <div className="border border-pink text-pink px-4 py-2 rounded-3xl">
            <Link href={"/register"}>Register as vendor</Link>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center bg-transparent fixed top-0 md:hidden z-10 rounded-lg ">
        <div className="w-[40%] px-6">
          <button onClick={toggleMenu}>
          <CgMenuLeftAlt className="text-pink text-2xl" />

          </button>
        </div>
        <div>
          <Link href={"/"}>
            <img
              src={"/logo.png"}
              width={1000}
              height={1000}
              className="w-20 h-20"
            />
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#013244] flex flex-col items-start justify-center p-6 z-20 font-lato ">
          <div className="flex justify-center items-center">
            {" "}
            <Link href={"/"}>
              <img src={"/logo.png"} className="w-48 h-48  object-fill " />
            </Link>{" "}
          </div>
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            &times;
          </button>
          <ul className="text-white text-xl font-medium text-left hover:underline space-y-6 mt-12">
            <li>
              <Link href={"/"} onClick={toggleMenu}>
                <span className=" ">Home</span>
              </Link>
            </li>
            <li>
              <Link href={"/services"} onClick={toggleMenu}>
                <span className="">Our Services</span>
              </Link>
            </li>
            <li>
              <Link href={"/about"} onClick={toggleMenu}>
                <span className="">About Us</span>
              </Link>
            </li>
            <li>
              <Link href={"/contact"} onClick={toggleMenu}>
                <span className="">Contact</span>
              </Link>
            </li>
          </ul>
          <div className="mt-8 flex flex-col space-y-10">
            <Link href={"/login"}>
              <span className=" bg-gradient-to-r from-red-500 to-pink-500 text-white text-center p-4  rounded-md mb-4">
                Login as Vendor
              </span>
            </Link>
            <Link href={"/register"}>
              <span className=" bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 text-center  rounded-md">
                Register as Vendor
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
