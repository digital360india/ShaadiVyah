// components/FAQ.js
"use client"
import React, { useState } from 'react';

const FAQ = () => {
  const faqData = [
    {
      question: '1.Can I get a refund/exchange if I’m not satisfied with my purchase?',
      answer:
        'Yes, absolutely! If you aren’t happy with your product, let us know within 30 days from the date of delivery.You can return your product even after you’ve opened it and you’ll get all your money back. No questions asked.'
    },
    {
      question: '2.Which CBD product should I use?',
      answer:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
    },
    {
      question: '3. When will my order be delivered?',
      answer:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.'
    },
    {
        question: '4. How frequently can I take CBD?',
        answer:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
      },
      {
        question: '5. Will CBD affect other medications?',
        answer:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
      },
      {
        question: '6. Can I travel with CBD?',
        answer:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.'
      }
  ];

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
