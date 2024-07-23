// components/FAQ.js
"use client"
import React, { useState } from 'react';

const FAQ = ({faqData}) => {

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
      <div className='font-bold text-3xl'>FAQs</div>
      {faqData.map((faq, index) => (
        <div key={index} className="mb-4">
          <div
            className="cursor-pointer flex justify-between items-center  p-4 rounded"
            onClick={() => toggleQuestion(index)}
          >
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 transition-transform ${
                selectedQuestion === index ? 'transform rotate-180' : ''
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
          {selectedQuestion === index && (
            <p className="mt-2 p-4 rounded">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
