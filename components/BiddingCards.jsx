"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Blink from "./Blink";
import { useLead } from "@/Providers/LeadProviders";

const BiddingCards = () => {
  const { addLead } = useLead();

  const [selectedFields, setSelectedFields] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [date, setDate] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const allFieldsFilled =
    date !== "" &&
    destination.trim() !== "" &&
    budget.trim() !== "" &&
    name.trim() !== "" &&
    phone.trim() !== "" &&
    selectedFields.length > 0;

  const fieldsOptions = [
    "Venue",
    "Photographers",
    "Makeup Artists",
    "Decorators",
    "Caterers",
    "Choreographers",
    "DJ",
  ];

  const cards = [
    {
      title: "Your Special Day",
      subtitle: "Date of Occasion",
      description: "Enter the date of your Special Day",
      inputType: "date",
      placeholder: "_ _ / _ _ / _ _",
    },
    {
      title: "Your Special Day",
      subtitle: "Destination",
      description:
        "Let us know your preferred destination for your special day",
      inputType: "text",
      placeholder: "City",
    },
    {
      title: "Your Special Day",
      subtitle: "Budget",
      description: "Let us know your budget for your special day.",
      inputType: "phone",
      placeholder: "₹ Amount",
    },
    {
      title: "Just One Step away!!",
      subtitle: "from your Dream Wedding",
      form: true,
    },
  ];

  const handleFieldChange = (field) => {
    setSelectedFields((prev) => {
      if (prev.includes(field)) {
        return prev.filter((item) => item !== field);
      } else {
        return [...prev, field];
      }
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const formRef = useRef(null);

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

  // const handleBiddingCard = async () => {

  // const formData = {
  // date,
  // destination,
  // budget,
  // name,
  // phone,
  // selectedFields,
  // };
  //   try {
  //     const response = await axios.post("/api/add-lead", formData);

  //     if (response.status === 200) {
  //       alert("Form Submitted Successfully!");
  // setDate("");
  // setDestination("");
  // setBudget("");
  // setName("");
  // setPhone("");
  // setSelectedFields([]);
  //     } else {
  //       alert("Something went wrong! Please try again!");
  //     }
  //   } catch (error) {
  //     console.error("Error in API Call:", error);
  //     alert("Error: " + error.message);
  //   }
  // };

  const handleBiddingCard = async (e) => {
    e.preventDefault();
    const formData = {
      date,
      destination,
      budget,
      name,
      phone,
      selectedFields,
    };
    const response = await addLead(formData);
    if (response.success) {
      alert("Form Submitted successfully!");
      setDate("");
      setDestination("");
      setBudget("");
      setName("");
      setPhone("");
      setSelectedFields([]);
    } else {
      alert(response.message);
    }
  };
  return (
    <div className="overflow-hidden">
      <div className=" flex justify-between p-10 ">
        <div className="px-10">
          <p className="text-[#A11C5C] text-2xl font-bold">
            Let us know your Plan.....
          </p>
          <p className="text-[#A11C5C] text-md mb-20">
            (Fill up the cards below and let us know your query)
          </p>
        </div>
        <div>
          <Blink />
        </div>
      </div>
      <div className="font-Merriweather  h-[100vh] pt-40 ">
        <div className="px-10">
          <div className="py-12 flex justify-center items-center relative">
            {cards.map((card, index) => {
              const position = index - currentIndex;
              let classes =
                "absolute transition-all duration-700 ease-in-out  ";

              if (position === 0) {
                classes += " scale-100 opacity-100 z-20";
              } else if (position === -1 || position === 1) {
                classes += " scale-75 opacity-50 z-10 mt-20";
              } else {
                classes +=
                  " scale-0 opacity-0 z-0 transition-all duration-700 ease-in-out";
              }

              return (
                <div
                  key={index}
                  className={`${classes} bg-[url('/icons/card.svg')]  bg-cover bg-center object-cover w-[380px] h-[532.13px] text-[#FFE3BE]`}
                  style={{ transform: `translateX(${position * 350}px)` }}
                >
                  {card.form ? (
                    <div className="flex flex-col items-center justify-center w-[200px] mx-auto pt-24 space-y-4">
                      <p className="font-Merriweather text-lg text-center">
                        {card.title} <strong>{card.subtitle}</strong>
                      </p>
                      <div className="font-Merriweather-Sans text-[16px] text-[#FFE3BE]">
                        <form>
                          <label>Name</label>
                          <div className="w-[292px] h-[41px] border rounded-lg mt-3 shadow-custom-inset">
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your Name"
                              className="w-full h-full bg-transparent px-4 outline-none text-[#FFE3BE] placeholder:text-[#FFE3BE] placeholder:font-light placeholder:opacity-50 rounded-lg"
                            />
                          </div>

                          <label className="mt-4 block">phone</label>
                          <div className="w-[292px] h-[41px] border rounded-lg mt-3 shadow-custom-inset">
                            <input
                              type="number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Your phone"
                              className="w-full h-full bg-transparent px-4 outline-none text-[#FFE3BE] placeholder:text-[#FFE3BE] placeholder:font-light placeholder:opacity-50 rounded-lg no-spinner"
                            />
                          </div>

                          <div
                            ref={formRef}
                            className=" mt-4 relative w-[292px] h-[35px]"
                          >
                            <label className="block mb-2 font-semibold text-[#FFE3BE]">
                              Services
                            </label>
                            <div
                              className="w-full p-3 border rounded-lg cursor-pointer flex items-center justify-between bg-transparent shadow-custom-inset"
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                              <span>
                                {selectedFields.length > 0 ? (
                                  selectedFields.join(", ")
                                ) : (
                                  <>
                                    <p className="font-light opacity-50">
                                      Select Services...
                                    </p>
                                  </>
                                )}
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 transform transition-transform ${
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
                              <ul className="absolute w-full bg-[#800F45] border mt-2 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                                {fieldsOptions.map((option) => (
                                  <li
                                    key={option}
                                    className="p-3 flex items-center hover:bg-pink-100 text-[#FFE3BE] font-normal opacity-80 text-lg"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedFields.includes(option)}
                                      onChange={() => handleFieldChange(option)}
                                      className="mr-2 placeholder:font-light placeholder:opacity-50"
                                    />
                                    <span>{option}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-[200px] text-center mx-auto pt-24 space-y-4">
                      <p className="font-Merriweather text-lg ">{card.title}</p>
                      <p className="customGabriola text-[50px] leading-[50px]">
                        {card.subtitle}
                      </p>
                      <p className="text-[1rem] font-Merriweather-Sans">
                        {card.description}
                      </p>
                      <div className="font-Merriweather-Sans text-[16px] pt-4 text-[#FFE3BE]">
                        Enter Here
                        <div className="w-[200px] h-[40px] border rounded-lg mt-3 shadow-custom-inset">
                          <input
                            type={card.inputType}
                            value={
                              index === 0
                                ? date
                                : index === 1
                                ? destination
                                : budget
                            }
                            onChange={(e) => {
                              if (index === 0) setDate(e.target.value);
                              else if (index === 1)
                                setDestination(e.target.value);
                              else if (index === 2) setBudget(e.target.value);
                            }}
                            placeholder={card.placeholder}
                            className="w-full h-full bg-transparent text-center px-4 outline-none text-[#FFE3BE] placeholder:text-[#FFE3BE] placeholder:font-light placeholder:opacity-50 rounded-lg no-spinner custom-date-input"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="flex justify-center items-center z-10 -bottom-[350px]   absolute space-x-7 text-[#CA8B00]">
              {currentIndex > 0 ? (
                <button
                  onClick={handlePrevious}
                  className="flex gap-2 items-center"
                >
                  <p>Previous</p>
                  <Image
                    src="/icons/lefticon.svg"
                    width={1000}
                    height={1000}
                    alt="arrow-left"
                    className="w-[30px] h-[40px]"
                  />
                </button>
              ) : (
                <>
                  <button
                    // onClick={handlePrevious}
                    className="flex gap-2 items-center opacity-50 cursor-not-allowed"
                  >
                    <p>Previous</p>
                    <Image
                      src="/icons/lefticon.svg"
                      width={1000}
                      height={1000}
                      alt="arrow-left"
                      className="w-[30px] h-[40px]"
                    />
                  </button>
                </>
              )}
              <div className="relative group">
                <button
                  onClick={handleBiddingCard}
                  className="px-5 py-2 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "radial-gradient(50.16% 263.7% at 49.84% 51.98%, #DD0D63 0%, #800F45 100%)",
                  }}
                  disabled={!allFieldsFilled}
                >
                  Submit
                </button>
                {!allFieldsFilled && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Kindly fill all the details of bidding card
                  </div>
                )}
              </div>

              {currentIndex < cards.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex gap-2 items-center"
                >
                  <Image
                    src="/icons/righticon.svg"
                    width={1000}
                    height={1000}
                    alt="arrow-right"
                    className="w-[30px] h-[40px]"
                  />
                  <p>Next</p>
                </button>
              ) : (
                <>
                  <button className="flex gap-2 items-center opacity-50 cursor-not-allowed">
                    <Image
                      src="/icons/righticon.svg"
                      width={1000}
                      height={1000}
                      alt="arrow-right"
                      className="w-[30px] h-[40px]"
                    />
                    <p>Next</p>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingCards;
