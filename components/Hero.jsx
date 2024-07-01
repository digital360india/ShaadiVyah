"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
    <>
      <div className="flex items-center bg-[url('/images/hero.png')] justify-center bg-no-repeat bg-cover bg-fixed text-white h-[90vh] ">
        <div className="w-[800px] mt-[160px] ">
          <p className="font-semibold font-fira-sans  text-center mb-16 text-3xl md:text-4xl">
            Let’s Celebrate Your Festival Party With Us{" "}
          </p>
          <div className="text-center space-y-3 md:space-y-0 font-lato font-medium text-md border border-white rounded-[40px] py-4 flex flex-col md:flex-row items-center justify-evenly">
            <div className="flex gap-2 items-center w-[300px] text-xl md:w-[40%]">
              <img
                src={"/icons/location.svg"}
                width={1000}
                height={1000}
                className="w-8 h-8 md:w-5 md:h-5 "
              />
              <select
                className="bg-transparent  w-full outline-none"
                value={selectedLocation}
                onChange={handleLocationChange} 
              >
                <option value="">Location</option>
                <option value="Dehradun">Dehradun</option>
                <option value="Nanital">Nanital</option>
                <option value="Tehri">Tehri</option>
                <option value="Mussorrie">Mussoorie</option>
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
                <option value="">Choose a category</option>
                <option value="Photographers">Photographers</option>
                <option value="Makeup">Makeup</option>

                <option value="Venue">Venue</option>
                <option value="Mehndi Artists">Mehndi Artists</option>
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
    </>
  );
}
