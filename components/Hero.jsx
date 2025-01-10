"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BookingForm from "./BookingForm";
import { AnimatePresence, motion, useInView } from "framer-motion";
function GradualSpacing({ text = "", onComplete }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="flex space-x-1 justify-center">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.p
            ref={ref}
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            exit="hidden"
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              onComplete: i === text.length - 1 ? onComplete : undefined, // Call onComplete on the last character
            }}
            className="text-[25px] text-center md:text-[50px] tracking-tighter text-white customGabriola pt-3  md:leading-[4rem]"
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}

function GradualSpacingTwo({ text = "" }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="flex space-x-1 justify-center">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.p
            ref={ref}
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            exit="hidden"
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-[25px] text-center md:text-[50px] tracking-tighter text-white customGabriola pt-3  md:leading-[4rem]"
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSecond, setShowSecond] = useState(false);

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
      <div className="relative overflow-hidden">
        <div className="hidden md:block relative overflow-hidden">
          <img
            className="w-full h-[100vh] object-cover"
            src="/images/hero1.svg"
            alt="Hero Image"
          />

          <div className="absolute inset-x-0 bottom-20 text-center">
            <div className="border-t border-white w-3/4 mx-auto "></div>

            <div className="h-[150px]">
              <GradualSpacing
                text="Shaadi ka haar pal khaas..."
                onComplete={() => setShowSecond(true)} 
              />
              {showSecond && <GradualSpacingTwo text="ShaadiVyah ke Saath.." />}
            </div>
            <div className="border-b border-white w-3/4 mx-auto mt-4"></div>
          </div>

          <img
            className="absolute -bottom-10 -left-14 w-[150px] h-[150px] animate-spin-slow-reverse"
            src="/images/chakra.svg"
            alt="Chakra Icon"
          />
          <img
            className="absolute -bottom-10 -right-14 w-[150px] h-[150px] animate-spin-slow"
            src="/images/chakra.svg"
            alt="Chakra Icon"
          />
        </div>

        <div className="md:hidden relative overflow-hidden">
          <img
            className="w-full h-[100vh] object-cover"
            src="/images/hero2.svg"
            alt="Hero Image"
          />

          <div className="absolute inset-x-0 bottom-40 text-center">
            <div className="border-t border-white w-3/4 mx-auto "></div>
            
            <div className="h-[100px]">
              <GradualSpacing
                text="Shaadi ka haar pal khaas..."
                onComplete={() => setShowSecond(true)} 
              />
              {showSecond && <GradualSpacingTwo text="ShaadiVyah ke Saath.." />}
            </div>
            <div className="border-b border-white w-3/4 mx-auto mt-4"></div>
          </div>

          <img
            className="absolute -bottom-10 -left-6 w-[120px] h-[120px] animate-spin-slow-reverse"
            src="/images/chakra.svg"
            alt="Chakra Icon"
          />
          <img
            className="absolute -bottom-10 -right-6 w-[120px] h-[120px] animate-spin-slow overflow-hidden"
            src="/images/chakra.svg"
            alt="Chakra Icon"
          />

        </div>
      </div>

      <div>
        <div className=" absolute z-40"></div>
        <div className="flex items-center  justify-center text-white  ">
          <div className="md:w-[800px] w-full">
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
                  <option
                    className="text-pink  bg-white"
                    value=" Choose a category"
                  >
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
                  <option
                    className="text-pink  bg-white"
                    value="Mehndi Artists"
                  >
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
              <div className="">
                <div className="flex  items-center px-5 py-2  border border-[#C9184A] text-[#C9184A] rounded-full  ">
                  <div className="font-fira-sans items-center justify-center">
                    Search
                  </div>
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
          </div>
        </div>
          <BookingForm />
      </div>
    </div>
  );
}
