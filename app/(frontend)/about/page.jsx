"use client";
import React, { useState } from "react";
import { db } from "@/firebase/firebase"; // Adjust the path to your Firebase configuration
import { collection, addDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import "@/styles/Textgradient.css";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, "enquiries"), formData);
      setFormData({
        name: "",
        phone: "",
        message: "",
      });
      setSuccess(true);
      toast.success("Enquiry submitted successfully!");
    } catch (error) {
      setError(error.message);
      toast.error("Error submitting enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      {/* About ShadiVyah */}
      <div className="xl:px-[100px] lg:px-[50px] md:px-[50px] px-6 py-[70px] flex flex-col lg:flex-row justify-between mt-10 md:mt-0">
        <div>
          <p className="lg:text-[56px] text-[43px] font-medium xl:w-[676px] lg:w-[500px] ">
            <span className="gradient-text">About ShaadiVyah</span>{" "}
            <span>
              :Where Dreams Meet Perfection, and Prices Meet Your Budget
            </span>
          </p>
        </div>
        <div className="space-y-7 mt-6 lg:mt-0">
          <p className="lg:text-[18px] text-[14px]  xl:w-[504px]">
            Welcome to Shaadivyah, Uttarakhand&apos;s first wedding destination
            portal and your premier choice for destination weddings in
            Uttarakhand. Proudly supporting Prime Minister Narendra Modi&apos;s
            Wed in India&apos;s initiative, we offer couples from around the
            globe the chance to celebrate their love in one of India&apos;s most
            picturesque and spiritually uplifting locations.
          </p>
          <button className="py-[14px] w-[234px] bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] text-white rounded-3xl">
            Contact Us
          </button>
        </div>
      </div>
      {/* About ShadiVyah */}
      {/* OUR COMMITMENT */}
      <div className="h-[600px] bg-black relative">
        <img
          src="/images/bgimageourcommitment.png"
          height={1000}
          width={1000}
          className="w-screen h-[600px] absolute object-cover"
        />
        <div className="absolute  space-x-8  xl:px-[100px] lg:px-[50px] md:px-[50px] px-6  mt-20 ">
          <p className="xl:text-[56px] text-[32px] font-medium">
            <span className="text-white">OUR</span>{" "}
            <span className="text-[#FEC89A]">COMMITMENT</span>
          </p>
          <div className="md:space-y-4 space-y-2 text-white lg:w-[503px] md:w-[350px] text-[14px] lg:text-[18px]">
            <p>
              At Shaadivyah, we&apos;re dedicated to excellence, specializing in
              destination weddings in Uttarakhand. With our deep knowledge of
              the region&apos;s most stunning venues, we&apos;re the perfect
              partner to transform your dream wedding into reality. We recognize
              that your wedding day is one of life&apos;s most important
              moments. That&apos;s why we offer personalized planning services
              to match your unique vision. From picturesque venues and skilled
              photographers to expert makeup artists and intricate mehndi
              designs, we handle every detail with care to ensure your day is
              flawless.
            </p>
          </div>
        </div>
      </div>
      {/* OUR COMMITMENT */}
      {/* OUR SPECIALIST SERVICES */}
      <div className="xl:mx-[100px] lg:mx-[50px] md:mx-[50px] mx-6 py-10 my-20 bg-[#F9DCC466]">
        <p className="lg:text-[56px] text-[32px] font-medium text-[#02394A] text-center">
          OUR SPECIALIST SERVICES
        </p>
        <p className="lg:text-[17px] text-[13px] font-medium text-[#C9184A] text-center">
          Our skilled team brings your vision to life with expertise in every
          detail. From top photographers, and trusted vendors, to talented
          make-up and mehendi artists to create your perfect day.
        </p>
        <div className="xl:px-[60px] lg:px-[30px] lg:flex-nowrap px-10 flex flex-col md:flex-row md:flex-wrap xl:gap-10 lg:gap-5 md:gap-10 gap-5  mt-12 justify-center items-center">
          <Link
            href={"/venues"}
            className="h-[244px] lg:w-[244px] w-[300px] md:w-[270px] bg-black rounded-xl relative"
          >
            <img
              src="/images/venus_page.png"
              height={1000}
              width={1000}
              className="lg:w-[244px] w-[300px] md:w-[270px] h-[244px] absolute  rounded-xl object-cover object-left"
            />
            <p className="text-[18px] font-medium text-white px-9 absolute bottom-7">
              WEDDING VENUES
            </p>
          </Link>
          <Link
            href={"/photographervendors"}
            className="h-[244px] lg:w-[244px] w-[300px] md:w-[270px] bg-black rounded-xl relative"
          >
            <img
              src="/images/photography_service_page.png"
              height={1000}
              width={1000}
              className="lg:w-[244px] w-[300px] md:w-[270px] h-[244px] absolute rounded-xl object-cover object-left"
            />
            <p className="text-[18px] font-medium text-white px-9 absolute bottom-7">
              PHOTOGRAPHERS
            </p>
          </Link>
          <Link
            href={"/makeupvendors"}
            className="h-[244px] lg:w-[244px] w-[300px] md:w-[270px] bg-black rounded-xl relative"
          >
            <img
              src="/images/hero.png"
              height={1000}
              width={1000}
              className="lg:w-[244px] w-[300px] md:w-[270px] h-[244px] absolute rounded-xl object-cover object-left"
            />
            <p className="text-[18px] font-medium text-white px-9 absolute bottom-7">
              MAKE UP ARTISTS
            </p>
          </Link>
          <Link
            href={"/mehandivendors"}
            className="h-[244px] lg:w-[244px] w-[300px] md:w-[270px] bg-black rounded-xl relative"
          >
            <img
              src="/images/mehndi_services_page.png"
              height={1000}
              width={1000}
              className="lg:w-[244px] w-[300px] md:w-[270px] h-[244px] absolute rounded-xl object-cover object-right"
            />
            <p className="text-[18px] font-medium text-white px-9 absolute bottom-7">
              MEHNDI ARTISTS
            </p>
          </Link>
        </div>
      </div>
      {/* OUR SPECIALIST SERVICES */}
      {/* OUR APPROACH */}
      <div className="xl:px-[100px] lg:px-[50px] md:px-[50px] px-6">
        <p className="lg:text-[24px] font-medium text-[#02394A]">
          OUR APPROACH
        </p>
        <p className="lg:text-[48px] text-[32px] font-medium text-[#02394A] mb-10">
          <span>Turning </span> 
          <span className="text-[#C9184A]">Dreams </span>
          <span>into Reality</span>
        </p>
        <div className="lg:flex justify-between">
          <div className="lg:w-[509px]  space-y-7 ">
            <li className="lg:text-[18px] text-[14px]">
              Bringing your dream to life with a custom plan.
            </li>
            <li className="lg:text-[18px] text-[14px]">
              Handling all details so your day is effortless and smooth.
            </li>
            <li className="lg:text-[18px] text-[14px]">
              {" "}
              Ensuring every moment is perfect on your special day.
            </li>
            <button className="hidden lg:block py-[14px] w-[234px] bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] rounded-3xl text-white">
              Contact Us
            </button>
          </div>
          <img
            src="/images/bangles.png"
            className="bg-black lg:h-[400px] lg:w-[627px] h-[220px] mt-4 lg:mt-0"
          ></img>
          <div className="flex justify-center items-center mt-7">
            <button className="block lg:hidden py-[14px] w-[234px] bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] rounded-3xl text-white">
              Contact Us
            </button>
          </div>
        </div>
      </div>
      {/* OUR APPROACH */}
      {/* Make an Enquiry */}
      <div className="bg-[#F9DCC4] lg:py-[48px] py-8 mt-40">
        <p className="lg:text-[56px] text-[40px] font-medium text-[#C9184A] text-center">
          Make an Enquiry
        </p>
        {success ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold text-green-500">Thank you!</h2>
            <p className="text-lg text-gray-700 mt-4">
              Your enquiry has been successfully sent. We will get back to you
              shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="xl:px-[140px]  md:pl-16 lg:pl-32 flex flex-col justify-center items-center ">
              <p className="text-[#02394A] text-[32px] xl:text-[56px] font-light">
                Please share your{" "}
                <input
                  className="placeholder:text-center  border-b border-b-black bg-transparent w-[120px] md:w-[800px]"
                  type="text"
                  name="name"
                  placeholder="name"
                  value={formData.name}
                  onChange={handleChange}
                />{" "}
              </p>
              <p className="text-[#02394A] text-[32px] xl:text-[56px] font-light">
                and your{" "}
                <input
                  className="placeholder:text-center  border-b border-b-black bg-transparent w-[220px] md:w-[800px]"
                  type="text"
                  name="phone"
                  placeholder="phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />{" "}
              </p>
              <p className="text-[#02394A] text-[32px] xl:text-[56px] font-light">
                {" "}
                <input
                  className="placeholder:text-center border-b border-b-black bg-transparent w-[400px] lg:w-[800px] md:w-[600px] xl:w-[1037px] mt-10"
                  type="text"
                  name="message"
                  placeholder=" message"
                  value={formData.message}
                  onChange={handleChange}
                />{" "}
              </p>
              <p className="text-[#02394A] text-[32px] xl:text-[56px] font-light pl-5">
                {" "}
                Lets figure out what project we can do together.{" "}
              </p>
            </div>
            <div className="flex justify-center items-center mt-16">
              <button
                onClick={handleSubmit}
                className="py-[14px] w-[234px] bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] rounded-3xl text-white"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
      {/* Make an Enquiry */}
    </div>
  );
}
