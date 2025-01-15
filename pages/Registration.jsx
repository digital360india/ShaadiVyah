"use client";
import React, { useState } from "react";
import Lottie from "react-lottie";
import makeup from "../public/lottie/makeuplottie.json";
import mehndi from "../public/lottie/mehndilottie.json";
import photographers from "../public/lottie/photographerslottie.json";
import venues from "../public/lottie/venueslottie.json";
import emailjs from "@emailjs/browser";
import {
  Timestamp,
  addDoc,
  collection, 
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { db } from "@/firebase/firebase";
import WhyJoinShaadiVyah from "@/components/WhyJoinShaadiVyah";

const Registration = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    city: "",
    vendorType: "",
    vendorTypeUID: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClick = (data) => {
    setShowPopup(true);
    console.log(data);
    const formattedData = data.toLowerCase().replace(/\s+/g, "");
    setFormData((prevData) => ({
      ...prevData,
      vendorType: data,
      vendorTypeUID: formattedData,
    }));
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", formData.email)
      );
      const querySnapshot = await getDocs(q);
      const password = 111111;
      if (querySnapshot.empty) {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          password
        );
        const docRef = await addDoc(collection(db, "users"), {
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          name: formData.name,
          approval: false,
          seoRating: 0,
          ...formData,
        });
        await updateDoc(docRef, {
          uid: docRef.id,
          timestamp: Timestamp.now(),
        });

        const serviceId = "service_ocr1p2m";
        const templateId = "template_57kpfms";
        const publicKey = "cPK9os8MsP293AxW5";
        const templateParams = {
          nameOfClient: formData.name,
          receiverEmail: formData.email,
          userPassword: password,
        };

        emailjs.send(serviceId, templateId, templateParams, publicKey).then(
          (response) => {
            console.log("SUCCESS!", response);
          },
          (err) => {
            console.log("FAILED...", err);
          }
        );
      } else {
        console.log("User already exists");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }

    setIsSubmitted(true);
    setFormData({
      email: "",
      name: "",
      phone: "",
      city: "",
      vendorType: "",
      vendorTypeUID: "",
    });
    setShowPopup(false);
  };

  return (
    <div className=" pt-20 md:pt-0 pb-10">
      <div className="text-pink text-3xl pb-2 pt-10 text-center">
        Register as
      </div>

      <div className="flex justify-center items-center flex-wrap  gap-10 p-10">
        <div
          onClick={() => handleClick("Make up vendor")}
          className="h-80 w-80 bg-cream rounded-3xl flex flex-col justify-center items-center shadow-xl shadow-lightpink"
        >
          <Lottie
            options={{ loop: true, autoplay: true, animationData: makeup }}
            height={300}
            width={300}
          />
          <h1 className="text-2xl text-pink">Make up</h1>
        </div>
        <div
          onClick={() => handleClick("Mehndi vendor")}
          className="h-80 w-80 bg-cream rounded-3xl flex flex-col justify-center items-center shadow-xl shadow-lightpink"
        >
          <Lottie
            options={{ loop: true, autoplay: true, animationData: mehndi }}
            height={300}
            width={300}
          />
          <h1 className="text-2xl text-pink">Mehndi</h1>
        </div>
        <div
          onClick={() => handleClick("Photographers vendor")}
          className="h-80 w-80 bg-cream rounded-3xl flex flex-col justify-center items-center shadow-xl shadow-lightpink"
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: photographers,
            }}
            height={300}
            width={300}
          />
          <h1 className="text-2xl text-pink">Photographers</h1>
        </div>
        <div
          onClick={() => handleClick("Venues vendor")}
          className="h-80 w-80 bg-cream rounded-3xl flex flex-col justify-center items-center shadow-xl shadow-lightpink"
        >
          <Lottie
            options={{ loop: true, autoplay: true, animationData: venues }}
            height={300}
            width={300}
          />
          <h1 className="text-2xl text-pink">Venues</h1>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
  <div className="bg-white w-full max-w-lg mx-4 p-6 rounded-lg shadow-lg">
    {/* Modal Title */}
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      Registering as <span className="text-blue-600">{formData.vendorType}</span>
    </h2>

    {/* Form */}
    <form onSubmit={handleSubmit}>
      {/* Name & Email */}
      <div className="flex flex-col md:flex-row md:gap-4 mb-4">
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="w-full mt-4 md:mt-0">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Phone & Location */}
      <div className="flex flex-col md:flex-row md:gap-4 mb-4">
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="w-full mt-4 md:mt-0">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Location
          </label>
          <div className="relative">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Location
              </option>
              <option value="Dehradun">Dehradun</option>
              <option value="Mussoorie">Mussoorie</option>
              <option value="Haridwar">Haridwar</option>
              <option value="Rishikesh">Rishikesh</option>
              <option value="Ramnagar">Ramnagar</option>
              <option value="Nainital">Nainital</option>
            </select>
            <div className="absolute inset-y-0 right-2 flex items-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12l-5-5h10l-5 5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={handleClose}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

      )}
      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl mb-4">
              Thank you for registering! Check out your mail for login
              credentials
            </h2>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-pink-500 hover:bg-pink-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <WhyJoinShaadiVyah/>
    </div>
  );
};

export default Registration;
