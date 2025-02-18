"use client";
import React, { useState, useRef } from "react";
import { useLead } from "@/Providers/LeadProviders";

const BiddingCards = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Prevent rendering when modal is closed

  const { addLead } = useLead();
  const [selectedFields, setSelectedFields] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    destination: "",
    budget: "",
    name: "",
    phone: "",
  });

  const formRef = useRef(null);
  const allFieldsFilled =
    formData.date &&
    formData.destination &&
    formData.budget &&
    formData.name &&
    formData.phone &&
    selectedFields.length > 0;

  const handleFieldChange = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field)
        ? prev.filter((item) => item !== field)
        : [...prev, field]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addLead({ ...formData, selectedFields });
    if (response.success) {
      alert("Form Submitted successfully!");
      setFormData({
        date: "",
        destination: "",
        budget: "",
        name: "",
        phone: "",
      });
      setSelectedFields([]);
      onClose(); // Close modal after successful submission
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#FFF4E8] shadow-lg  p-10 w-full max-w-4xl relative font-Merriweather font-thin border-gradient">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl text-gray-600 hover:text-red-500"
        >
          &times;
        </button>
        <div className="text-center pb-10">
          <p className="text-[#A11C5C] text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
            Let us know your Plan
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-2 grid grid-cols-2 gap-14"
        >
          <div className="mt-4">
            <label className="block text-[#A11C5C] ">Date of Occasion</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-[#A11C5C] ">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="City"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-[#A11C5C] ">Budget</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="₹ Amount"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-[#A11C5C] ">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-[#A11C5C] ">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Your Phone"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div ref={formRef} className="relative">
            <label className="block text-[#A11C5C]">Services</label>
            <div
              className="w-full p-3 border rounded cursor-pointer flex items-center justify-between bg-gray-100"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedFields.length > 0
                  ? selectedFields.join(", ")
                  : "Select Services..."}
              </span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
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
              <ul className="absolute w-full bg-white border mt-2 rounded shadow-lg z-10 max-h-40 overflow-y-auto">
                {[
                  "Venue",
                  "Photographers",
                  "Makeup Artists",
                  "Decorators",
                  "Caterers",
                  "Choreographers",
                  "DJ",
                ].map((option) => (
                  <li
                    key={option}
                    className="p-3 flex items-center hover:bg-gray-200"
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

          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="py-2 px-6 text-white rounded-md"
              style={{
                background: "linear-gradient(90deg, #DD0D63 0%, #800F45 100%)",
              }}
              disabled={!allFieldsFilled}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BiddingCards;
