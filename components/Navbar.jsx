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
            <img src={"/logo.png"} className="lg:w-28 lg:h-28 w-16 h-16 object-fill" />
          </Link>
        </div>
        <div className="flex lg:pl-48 gap-8 lg:text-[20px] md:text-[14px] font-medium">
          <Link href={"/services"}>Our Services</Link>
          <Link href={"/about"}>About Us</Link>
          <Link href={"/contact"}>Contact</Link>
        </div>
        <div className="flex gap-2">
          <Link href={"/login"}  className="border border-pink text-pink lg:px-4 lg:py-2 p-[6px] rounded-3xl text-[12px] md:text-[16px]">
            <div>Login as vendor</div>
          </Link>
          <Link href={"/register"}  className="border border-pink text-pink lg:px-4 lg:py-2 p-[6px] rounded-3xl">
            <div >Register as vendor</div>
          </Link>
        </div>
      </div>

      <div className="flex w-full items-center bg-transparent fixed top-0 md:hidden z-10 rounded-lg ">
        <div className="w-[40%] px-6">
          <button onClick={toggleMenu}>
          <CgMenuLeftAlt className="text-pink text-2xl" />

          </button>
        </div>
        <div className="">
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
        <div className="fixed inset-0 bg-white flex flex-col items-start justify-center p-6 z-20 font-lato ">
          <div className="flex justify-center items-center">
            {" "}
            <Link href={"/"}>
              <img src={"/logo.png"} className="  object-fill " />
            </Link>{" "}
          </div>
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-red-700 text-3xl"
          >
            &times;
          </button>
          <ul className="text-red-700 text-xl font-medium  text-left hover:underline space-y-6 mt-12">
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
            <Link href={"/login"} onClick={toggleMenu}>
              <span className=" bg-gradient-to-r from-red-500 to-red-300 text-white text-center py-4 px-8  rounded-md mb-4">
                Login as Vendor
              </span>
            </Link>
            <Link href={"/register"}onClick={toggleMenu} >
              <span className=" bg-gradient-to-r from-red-500 to-red-300  text-white py-4 px-8 text-center  rounded-md">
                Register as Vendor
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
