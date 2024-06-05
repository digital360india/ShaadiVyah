import Link from "next/link";
import { FiHome, FiBox, FiTag, FiUser, FiGift } from "react-icons/fi";
import { GiFarmTractor } from "react-icons/gi";
import { GiFireplace } from "react-icons/gi";
import { FaPeopleCarry } from "react-icons/fa";
import { FaImages } from "react-icons/fa";

import React from "react";

export const SideNavBar = () => {
  return (
    <div className="bg-gradient-to-b from-[#FF1053] to-[#F7ACCF] text-white min-h-full top-0 fixed w-1/5 text-">
      <Link href="/dashboard">
        <div className="flex items-center justify-center py-4 text-7xl">
          <img src="/logo.png" alt="" className="h-20 w-20 rounded-full" />{" "}
        </div>
      </Link>
      <div className="flex flex-col space-y-6 ml-5 ">
        <Link href="/dashboard">
          <div className="flex items-center px-4 py-2 hover:text-lightpink  hover:bg-slate">
            <FiHome className="mr-2" />
            <span>Home</span>
          </div>
        </Link>
        {/* <Link href="#">
          <div className="flex items-center px-4 py-2  hover:text-white  hover:bg-slate">
            <FiBox className="mr-2" />
            <span>Catalogue</span>
          </div>
        </Link> */}
        <Link href="/admin/dashboard/approvalrequests">
          <div className="flex items-center px-4 py-2   hover:text-white  hover:bg-slate">
            <FiTag className="mr-2" />
            <span>Approvals</span>
          </div>
        </Link>
        <Link href="/admin/dashboard/editdata">
          <div className="flex items-center px-4 py-2   hover:text-white  hover:bg-slate">
            <FaImages className="mr-2" />
            <span>Edit Data</span>
          </div>
        </Link>
        <Link href="/admin/dashboard/vendors">
          <div className="flex items-center px-4 py-2   hover:text-white  hover:bg-slate">
            <FiGift className="mr-2" />
            <span>Vendors</span>
          </div>
        </Link>
       
        {/* <Link href="/dashboard/contactrequests">
          <div className="flex items-center px-4 py-2 hover:text-white  hover:bg-slate">
            <GiFarmTractor className="mr-2" />
            <span>Contact Requests</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex items-center px-4 py-2  hover:text-white  hover:bg-slate">
            <FaPeopleCarry className="mr-2" />
            <span>Staff</span>
          </div>
        </Link> */}
      </div>
    </div>
  );
};
