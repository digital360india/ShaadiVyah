"use client";
import Image from "next/image";
import React, { useState } from "react";

const FAQ = ({ faqData }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };

  return (
    <div className="py-8 xl:px-[100px] lg:px-[40px] md:px-[50px] px-6">
      <div className="font-bold text-3xl">FAQs</div>
      {faqData?.map((faq, index) => (
        <div key={index} className="mb-4">
          <div
            className={`cursor-pointer flex justify-between items-center  p-4 rounded
            ${
              selectedQuestion === index ? "border rounded-lg border-[#A11C5C] bg-[#F8EDEB] " : ""
            }
            `}
            onClick={() => toggleQuestion(index)}
          >
            <div>
            <h3 className="text-lg font-semibold">{faq.question}</h3>
              {selectedQuestion === index && (
                <p className="mt-2  rounded">{faq.answer}</p>
              )}
            </div>
            <Image
              width={1000}
              height={1000}
              alt="faq-icon"
              src={`${
                selectedQuestion === index
                  ? "/icons/faqminus.svg"
                  : "/icons/faqplus.svg"
              }`}
              className={`h-6 w-6 transition-transform `}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
