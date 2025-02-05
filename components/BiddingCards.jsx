"use client";
import React, { useEffect, useRef, useState } from "react";

const BiddingCards = () => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      inputType: "number",
      placeholder: "₹ 1000000",
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

  return (
    <>
      <p className="text-[#A11C5C] text-2xl font-bold">
        Let us know your Plan.....
      </p>
      <p className="text-[#A11C5C] text-md mb-20">
        (Fill up the cards below and let us know your query)
      </p>
      <div className="font-Merriweather h-[70vh] mt-60">
        <div className="px-10">
          <div className="py-12 flex justify-center items-center relative">
            {cards.map((card, index) => {
              const position = index - currentIndex;
              let classes =
               "absolute transition-all duration-500 ease-in-out"; // Increased duration for smooth transition

               if (position === 0) {
                classes += " scale-100 opacity-100 z-20";
              } else if (position === -1 || position === 1) {
                classes += " scale-90 opacity-50 z-10 mt-20"; // Reduced opacity for faded effect
              } else {
                classes += " hidden";
              }

              return (
                <div
                  key={index}
                  className={`${classes} bg-[url('/icons/card.svg')] bg-cover bg-center object-cover w-[380px] h-[532.13px] text-[#FFE3BE]`}
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
                          <div
                            className="w-[292px] h-[41px] border rounded-lg mt-3"
                            style={{
                              boxShadow: "0px 0px 15.88px 0px #C90067 inset",
                            }}
                          >
                            <input
                              type="text"
                              placeholder="Your Name"
                              className="w-full h-full bg-transparent px-4 outline-none text-[#FFE3BE] placeholder:text-[#FFE3BE] rounded-lg"
                            />
                          </div>

                          <label className="mt-4 block">Number</label>
                          <div
                            className="w-[292px] h-[41px] border rounded-lg mt-3"
                            style={{
                              boxShadow: "0px 0px 15.88px 0px #C90067 inset",
                            }}
                          >
                            <input
                              type="number"
                              placeholder="Your Number"
                              className="w-full h-full bg-transparent px-4 outline-none text-[#FFE3BE] placeholder:text-[#FFE3BE] rounded-lg"
                            />
                          </div>

                          <div className="mt-4 relative w-[292px] h-[35px]">
                            <label className="block mb-2 font-semibold text-[#FFE3BE]">
                              Services
                            </label>
                            <div
                              className="w-full p-3 border rounded-lg cursor-pointer flex items-center justify-between bg-transparent"
                              style={{
                                boxShadow: "0px 0px 15.88px 0px #C90067 inset",
                              }}
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                              <span>
                                {selectedFields.length > 0
                                  ? selectedFields.join(", ")
                                  : "Select Services..."}
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
                                    className="p-3 flex items-center hover:bg-pink-100 text-[#FFE3BE] text-lg"
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
                        <div
                          className="w-[200px] h-[40px] border rounded-lg mt-3"
                          style={{
                            boxShadow: "0px 0px 15.88px 0px #C90067 inset",
                          }}
                        >
                          <input
                            type={card.inputType}
                            placeholder={card.placeholder}
                            className="w-full h-full bg-transparent text-center outline-none text-[#FFE3BE] placeholder:text-[#FFE3BE]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          <div className="flex justify-between mt-6 z-50  bottom-0  w-full px-10 absolute">
            <button
              onClick={handlePrevious}
              className="bg-[#A11C5C] text-white px-6 py-2 rounded-lg shadow-lg hover:bg-[#800F45] transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="bg-[#A11C5C] text-white px-6 py-2 rounded-lg shadow-lg hover:bg-[#800F45] transition-colors"
            >
              Next
            </button>
          </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default BiddingCards;
