"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BookingForm from "./BookingForm";

export default function Hero() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearch = () => {
    router.push(`/search/${selectedLocation}/${selectedCategory}`);
  };
 


  return (
    <div className="mb-10">
      <div className="hidden md:block">
        <img
          className="  md:w-full w-[80vh] md:h-[100vh] h-full object-cover  "
          src="/images/hero1.svg"
        />
      </div>
      <div className="md:hidden">
        <img
          className="  md:w-full w-[80vh] md:h-[100vh] h-full object-cover  "
          src="/images/hero2.svg"
        />
      </div>


      <div className="flex items-center  justify-center text-white mb-20 ">
        <div className="md:w-[800px] ">
          <div className="text-center space-y-3 md:space-y-0 font-lato font-medium text-md border border-[#C9184A] mt-14 rounded-xl  py-4 mb-10 mx-4 flex flex-col md:flex-row items-center justify-evenly  text-black ">
            <div className="flex gap-2 items-center w-[300px] text-[20px] md:w-[40%]">
              <img
                src={"/icons/location1.svg"}
                width={1000}
                height={1000}
                className="w-8 h-8 md:w-5 md:h-5 "
              />
              <select
                className="bg-transparent  w-full outline-none text-[#C9184A] "
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value=" " className="bg-white text-pink ">
                 Location
                </option>
                <option value="Dehradun" className="text-pink  bg-white">
                  Dehradun
                </option>
                <option className="text-pink  bg-white" value="Mussoorie">
                  Mussoorie
                </option>
                <option className="text-pink  bg-white" value="Haridwar">
                  Haridwar
                </option>
                <option className="text-pink  bg-white" value="Rishikesh">
                  Rishikesh
                </option>
                <option className="text-pink  bg-white" value="Ramnagar">
                  Ramnagar{" "}
                </option>
                <option className="text-pink  bg-white" value="Nainital">
                  Nainital
                </option>
              </select>
            </div>
            <div className="hidden md:block">|</div>
            <div className="flex gap-2 items-center w-[300px] text-[20px] md:w-[40%]">
              <img
                src={"/icons/category1.svg"}
                width={1000}
                height={1000}
                className="w-8 h-8 md:w-5 md:h-5 "
              />
              <select
                className="bg-transparent w-full outline-none text-[#C9184A]"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option className="text-pink  bg-white" value=" Choose a category" >
                  Choose a category
                </option>
                <option className="text-pink  bg-white" value="Photographers">
                  Photographers
                </option>
                <option className="text-pink  bg-white" value="Makeup">
                  Makeup
                </option>

                <option className="text-pink  bg-white" value="Venue">
                  Venue
                </option>
                <option className="text-pink  bg-white" value="Mehndi Artists">
                  Mehndi Artists
                </option>
              </select>
            </div>
            <div className="flex flex-row">
              {" "}
              <div className="hidden md:block ">
                {" "}
                <div className="flex items-center text-center md:block ">
                  <button onClick={handleSearch}>
                    {/* <img
                      src={"/icons/search.svg"}
                      width={1000}
                      height={1000}
                      className="w-5 h-5"
                    /> */}
                  </button>
                </div>
              </div>
            </div>
            <div className="block md:hidden">
              <div className="flex gap-4 items-center px-5 py-2  border border-[#C9184A] text-[#C9184A] rounded-full  ">
                <div className="font-fira-sans items-center justify-center">Search</div>
                <button onClick={handleSearch}>
                  {/* <img
                    src={"/icons/search.svg"}
                    width={1000}
                    height={1000}
                    className="w-5 h-5"
                  /> */}
                </button>
              </div>
            </div>{" "}
          </div>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
