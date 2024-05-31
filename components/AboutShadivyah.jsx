import React from 'react'
import Image from "next/image";
export default function AboutShadivyah() {
  return (
    <div>
       <div className="  w-full xl:px-[100px]  md:px-[60px] px-6    lg:flex justify-between">
          <div className="space-y-6  pt-20">
            <p className="font-medium text-center md:text-start">About ShaadiVyha</p>
            <h1 className="xl:text-[48px] text-[32px] xl:w-[627px] md:text-start  font-semibold text-[#C9184A] font-fira-sans text-center ">
            We Are The Best Event Planner & Organizer In Town
            </h1>
            <div>
              <div className="space-y-8 ">
                <p className="md:text-[24px] text-[14px] md:text-start text-[#02394A] font-fira-sans lg:w-[507px] text-center">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.                 </p>
               <div className="space-y-4">
                <div className="flex gap-4">
                  <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50"><path fill="#02394A" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15"/><path fill="#02394A" d="m23 32.4l-8.7-8.7l1.4-1.4l7.3 7.3l11.3-11.3l1.4 1.4z"/></svg></p>
                <p className="md:font-semibold font-medium text-[#02394A]" >Best Quality Services</p>
                </div>
                <div className="flex gap-4">
                  <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50"><path fill="#02394A" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15"/><path fill="#02394A" d="m23 32.4l-8.7-8.7l1.4-1.4l7.3 7.3l11.3-11.3l1.4 1.4z"/></svg></p>
                <p className="md:font-semibold font-medium text-[#02394A]" >100% Satisfaction Guarantee</p>
                </div>
                <div className="flex gap-4">
                  <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50"><path fill="#02394A" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15"/><path fill="#02394A" d="m23 32.4l-8.7-8.7l1.4-1.4l7.3 7.3l11.3-11.3l1.4 1.4z"/></svg></p>
                <p className="md:font-semibold font-medium text-[#02394A]" >Quality Control System</p>
                </div>
                <div className="flex gap-4">
                  <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50"><path fill="#02394A" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15"/><path fill="#02394A" d="m23 32.4l-8.7-8.7l1.4-1.4l7.3 7.3l11.3-11.3l1.4 1.4z"/></svg></p>
                <p className="md:font-semibold font-medium text-[#02394A]" >Commitment to Customer</p>
                </div>
                <div className="flex gap-4">
                  <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50"><path fill="#02394A" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15"/><path fill="#02394A" d="m23 32.4l-8.7-8.7l1.4-1.4l7.3 7.3l11.3-11.3l1.4 1.4z"/></svg></p>
                <p className="md:font-semibold font-medium text-[#02394A]" >Highly Professional Team</p>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-10">
          <Image
                src={"/images/hand.png"}
                alt={"image"}
                height={1000}
                width={1000}
                className=" lg:w-[503px] md:w-full lg:h-[523px] md:h-[400px] h-[200px]"
              />
          </div>
        </div>
    </div>
  )
}