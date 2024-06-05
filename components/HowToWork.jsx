import React from 'react'
import Image from "next/image";
export default function HowToWork() {
  return (
    <div>
        <div className="  w-full xl:px-[100px] md:px-[60px] px-6  bg-white   lg:flex justify-between">
          <div className="space-y-6  pt-20">
            <h1 className="md:text-[48px] text-[32px] md:text-start font-semibold text-[#C9184A] text-center font-fira-sans xl:pb-12  lg:pb-6">
              How we Work
            </h1>
            <div className="flex gap-10">
              <div>
                <p className="md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full bg-gradient-to-r drop-shadow-md from-[#C9184A] to-[#FFB5A7]"></p>
              </div>
              <div className="flex-col gap-2">
                <p className="text-[24px] font-semibold text-[#043565] font-fira-sans">
                  Lorem ipsum dolor sit amet
                </p>
                <p className="font-lato xl:w-[507px] lg:w-[400px]">
                  Lorem ipsum dolor sit amet consectetur. Et et hendrerit lacus
                  vitae. Adipiscing molestie nibh blandit eget. In et ut
                  facilisi eget.
                </p>
              </div>
            </div>
            <div className="flex gap-10">
              <div>
                <p className="md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full bg-gradient-to-r drop-shadow-md from-[#C9184A] to-[#FFB5A7]"></p>
              </div>
              <div className="flex-col gap-2">
                <p className="text-[24px] font-semibold text-[#043565] font-fira-sans">
                  Lorem ipsum dolor sit amet
                </p>
                <p className="font-lato xl:w-[507px] lg:w-[400px]">
                  Lorem ipsum dolor sit amet consectetur. Et et hendrerit lacus
                  vitae. Adipiscing molestie nibh blandit eget. In et ut
                  facilisi eget.
                </p>
              </div>
            </div>
             <div className="flex gap-10">
              <div>
                <p className="md:w-[40px] md:h-[40px] w-[30px] h-[30px] rounded-full bg-gradient-to-r drop-shadow-md from-[#C9184A] to-[#FFB5A7]"></p>
              </div>
              <div className="flex-col gap-2">
                <p className="text-[24px] font-semibold text-[#043565] font-fira-sans">
                  Lorem ipsum dolor sit amet
                </p>
                <p className="font-lato xl:w-[507px] lg:w-[400px]">
                  Lorem ipsum dolor sit amet consectetur. Et et hendrerit lacus
                  vitae. Adipiscing molestie nibh blandit eget. In et ut
                  facilisi eget.
                </p>
              </div>
            </div>
          </div>
          <div className="py-10">
          <img
                src={"/images/hand.png"}
                alt={"image"}
                height={1000}
                width={1000}
                className="lg:w-[503px] md:w-full lg:h-[523px] md:h-[400px] h-[200px]"
              />
          </div>
        </div>
    </div>
  )
}