"use client";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { db } from "@/firebase/firebase";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";

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
    <div className="m-10">
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
  );
};

export default Page;
