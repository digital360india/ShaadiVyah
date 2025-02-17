import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="bg-[url('/images/dashbg1.svg')] w-full h-full">
      <div className="p-10">
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
              Welcome to Admin Dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
