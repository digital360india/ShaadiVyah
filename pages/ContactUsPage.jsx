"use client";
import AboutShadivyah from "@/components/AboutShadivyah";
import ContactForm from "@/components/ContactUsForm";
import Gallery from "@/components/Gallery";
import Hero_2 from "@/components/Hero_2";
import HowToWork from "@/components/HowToWork";
import Space100px from "@/components/Space100px";
import Space50px from "@/components/Space50px";
import Testimonials from "@/components/Testimonials";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
const AboutUS = () => {
  return (
    <div className="bg-snowWhite">
      {" "}
      {/*Hero section*/}
      <Hero_2 img={"/images/conact_hero_image.png"} />
      {/*Form section*/}
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
            Join our vibrant community of vendors and showcase your unique products and services. We provide a platform that connects you with a wide audience, helping you grow your business and reach new customers. Donot miss this opportunity to become a part of our trusted network and boost your sales.
            </p>
            <div className=" flex justify-center items-center mt-4 lg:mt-0">
              <div className="bg-gradient-to-r  from-[#C9184A] to-[#FFB5A7]  w-[234px] h-[55px] rounded-full shadow-xl">
                {" "}
             <Link href={'/register'}>   <button
                  type="submit"
                  className=" text-white font-medium py-2 px-4 w-[234px] h-[55px] rounded-full shadow-xl "
                >
                  Register
                </button></Link>
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
            Have a question in mind?            </p>
            <p className="lg:text-lg lg:font-[400] text-center text-blue leading-5 xl:w-[549px] lg:w-[430px] text-sm  ">
            We are here to help! Whether you have questions about our services, need assistance with your account, or just want to learn more about what we do, our team is ready to assist you. Get in touch with us and we will provide the answers you need. Your satisfaction is our top priority, and we are committed to ensuring you have the best experience possible.
            </p>
            <div className=" flex justify-center items-center mt-4 lg:mt-0">
              <div className="bg-gradient-to-r  from-[#C9184A] to-[#FFB5A7]  w-[234px] h-[55px] rounded-full shadow-xl">
                <button
                  type="submit"
                  className=" text-white font-medium py-2 px-4 w-[234px] h-[55px] rounded-full shadow-xl "
                >
                  Contact us
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <Space50px /> */}
        <HowToWork />
        {/* <Space50px /> */}
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
