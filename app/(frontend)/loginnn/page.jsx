import Space100px from "@/components/Space100px";
import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <div>
      <div className="relative bg-black   py-[84px] xl:px-[416px] lg:px-[220px] md:px-[90px] px-6 ">
        <div className="bg-red-600 h-28 w-28 absolute top-7 xl:left-[660px] lg:left-[465px] md:left-[335px] left-[160px]"></div>
        <div className="bg-white md:w-[602px] md:h-[521px] h-[550px] pt-[60px] rounded-md  ">
          <div className="text-center">
            <p className="text-[24px] font-semibold">Login</p>
            <p className="text-[#424241] text-sm px-[24px]">
              Lorem ipsum dolor sit amet consectetur. Velit euismod donec
            </p>
          </div>
          <div className="md:md:px-20 px-4  pt-7">
            <p className="font-medium ">Email</p>
            <input
              className="border border-[#424241bd] rounded-lg md:w-[448px] py-[18px] pl-[16px] w-full"
              type="text"
              placeholder="johndoe@mail.com"
            />

            <p className="font-medium pt-4 ">passward</p>
            <input
              className="border border-[#424241bd] rounded-lg md:w-[448px] py-[18px] pl-[16px]  w-full"
              type="password"
              placeholder="johndoe@mail.com"
            />
            <p className="text-[#4E5F57] text-end">Forgot Password?</p>
          </div>
          <div className="pt-10 text-center">
            <button className="text-center text-white py-[18px] bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] rounded-md md:w-[448px] w-[350px]">
              LOGIN
            </button>
          </div>
          <div className="text-center pt-6">
            <p>
              <span className="text-[#667085]">Don&apos;t have an account?</span>{" "}
              <span className="font-semibold">Sign Up</span>
            </p>
          </div>
        </div>
      </div>
      <Space100px />
      <div className="relative bg-black   py-[84px] xl:px-[416px] lg:px-[220px] md:px-[90px] px-6 ">
        <div className="bg-red-600 h-28 w-28 absolute top-7 xl:left-[660px] lg:left-[465px] md:left-[335px] left-[160px]"></div>
        <div className="bg-white md:w-[602px] md:h-[521px] h-[550px] pt-[60px] rounded-md">
          <div className="text-center">
            <p className="text-[24px] font-semibold">Forgot Your Password?</p>
            <p className="text-[#424241] text-sm  ">
              Please enter your registered email address.
            </p>
            <div className="flex justify-center items-center py-6">
              <Image
                src=""
                height={1000}
                width={1000}
                className="w-[140px] h-[140px] "
              />
            </div>
          </div>
          <div className="md:px-20 px-4 ">
            <p className="font-medium ">Email</p>
            <input
              className="border border-[#424241bd] rounded-lg md:w-[448px] py-[18px] pl-[16px]  w-full"
              type="text"
              placeholder="johndoe@mail.com"
            />
          </div>
          <div className="pt-10 text-center">
            <button className="text-center text-white py-[18px] bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] rounded-md md:w-[448px] w-[350px]">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
      <Space100px />

      <div className="relative bg-black   py-[84px] xl:px-[416px] lg:px-[220px] md:px-[90px] px-6 ">
        <div className="bg-red-600 h-28 w-28 absolute top-7 xl:left-[660px] lg:left-[465px] md:left-[335px] left-[160px]"></div>
        <div className="bg-white md:w-[602px] md:h-[521px] h-[550px] pt-[60px] rounded-md">
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-[24px] font-semibold">Enter Verification Code</p>
            <p className="text-[#424241] text-sm w-[340px]  flex justify-center items-center">
              Kindly input the verification code that has been sent to your
              registered email address.
            </p>
            <div className="flex justify-center items-center py-6">
              <Image
                src=""
                height={1000}
                width={1000}
                className="w-[140px] h-[140px] "
              />
            </div>
          </div>
          <div className="md:px-20 px-4 ">
            <input
              className="border border-[#424241bd] rounded-lg md:w-[448px] py-[18px] pl-[16px]  w-full"
              type=""
              placeholder="johndoe@mail.com"
            />
            <div className="flex justify-between pt-2">
              <p className="text-[#656675] text-sm ">Didn&apos;t receive OTP</p>
              <p className="text-[#656675] text-sm ">Resend</p>
            </div>
          </div>
          <div className="pt-8 text-center">
            <button className="text-center text-white py-[18px] bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] rounded-md md:w-[448px] w-[350px]">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
      <Space100px />

      <div className="relative bg-black   py-[84px] xl:px-[416px] lg:px-[220px] md:px-[90px] px-6 ">
        <div className="bg-red-600 h-28 w-28 absolute top-7 xl:left-[660px] lg:left-[465px] md:left-[335px] left-[160px]"></div>
        <div className="bg-white md:w-[602px] h-[621px] pt-[60px]   ">
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-[24px] font-semibold">Reset Password</p>
            <p className="text-[#424241] text-sm w-[340px]  flex justify-center items-center">
              Please add a secure password.
            </p>
            <div className="flex justify-center items-center py-6">
              <Image
                src=""
                height={1000}
                width={1000}
                className="w-[140px] h-[140px] "
              />
            </div>
          </div>
          <div className="md:px-20 px-4 ">
            <p className="font-medium ">Enter New Password</p>
            <input
              className="border border-[#424241bd] rounded-lg md:w-[448px] py-[16px] pl-[16px] w-full"
              type="text"
              placeholder="johndoe@mail.com"
            />

            <p className="font-medium pt-4 ">Repeat New Password</p>
            <input
              className="border border-[#424241bd] rounded-lg md:w-[448px] py-[16px] pl-[16px] w-full"
              type="password"
              placeholder="johndoe@mail.com"
            />
          </div>
          <div className="pt-8 text-center">
            <button className="text-center text-white py-[18px] bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] rounded-md md:w-[448px] w-[350px]">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
      <Space100px />

      <div className="relative bg-black   py-[84px] xl:px-[416px] lg:px-[220px] md:px-[90px] px-6 ">
        <div className="bg-red-600 h-28 w-28 absolute top-7 xl:left-[660px] lg:left-[465px] md:left-[335px] left-[160px]"></div>
        <div className="bg-white md:w-[602px] md:h-[521px] h-[550px] pt-[60px] rounded-md">
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-[24px] font-semibold">Enter Verification Code</p>
            <p className="text-[#424241] text-sm w-[340px]  flex justify-center items-center">
              Kindly input the verification code that has been sent to your
              registered email address.
            </p>
            <div className="flex justify-center items-center py-6">
              <Image
                src=""
                height={1000}
                width={1000}
                className="w-[140px] h-[140px] "
              />
            </div>
          </div>
          <div className="md:px-20 px-4 ">
            <input
              className="border border-[#424241bd] rounded-lg md:w-[448px] py-[18px] pl-[16px]  w-full"
              type=""
              placeholder="johndoe@mail.com"
            />
            <div className="flex justify-between pt-2">
              <p className="text-[#656675] text-sm ">Didn&apos;t receive OTP</p>
              <p className="text-[#656675] text-sm ">Resend</p>
            </div>
          </div>
          <div className="pt-8 text-center">
            <button className="text-center text-white py-[18px] bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] rounded-md md:w-[448px] w-[350px]">
              VERIFY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
