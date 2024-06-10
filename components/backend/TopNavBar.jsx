import Link from "next/link";
import Image from "next/image";

import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { TbSquareRounded } from "react-icons/tb";

const TopNavBar = () => {
  return (
    <div
      className="flex  bg-gradient-to-r from-[#FF1053] to-[#F7ACCF] text-white fixed lg:w-4/5 w-full  text-2xl text-slate
    bg-primary h-20"
    >
      <div className="justify-center items-center  flex lg:hidden">
        <img
          src="/images/logo1.png"
          height={1000}
          width={1000}
          className="w-32 h-32 "
        />
      </div>
      <div className="flex space-x-5  pb-5 justify-end items-end  w-full ">
        {" "}
        <Link href="#">
          <IoIosNotifications className="" />
        </Link>
        <Link href="#">
          <TbSquareRounded className=" " />
        </Link>
      </div>
    </div>
  );
};

export default TopNavBar;
