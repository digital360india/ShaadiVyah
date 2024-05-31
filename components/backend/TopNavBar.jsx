import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { TbSquareRounded } from "react-icons/tb";

const TopNavBar = () => {
  return (
    <div
      className="flex justify-end items-end pt-4 pb-4 pr-10 pl-10 bg-gradient-to-r from-[#FF1053] to-[#F7ACCF] text-white fixed w-4/5  text-2xl text-slate
    bg-primary h-20"
    >
     
      <div className="flex space-x-3">
        {" "}
        <Link href="#">
          <IoIosNotifications className="" />
        </Link>
        <Link href="#">
          <GiHamburgerMenu className="" />
        </Link>
        <Link href="#">
          <TbSquareRounded className=" " />
        </Link>
      </div>
    </div>
  );
};

export default TopNavBar;
