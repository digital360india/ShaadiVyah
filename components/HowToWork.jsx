import React from "react";
import Image from "next/image";
export default function HowToWork() {
  return (
    <div>
      <div className="  w-full xl:px-[100px] md:px-[60px] px-6  bg-white   lg:flex justify-between">
        <div className="space-y-6  md:pt-20">
          <h1 className="md:text-[48px] text-[32px] md:text-start font-semibold text-[#C9184A] text-center font-fira-sans xl:pb-12  lg:pb-6">
          Our Process: Turning Your Vision into Reality
          </h1>
          <div className="flex gap-10">
            <div>
              <p className="md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full bg-gradient-to-r drop-shadow-md from-[#C9184A] to-[#FFB5A7]"></p>
            </div>
            <div className="flex-col gap-2">
              <p className="text-[24px] font-semibold text-[#043565] font-fira-sans">
              Discover Your Vision              </p>
              <p className="font-lato xl:w-[507px] lg:w-[400px]">
              We begin with a chat to dive into your vision be it a spectacular wedding, a special celebration, or a memorable photoshoot. We&apos;re here to bring your dreams to life with a personal touch.

              </p>
            </div>
          </div>
          <div className="flex gap-10">
            <div>
              <p className="md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full bg-gradient-to-r drop-shadow-md from-[#C9184A] to-[#FFB5A7]"></p>
            </div>
            <div className="flex-col gap-2">
              <p className="text-[24px] font-semibold text-[#043565] font-fira-sans">
              Design Your Dream Day
              </p>
              <p className="font-lato xl:w-[507px] lg:w-[400px]">
              After our chat, we create a plan that covers all the essentials beautiful makeup, perfect photos, magical decor, vibrant mehendi, and more. Our team handles every detail with care, making your day truly special.
              </p>
            </div>
          </div>
          <div className="flex gap-10">
            <div>
              <p className="md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full bg-gradient-to-r drop-shadow-md from-[#C9184A] to-[#FFB5A7]"></p>
            </div>
            <div className="flex-col gap-2">
              <p className="text-[24px] font-semibold text-[#043565] font-fira-sans">
              Bring It All Together
              </p>
              <p className="font-lato xl:w-[507px] lg:w-[400px]">
              Our team handles everything with flair and care on the big day. We craft the perfect atmosphere, capture every special moment, and offer it all at affordable rates so you can relax and enjoy.
              </p>
            </div>
          </div>
        </div>
        <div className="py-10">
          <img
            src={"/images/bangles.png"}
            alt={"image"}
            height={1000}
            width={1000}
            className="lg:w-[503px] md:w-full lg:h-[523px] md:h-[400px] h-[200px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
