"use client";
import React, { useState, useRef, useEffect } from 'react';

const BookingForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [selectedFields, setSelectedFields] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fieldsOptions = ["Venue", "Photographers","Makeup Artists", "Decorators", "Caterers","Choreographers", "DJ" ];
  const formRef = useRef(null);

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

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef]);

  return (
    <div className="flex items-center justify-center bg-pink-100 mb-10 px-2  ">
      <form ref={formRef} className="p-6 rounded-2xl shadow-lg max-w-md w-full  bg-[#FFB5A71A] border-[#FEC5BB] border-2"> 
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-semibold ">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-blue-900 rounded-md bg-transparent"
          />
        </div>

        {/* Number Input */}
        <div className="mb-4">
          <label htmlFor="number" className="block mb-2 font-semibold text-blue-900">Number</label>
          <input
            id="number"
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full p-2 border border-blue-900 rounded-md bg-transparent"
          />
        </div>

        {/* Custom Dropdown for Selecting Fields */}
        <div className="mb-4 relative">
          <label htmlFor="fields" className="block mb-2 font-semibold">Select Services</label>
          <div
            className="w-full p-2 border border-blue-900 rounded-md cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedFields.length > 0 ? selectedFields.join(', ') : 'Select Services'}
          </div>

          {isDropdownOpen && (
            <ul className="absolute w-full border border-blue-900 mt-2 overflow-auto rounded-md shadow-lg z-100 backdrop-blur-md">
              {fieldsOptions.map((option) => (
                <li key={option} className="p-2 flex items-center hover:bg-pink-100 text-xl text-pink">
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

        {/* Submit Button */}
   <div className='w-full flex justify-center items-center'>
   <button
          type="submit"
          className="  border-2 px-4 py-2 border-1 rounded-md bg-pink-600 text-white hover:bg-pink-700"
        >
          Submit
        </button>
   </div>
      </form>
    </div>
  );
};

export default BookingForm;
