"use client";
import Image from "next/image";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const TopNavBar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, "token");
    router.push("/login");
  };

  useEffect(() => {
    const cookies = parseCookies();
    const uid = cookies.token;

    const fetchUser = async () => {
      if (uid) {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUser(userData);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex  text-white fixed top-0 w-full h-16 lg:h-20  bg-[url('/icons/background.svg')] bg-cover bg-center object-cover bg-[#FFF5E8] z-10">
      <div className=" absolute right-96">
        <div className="flex items-center pt-2  space-x-2 ">
          <Image
            alt="logo"
            src="/logo.png"
            width={1000}
            height={1000}
            className="h-[60px] w-[60px]"
          />
          <p className="text-[14px] font-semibold font-Merriweather-Sans text-[#1F384C]">
            {user ? user?.name : "User"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center md:hidden px-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-12 w-12 lg:h-16 lg:w-16 object-cover rounded-full"
        />
      </div>

      <div
        className=" h-[2px] absolute bottom-0 right-0 w-[96%]"
        style={{
          border: "2px solid",
          borderImageSource:
            "linear-gradient(90deg, #B8860B 0%, #EED68A 50%, #B8860B 100%)",
          borderImageSlice: 1,
        }}
      ></div>
    </div>
  );
};

export default TopNavBar;
