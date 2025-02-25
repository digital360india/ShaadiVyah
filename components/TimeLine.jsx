"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Timeline = () => {
  
  const totalDuration = 24 * 60 * 60 * 1000; 

  const getRemainingTime = () => {
    const storedStartTime = localStorage.getItem("timerStartTime");
    if (storedStartTime) {
      const elapsed = Date.now() - parseInt(storedStartTime, 10);
      return Math.max(totalDuration - elapsed, 0);
    }
    return totalDuration; 
  };

  const [remainingTime, setRemainingTime] = useState(getRemainingTime());

  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          const newTime = prev - 1000;
          if (newTime <= 0) {
            clearInterval(timer);
            localStorage.removeItem("timerStartTime");
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("timerStartTime")) {
      localStorage.setItem("timerStartTime", Date.now().toString());
    }
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg shadow flex items-center font-Merriweather">
  
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 rounded-full custom-radial-bg flex items-center justify-center text-white shadow-lg">
          <div className="text-center text-sm">{formatTime(remainingTime)}</div>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-pulse"></div>
      </div>

      <div className="flex-grow ml-6">
        <div className="flex items-center justify-between">
          {/* Step 1 - Active */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-pink-600 rounded-md flex items-center justify-center">
              <Image
                src="/icons/doli.svg"
                width={1000}
                height={1000}
                alt="doli"
                className="w-[60px] h-[60px]"
              />
            </div>
            <div className="mt-2 text-[12px] text-center">
              <div className="text-[#A11C5C] font-medium">
                Connecting with Vendors
              </div>
              <div className="text-green-600 font-semibold">(Completed)</div>
            </div>
          </div>

          {/* Step 2 - Faded */}
          <div className="flex flex-col items-center opacity-50">
            <div className="w-12 h-12  rounded-md flex items-center justify-center">
              <Image
                src="/icons/doli.svg"
                width={1000}
                height={1000}
                alt="doli"
                className="w-[60px] h-[60px]"
              />
            </div>
            <div className="mt-2 text-[#A11C5C] text-[12px] text-center">
              <div className=" font-medium">Bidding</div>
              <div className=" font-semibold">(Upcoming)</div>
            </div>
          </div>

          {/* Step 3 - Faded */}
          <div className="flex flex-col items-center opacity-50">
            <div className="w-12 h-12 rounded-md flex items-center justify-center">
              <Image
                src="/icons/doli.svg"
                width={1000}
                height={1000}
                alt="doli"
                className="w-[60px] h-[60px]"
              />
            </div>
            <div className="mt-2 text-[12px] text-center">
              <div className="text-[#A11C5C] font-medium">
                Final Rate on Process
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
