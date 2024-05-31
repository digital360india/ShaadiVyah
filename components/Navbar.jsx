import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div>
      <div className="hidden md:flex justify-around items-center font-lato font-medium text-lg  z-50 ">
        <div>
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              width={1000}
              height={1000}
              className="w-24 h-24"
            />
          </Link>
        </div>
        <div className="flex pl-48 gap-8 font-medium">
          <Link href={"/services"}>Our Services</Link>
          <Link href={"/about"}>About Us</Link>
          <Link href={"/weddings"}>Weddings</Link>
          <Link href={"/contact"}>Contact</Link>
        </div>
       <div className="flex gap-2">
         <div className="border border-pink text-pink px-4 py-2 rounded-3xl">
          <Link href={"/login"}>Login as vendor</Link>
        </div>
        <div className="border border-pink text-pink px-4 py-2 rounded-3xl">
          <Link href={"/register"}>Register as vendor</Link>
        </div></div>
      </div>

      <div className="flex w-full items-center bg-transparent fixed md:hidden">
        <div className="w-[40%] px-6">
          <Link href={"/"}>
            <Image
              src={"/icons/menu.svg"}
              width={1000}
              height={1000}
              className="w-6 h-6 "
            />
          </Link>
        </div>
        <div className="">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              width={1000}
              height={1000}
              className="w-20 h-20"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
