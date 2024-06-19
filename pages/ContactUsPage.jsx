"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { FiUser } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import AboutShadivyah from "@/components/AboutShadivyah";
import ContactForm from "@/components/ContactUsForm";
import Gallery from "@/components/Gallery";
import Hero_2 from "@/components/Hero_2";
import HowToWork from "@/components/HowToWork";
import Space100px from "@/components/Space100px";
import Space50px from "@/components/Space50px";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";

const Popup = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="lg:w-[1100px] lg:h-[636px] mx-4 p-5 rounded-xl border border-[#C9184A] flex justify-between bg-white">
        <div className="hidden lg:block w-[515px] bg-black h-full rounded-l-xl">
          <img src="./images/form.png" alt="" />
        </div>
        <div className=" w-[432px]">
          <p className="flex justify-end">
            <svg
              onClick={handleClose}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              className="cursor-pointer"
            >
              <g fill="red">
                <path d="M23.686 8.314a1.5 1.5 0 0 0-2.122 0L16 13.88l-5.564-5.565a1.5 1.5 0 0 0-2.122 2.122L13.88 16l-5.565 5.564a1.5 1.5 0 0 0 2.122 2.122L16 18.12l5.564 5.565a1.5 1.5 0 0 0 2.122-2.122L18.12 16l5.565-5.564a1.5 1.5 0 0 0 0-2.122" />
                <path d="M6 1a5 5 0 0 0-5 5v20a5 5 0 0 0 5 5h20a5 5 0 0 0 5-5V6a5 5 0 0 0-5-5zM3 6a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" />
              </g>
            </svg>
          </p>
          <p className="font-medium text-[#02394A] text-[24px] text-center lg:text-[48px]">
            Lorem ipsum dolor
          </p>
          <p className="lg:text-[18px] text-[14px] lg:w-[432px]">
            Lorem ipsum dolor sit amet consectetur. Vitae interdum
            consectetur lobortis leo elementum viverra ut quam.
          </p>
          <div className="space-y-4 mt-6">
            <input
              className="lg:w-[411px] w-full border border-[#D8E2DC] p-4 rounded-md"
              type="text"
              placeholder="Full Name"
            />
            <input
              className="lg:w-[411px] w-full border border-[#D8E2DC] p-4 rounded-md"
              type="text"
              placeholder="Phone Number"
            />
            <input
              className="lg:w-[411px] w-full border border-[#D8E2DC] p-4 rounded-md"
              type="text"
              placeholder="Email"
            />
            <textarea
              className="lg:w-[411px] w-full border border-[#D8E2DC] p-4 rounded-md"
              placeholder="Your Query (at most 100 words)"
              name=""
              id=""
            ></textarea>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="mt-8 bg-gradient-to-r drop-shadow-md from-[#C9184A] to-[#FFB5A7] text-white font-bold py-2 px-4 w-[234px] h-[55px] rounded-full shadow-xl"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutUS = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopUp = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-snowWhite">
      {showPopup && <Popup onClose={closePopup} />}
      <Hero_2 img={"/images/conact_hero_image.png"} />
      <Space100px />
      <div className="flex flex-col gap-4  items-center overflow-hidden ">
        <p className=" md:text-[60px] text-[40px]  font-medium  lg:font-semibold text-pink">
          TELL US MORE
        </p>
        <p className=" lg:text-[32px]  md:font-medium  text-pink text-[18px]   ">
          PLEASE FILL THE FORM BELOW
        </p>
        <p className="text-black  text-center w-[352px] text-sm lg:w-[586px] md:text-lg font-normal leading-6">
          Or email <span className="text-pink"> hello@shadivyah.com</span> and
          include details about your day, alternatively call M: +91 8007202422
        </p>
        <Space50px />
        <ContactForm />
        <Space50px />
        <div className="flex flex-col lg:flex-row  xl:px-[100px]   px-6 md:px-20  justify-between items-center gap-12 lg:gap-20 xl:gap-36 ">
          <div className="flex flex-col justify-start  gap-6">
            <div>
              {" "}
              <img
                src={"/images/flowers.png"}
                alt={"image"}
                height={1000}
                width={1000}
                className="xl:h-[400px] xl:w-[550px] lg:w-[450px] lg:h-[300px] md:h-[400px] w-full h-[249px]"
              />
            </div>
            <p className="lg:text-[32px] text-[24px] font-[500] text-blue text-center">
              Register as a Vendor
            </p>
            <p className="lg:text-lg lg:font-[400] text-center text-blue leading-5 xl:w-[549px] lg:w-[430px] text-sm  ">
              Join our vibrant community of vendors and showcase your unique
              products and services. We provide a platform that connects you
              with a wide audience, helping you grow your business and reach new
              customers. Don't miss this opportunity to become a part of our
              trusted network and boost your sales.
            </p>
            <div className=" flex justify-center items-center mt-4 lg:mt-0">
              <div className="bg-gradient-to-r  from-[#C9184A] to-[#FFB5A7]  w-[234px] h-[55px] rounded-full shadow-xl">
                {" "}
                <Link href={"/register"}>
                  {" "}
                  <button
                    type="submit"
                    className=" text-white font-medium py-2 px-4 w-[234px] h-[55px] rounded-full shadow-xl "
                  >
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start  gap-6">
            <div>
              {" "}
              <img
                src={"/images/hand.png"}
                alt={"image"}
                height={1000}
                width={1000}
                className="xl:h-[400px] xl:w-[550px] lg:w-[450px] lg:h-[300px] md:h-[400px]  w-full h-[249px]"
              />
            </div>
            <p className="lg:text-[32px] text-[24px] font-[500] text-blue text-center">
              Have a question in mind?{" "}
            </p>
            <p className="lg:text-lg lg:font-[400] text-center text-blue leading-5 xl:w-[549px] lg:w-[430px] text-sm  ">
              We are here to help! Whether you have questions about our
              services, need assistance with your account, or just want to learn
              more about what we do, our team is ready to assist you. Get in
              touch with us and we will provide the answers you need. Your
              satisfaction is our top priority, and we are committed to ensuring
              you have the best experience possible.
            </p>
            <div className=" flex justify-center items-center mt-4 lg:mt-0">
              <div className="bg-gradient-to-r  from-[#C9184A] to-[#FFB5A7]  w-[234px] h-[55px] rounded-full shadow-xl">
                <button
                  onClick={handlePopUp}
                  type="submit"
                  className=" text-white font-medium py-2 px-4 w-[234px] h-[55px] rounded-full shadow-xl "
                >
                  Contact us
                </button>
              </div>
            </div>
          </div>
        </div>
        <HowToWork />
        <AboutShadivyah />
        <Space50px />
        <Testimonials />
        <Space50px />
        <Gallery />
      </div>
    </div>
  );
};

export default AboutUS;
