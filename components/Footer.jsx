import React from "react";
import Space50px from "./Space50px";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className="hidden lg:flex  justify-around h-[478px]  text-white bg-gradient-to-t drop-shadow-md from-[#C9184A] to-[#FFB5A7]">
        <Space50px />
        <div className="flex flex-col pt-32 gap-5">
          <p className="font-[600] text-[24px] ">CONTACT US</p>
          <p className="w-[292px] text-start text-base">
            B-36, Nehru colony, We ara a lorem ipsum dolor sit amet, conse
            ctetur adipiscing elit
          </p>
          <p className="w-[292px] text-start text-base">
            Email: enquire@shadivyah.com{" "}
          </p>
          <p className="w-[292px] text-start text-base">Phone: 2346457787</p>
        </div>
        <div className="flex pt-5 flex-col gap-5">
          <img
            src={"/logo.png"}
            alt={""}
            width={1000}
            height={1000}
            className="w-[205px]"
          />
          <p className="w-[292px] text-start text-base flex flex-col">
            <p className="text-[32px] font-normal items-start">
              {" "}
              WE INVITE YOU
            </p>
          </p>
          <p className="w-[250px] text-end text-base items-end">
            to tell us your story
          </p>
          <button
            type="submit"
            className="bg-transparent border-2 border-white text-white font-bold py-2 px-4 w-[234px] h-[55px] rounded-full shadow-xl "
          >
            Contact Us
          </button>
        </div>
        <div className="flex gap-6 pt-32">
          <div className="flex flex-col gap-4">
            <p className="text-white font-[600] text-xl">USEFUL LINKS</p>
            <p>Privacy Policy</p>
            <p>Term and Conditions</p>
            <p>Support</p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-white font-[600]  text-xl">FOLLOW US</p>
            <p>Facebook</p>
            <p>Youtube</p>
            <p>Instagram</p>
          </div>
        </div>
        <Space50px />
      </div>
      <div className="text-white px-6 py-8 bg-gradient-to-t drop-shadow-md from-[#C9184A] to-[#FFB5A7] lg:hidden">
        <div>
          <div className="flex justify-center items-center">
            <img
              src={"/logo.png"}
              alt={""}
              width={1000}
              height={1000}
              className="w-[78px] h-[78px] "
            />
          </div>
          <p className="font-medium text-center">
            WE INVITE YOU <br />{" "}
            <span className="text-[12px] ml-8">to tell us your story.....</span>
          </p>
        </div>
        <div className=" flex justify-between mt-6">
          <div className=" flex flex-col gap-3">
            <h1 className="font-medium">CONTACT US</h1>
            <p className="text-[12px] w-[162px]">
              B-36, Nehru colony, We ara a lorem ipsum dolor sit amet, conse
              ctetur adipiscing elit,{" "}
            </p>
            <p className="text-[12px]">Email -enquire@shadivyah.com</p>
            <p className="text-[12px]">Phone - 9149057322</p>
          </div>

          <div className="flex flex-col gap-3">
            <h1>FOLLOW US</h1>
            <p>Facebook</p>
            <p>Facebook</p>
            <p>Facebook</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-transparent border-2 border-white text-white font-bold py-2 px-4 w-[234px] h-[55px] rounded-full shadow-xl mt-8 "
          >
            Contact Us
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <p>Privacy Policy</p> <p>Term and Conditions</p> <p>Support</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
