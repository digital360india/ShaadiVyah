"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { parseCookies } from "nookies";
const LandingPage = ({
  handleSendApproval,
  isButtonActive,
  hasSentRequest,
}) => {
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
    <div className="bg-[url('/icons/background.svg')] bg-cover bg-center object-cover w-full h-auto md:h-[100vh] bg-[#FFF5E8]">
      <div className="flex justify-center items-center md:pt-14">
        <div className=" bg-[url('/icons/homebg.svg')] bg-cover bg-center object-cover w-[95%] rounded-xl h-[35vh] md:h-[40vh]">
          <div className="flex flex-col w-full  items-center justify-center mt-7 space-y-2">
            <Image
              alt="logo"
              src="/logo.png"
              width={1000}
              height={1000}
              className="h-[100px] w-[100px]"
            />
            <p className="text-xl text-[#FFFFFF] capitalize font-Merriweather">
              Welcome, {user ? user.name : "User"}
            </p>
            <p className="font-Merriweather-Sans text-[16px] text-[#FFFFFF]">
              {user?.businessName}
            </p>

            {!user?.approval ? (
              <button
                onClick={handleSendApproval}
                className={` h-[43px] px-2  text-[#000000] rounded-lg mt-4 text-[14px] font-semibold bg-gradient-border ${
                  isButtonActive && !hasSentRequest ? "" : "cursor-not-allowed"
                }`}
                disabled={!isButtonActive || hasSentRequest}
              >
                {hasSentRequest ? "Sent For Approval" : "Send Profile Approval"}
              </button>
            ) : (
              <div className="w-[80px] h-[38px] bg-gradient-border   rounded-md text-[#000000] flex items-center justify-center  text-[14px] font-semibold ">
                Verified
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
