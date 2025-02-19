"use client";
import React, { useState, useEffect } from "react";

const EditLeadPopup = ({ isOpen, onClose, leadData, onUpdate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    destination: "",
    budget: "",
    name: "",
    phone: "",
    selectedFields: [],
  });

  useEffect(() => {
    if (leadData) {
      setFormData({
        date: leadData.date || "",
        destination: leadData.destination || "",
        budget: leadData.budget || "",
        name: leadData.name || "",
        phone: leadData.phone || "",
        selectedFields: leadData.selectedFields || [],
      });
    }
  }, [leadData]);

  const handleInputChange = (e, field = null) => {
    if (field) {
      setFormData((prev) => ({
        ...prev,
        selectedFields: prev.selectedFields.includes(field)
          ? prev.selectedFields.filter((item) => item !== field)
          : [...prev.selectedFields, field],
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#FFF4E8] shadow-lg p-10 w-full max-w-4xl relative font-Merriweather font-thin border-gradient">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl text-gray-600 hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-center text-[#A11C5C] text-2xl font-bold">
          Edit Lead
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-2 grid grid-cols-2 gap-6 mt-4"
        >
          <div>
            <label className="block text-[#A11C5C]">Date</label>
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
            <label className="block text-[#A11C5C]">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-[#A11C5C]">Budget</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-[#A11C5C]">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-[#A11C5C]">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {/* <div>
            <label className="block text-[#A11C5C]">Services</label>
            <select
              multiple
              value={formData.selectedFields}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  selectedFields: Array.from(e.target.selectedOptions, (opt) => opt.value),
                }))
              }
              className="w-full p-2 border rounded"
            >
              {["Venue", "Photographers", "Makeup Artists", "Decorators", "Caterers", "Choreographers", "DJ"].map(
                (option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              )}
            </select>
          </div> */}

          <div className="relative">
            <label className="block text-[#A11C5C]">Services</label>
            <div
              className="w-full p-3 border rounded cursor-pointer flex items-center justify-between bg-gray-100"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {formData.selectedFields.length > 0
                  ? formData.selectedFields.join(", ")
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
                      checked={formData.selectedFields.includes(option)}
                      onChange={() => handleInputChange(null, option)}
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
              className="py-2 px-6 text-white bg-gradient-to-r from-[#DD0D63] to-[#800F45] rounded-md"
            >
              Update Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLeadPopup;
