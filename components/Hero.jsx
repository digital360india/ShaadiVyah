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
    <div className="relative bg-gradient-to-b from-transparent to-black ">
      <img
        className="absolute -z-10 w-full h-[120vh] object-cover object-left bg-no-repeat"
        src="/images/hero.png"
      />
      <div className="flex items-center  justify-center bg-no-repeat bg-cover bg-fixed object-left text-white  ">
        <div className="md:w-[800px] mt-[160px] ">
          <p className="font-semibold font-fira-sans  text-center mb-4 text-[30px] md:text-4xl">
            Shaadi Ka Har Pal Khaas, Shaadivyah ke saath
          </p>
          <p className="font-dancing-script  text-center mb-10 text-md md:text-xl   ">
            Engage with expert vendors and artists for a perfect celebration.
          </p>
          <BookingForm />

          <div className="text-center space-y-3 md:space-y-0 font-lato font-medium text-md border border-[#FEC5BB] rounded-[40px] py-4 mb-10 mx-4 flex flex-col md:flex-row items-center justify-evenly bg-[#FFB5A71A] text-grey-600">
            <div className="flex gap-2 items-center w-[300px] text-xl md:w-[40%]">
              <img
                src={"/icons/location.svg"}
                width={1000}
                height={1000}
                className="w-8 h-8 md:w-5 md:h-5 "
              />
              <select
                className="bg-transparent  w-full outline-none  "
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value=" " className="bg-white text-pink ">
                  Select Location
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
            <div className="flex gap-2 items-center w-[300px] text-xl md:w-[40%]">
              <img
                src={"/icons/category.svg"}
                width={1000}
                height={1000}
                className="w-8 h-8 md:w-5 md:h-5 "
              />
              <select
                className="bg-transparent w-full outline-none"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option className="text-pink  bg-white" value="" disabled>
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
                <div className="flex items-center  md:block ">
                  <button onClick={handleSearch}>
                    <img
                      src={"/icons/search.svg"}
                      width={1000}
                      height={1000}
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="block md:hidden">
              <div className="flex gap-4 items-center px-5 py-2  border border-white rounded-full  ">
                <div className="font-fira-sans">Search</div>
                <button onClick={handleSearch}>
                  <img
                    src={"/icons/search.svg"}
                    width={1000}
                    height={1000}
                    className="w-5 h-5"
                  />
                </button>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
