import Image from "next/image";
import React from "react";

const ContactUS = () => {
  return (
    <div className="bg-[url('/icons/background.svg')] bg-cover bg-center bg-[#FFF5E8] w-full h-full text-white flex justify-center items-center font-Merriweather">
      <div
        className="relative w-full max-w-3xl p-12 rounded-lg shadow-lg"
        style={{
          background: "linear-gradient(180deg, #CE0059 0%, #A11C5C 100%)",
        }}
      >
        <Image
          src="/icons/mandal.svg"
          alt="Mandal Design"
          width={1000}
          height={1000}
          className="absolute bottom-0 right-0 w-40 h-40"
        />

        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold">Contact Information</h2>
          <p className="text-lg">Connect with us for any query!!</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <Image
              src="/icons/bxs_phone-call.svg"
              alt="Call"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <p className="text-lg">+91 9084684360</p>
          </div>
          <div className="flex items-center space-x-4">
            <Image
              src="/icons/carbon_location-filled.svg"
              alt="Location"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <p className="text-lg">
              B, 36, Nehru Colony Rd, C-Block, Nehru Colony, Dalanwala,
              Dehradun, Uttarakhand 248001
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Image
              src="/icons/ic_sharp-email.svg"
              alt="Email"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <p className="text-lg">shaadivyahwork@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUS;
