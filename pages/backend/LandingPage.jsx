"use client";
import React from "react";
import Image from "next/image";

const LandingPage = ({
  handleSendApproval,
  isButtonActive,
  hasSentRequest,
  user,
}) => {


  return (
    <div className="bg-[url('/icons/background.svg')] bg-cover bg-center object-cover w-full h-[100vh] bg-[#FFF5E8]">
      <div className="flex justify-center items-center pt-14">
        <div className=" bg-[url('/icons/homebg.svg')] bg-cover bg-center object-cover w-[95%] rounded-xl h-[40vh]">
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
                style={{
                  background:
                    "linear-gradient(90deg, #BE7318 0%, #EED68A 50%, #BE7318 100%)",
                }}
                onClick={handleSendApproval}
                className={` h-[43px] px-2  text-[#000000] rounded-lg mt-4 text-[14px] font-semibold ${
                  isButtonActive && !hasSentRequest ? "" : "cursor-not-allowed"
                }`}
                disabled={!isButtonActive || hasSentRequest}
              >
                {hasSentRequest ? "Sent For Approval" : "Send Profile Approval"}
              </button>
            ) : (
              <div
                style={{
                  background:
                    "linear-gradient(90deg, #BE7318 0%, #EED68A 50%, #BE7318 100%)",
                }}
                className="w-[80px] h-[38px]   rounded-md text-[#000000] flex items-center justify-center  text-[14px] font-semibold "
              >
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
