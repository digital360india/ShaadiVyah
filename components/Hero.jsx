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
    router.push(`/${selectedLocation}&category=${selectedCategory}`);
  };

  return (
    <div className="flex items-center justify-center text-white h-[90vh] ">
        <div className="w-[800px] mt-[160px] font-fira-sans">
          <p className="font-semibold text-4xl text-center mb-16">
            Let’s Celebrate Your Festival Party With Us{" "}
          </p>
          <div className="text-center font-medium text-md border border-white rounded-[40px] py-4 flex flex-col md:flex-row items-center justify-evenly">
            <div className="flex gap-2 items-center  w-[40%]">
              <img
                src={"/icons/location.svg"}
                width={1000}
                height={1000}
                className="w-5 h-5"
              />
              <select
                className="bg-transparent w-full outline-none"
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value="">Location</option>
                <option value="Dehradun">Dehradun</option>
                <option value="Nanital">Nanital</option>
                <option value="Tehri">Tehri</option>
                <option value="Mussorrie">Mussorrie</option>
              </select>
            </div>
            <div className="hidden md:block">|</div>
            <div className="flex gap-2 items-center  w-[40%]">
              <img
                src={"/icons/category.svg"}
                width={1000}
                height={1000}
                className="w-5 h-5"
              />
              <select
                className="bg-transparent w-full outline-none"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Choose a category</option>
                <option value="Photographers">Photographers</option>
                <option value="Venue">Venue</option>
                <option value="Mehndi Artists">Mehndi Artists</option>
                <option value="Decorators">Decorators</option>
              </select>
            </div>
            <div>|</div>
            <div className="flex items-center ">
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
    </div>
  );
}
