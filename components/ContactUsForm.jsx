"use client";
import React, { useState } from "react";
import Space50px from "./Space50px";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    email: "",
    phone: "",
    selectedVendor: "",
    selectedLocation: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="xl:px-[100px] px-6   ">
      <form onSubmit={handleSubmit} className=" w-full">
        <div className="flex flex-col lg:flex-row gap-9">
          <div className="flex flex-col justify-start items-start gap-5 ">
            {" "}
            <div className="xl:w-[572px] lg:w-[445px] md:w-[600px] md:h-[50px] lg:h-[60px] w-[342px] h-[40px] border-2">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="YOUR NAME*"
                value={formData.name}
                onChange={handleChange}
                className="p-2 block w-full h-full rounded-md border-gray-300 shadow-sm focus:border-blue-200 focus:ring focus:ring-blue-100 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="xl:w-[572px] lg:w-[445px] lg:h-[60px] md:w-[600px] md:h-[50px] w-[342px] h-[40px] border-2">
              <input
                type="email"
                id="email"
                placeholder="YOUR PHONE NUMBER*"
                name="email"
                value={formData.phone}
                onChange={handleChange}
                className="p-2 block w-full h-full  rounded-md border-gray-300 shadow-sm focus:border-blue-200 focus:ring focus:ring-blue-100 focus:ring-opacity-50"
                required
              />
            </div>
            <div className=" xl:w-[572px] lg:w-[445px] lg:h-[60px] md:w-[600px] md:h-[50px] w-[342px] h-[40px] border-2">
              <input
                type="text"
                id="selectedVendor"
                placeholder="SELECTED VENDOR*"
                name="selectedVendor"
                value={formData.selectedVendor}
                onChange={handleChange}
                className="p-2 block w-full h-full rounded-md border-gray-300 shadow-sm focus:border-blue-200 focus:ring focus:ring-blue-100 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div className=" flex flex-col gap-5 justify-center items-center ">
            {" "}
            <div className="xl:w-[572px] lg:w-[445px] lg:h-[60px] md:w-[600px] md:h-[50px] w-[342px] h-[40px] border-2">
              <input
                type="email"
                id="email"
                placeholder="EMAIL ID*"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 block w-full h-full rounded-md border-gray-300 shadow-sm focus:border-blue-200 focus:ring focus:ring-blue-100 focus:ring-opacity-50"
                required
              />
            </div>
            <div className=" xl:w-[572px] lg:w-[445px] lg:h-[60px] md:w-[600px] md:h-[50px] w-[342px] h-[40px] border-2">
              <input
                type="text"
                id="location"
                name="location"
                placeholder="ENTER LOCATION*"
                value={formData.location}
                onChange={handleChange}
                className="p-2 block w-full h-full rounded-md border-gray-300 shadow-sm focus:border-blue-200 focus:ring focus:ring-blue-100 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="flex justify-center items-center">
              <div className="xl:w-[572px] lg:w-[445px] lg:h-[60px] md:w-[600px] md:h-[50px] w-[342px] h-[40px] border-2">
                <input
                  type="text"
                  id="selectedLocation"
                  name="selectedLocation"
                  placeholder="SELECT PREFERRED LOCATION"
                  value={formData.selectedLocation}
                  onChange={handleChange}
                  className="p-2 block w-full h-full rounded-md border-gray-300 shadow-sm focus:border-blue-200 focus:ring focus:ring-blue-100 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <Space50px />
        <div className=" h-[245px] border-2 ">
          <input
            type="text"
            id="selectedLocation"
            name="selectedLocation"
            value={formData.message}
            placeholder="TELL US MORE..."
            onChange={handleChange}
            className="p-2 block w-full h-full rounded-md border-gray-300 shadow-sm focus:border-blue-200 focus:ring focus:ring-blue-100 focus:ring-opacity-50"
            required
          />
        </div>
        <Space50px />
        <div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-gradient-to-r drop-shadow-md from-[#C9184A] to-[#FFB5A7] text-white font-bold py-2 px-4 w-[234px] h-[55px] rounded-full shadow-xl "
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ContactForm;