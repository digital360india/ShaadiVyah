"use client";
import React, { useState, useRef, useEffect } from "react";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fieldsOptions = [
    "Venue",
    "Photographers",
    "Makeup Artists",
    "Decorators",
    "Caterers",
    "Choreographers",
    "DJ",
  ];
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, number, selectedFields };
  
    try {
      const response = await fetch("http://localhost:8080/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };
  
  const handleFieldChange = (field) => {
    setSelectedFields((prev) => {
      if (prev.includes(field)) {
        return prev.filter((item) => item !== field);
      } else {
        return [...prev, field];
      }
    });
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef]);

  return (
    <div className=" flex md:w-[70vw] md:mx-auto relative items-center justify-center bg-pink-100 mb-10 px-2  md:mt-16 mt-20 ">
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
        <img
          src="/logo.svg"
          alt="Logo"
          className="md:w-[200px] md:h-[200px] w-[150px] h-[150px] rounded-full"
        />
      </div>

      <form
      onSubmit={handleSubmit}
        ref={formRef}
        className="  md:pb-6 pb-10 itms-center justify-center gap-4 rounded-2xl shadow-lg h-full w-full md:mt-4 border-[#FEC5BB] border-2 flex
        bg-[url('/images/formbg.svg')] bg-cover "
      >

        <div className="w-[521px] md:h-[460px]  hidden lg:block ">
          <img src="/images/form.svg" alt="form" className="w-[421px] md:h-[550px] " />
        </div>
        <div className="">
          {" "}
          <div className="mt-6 md:justify-center md:px-10 md:pb-8 font-Merriweather">
            <p className="text-[20px] md:text-[28px] text-[#1B1B1B] text-center w-[300px]">
              Your <span className="text-[#CE0D5E]">Precious Day</span> must be
              Perfect
            </p>
            <p className="text-[12px] md:text-[14px] text-[#555454] text-center w-[300px] font-Merriweather-Sans">
              We are here for your help. Please submit the form below...
            </p>
          </div>
          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 font-semibold   text-[#1B1B1B]"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              placeholder="Enter your Name*"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-blue-900 rounded-md bg-transparent text-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="number"
              className="block mb-2 font-semibold text-blue-900  text-[#1B1B1B]"
            >
              Number
            </label>
            <input
              id="number"
              type="tel"
              value={number}
              placeholder="Enter your Number*"
              onChange={(e) => setNumber(e.target.value)}
              className="w-full p-2 border border-blue-900 rounded-md bg-transparent text-black"
            />
          </div>
          {/* <div className="mb-4 relative">
          <label
            htmlFor="fields"
            className="block mb-2 font-semibold  text-[#1B1B1B]"
          >
            Select Services
          </label>
          <div
            className="w-full p-2 border border-blue-900 rounded-md cursor-pointer text-[#aeacac]"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedFields.length > 0
              ? selectedFields.join(", ")
              : "Select Services... "}
          </div>

          {isDropdownOpen && (
            <ul className="absolute w-full border border-blue-900 mt-2  rounded-md shadow-lg z-100 bg-white max-h-40 overflow-y-scroll backdrop-blur-md">
              {fieldsOptions.map((option) => (
                <li
                  key={option}
                  className="p-2 flex items-center hover:bg-pink-100 text-xl text-pink"
                >
                  <input
                    type="checkbox"
                    checked={selectedFields.includes(option)}
                    onChange={() => handleFieldChange(option)}
                    className="mr-2"
                  />
                  <span>{option}</span>
                </li>
              ))}
            </ul>
          )}
         </div> */}
          <div className="mb-4 relative">
            <label
              htmlFor="fields"
              className="block mb-2 font-semibold text-[#1B1B1B]"
            >
              Services
            </label>
            <div
              className="w-full p-3 border  rounded-lg cursor-pointer flex items-center justify-between bg-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-[#aeacac]">
                {selectedFields.length > 0
                  ? selectedFields.join(", ")
                  : "Select Services..."}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-[#E63946] transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border border-[#E63946] mt-2 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                {fieldsOptions.map((option) => (
                  <li
                    key={option}
                    className="p-3 flex items-center hover:bg-pink-100 text-pink text-lg"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFields.includes(option)}
                      onChange={() => handleFieldChange(option)}
                      className="mr-2"
                    />
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            className="w-full h-12 mt-4 text-white rounded-md"
            style={{
              background:
                "radial-gradient(50.16% 263.7% at 49.84% 51.98%, #DD0D63 0%, #800F45 100%)",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
