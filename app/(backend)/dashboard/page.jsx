"use client";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { db } from "@/firebase/firebase";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FiGift, FiHome, FiImage, FiTag } from "react-icons/fi";


const Page = () => {
  const [user, setUser] = useState(null);

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
    <div>
    <div className=" lg:m-10 m-4">
      <div className="flex flex-col w-full h-96 items-center justify-center">
        <Image
          src="/logo.png"
          width={1000}
          height={1000}
          className="h-36 w-36"
        />
        <p className="text-2xl text-pink capitalize">
          Welcome, {user ? user.name : "User"}
        </p>
      </div>
    </div>
    <div className="w-screen  bg-gradient-to-r from-[#FF1053] to-[#F7ACCF] text-white flex justify-between fixed bottom-0 lg:hidden px-4">
            
            <div className="py-[20px]"><FiHome className=" w-[40px] h-[40px] " /></div>
            <div className="py-[20px]"><FiTag className=" w-[40px] h-[40px]" /></div>
            <div className="py-[20px]"><FiImage className=" w-[40px] h-[40px]" /></div>
            <div className="py-[20px]"><FiGift className=" w-[40px] h-[40px]" /></div>
    
    
    
          </div>  
    </div>
  );
};

export default Page;
