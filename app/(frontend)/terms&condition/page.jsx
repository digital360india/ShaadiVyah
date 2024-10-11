"use client";
import Popup from "@/components/Popup";
import React from "react";

export default function page() {
  return (
    <div>
    <div className='xl:px-[100px]  lg:py-20 py-10 mt-10 md:mt-0'>
    <div className="md:px-20 px-6">
          <h1 className="font-semibold md:text-[48px] text-[32px] text-[#C9184A] text-center">
            {" "}
            TERMS & CONDITIONS
          </h1>
          <div className="text-[18px] mt-10">
            <p>
              Greetings from Shaadivyah. You accept and agree to be bound by the
              following terms and conditions by using our services
            </p>
          </div>
          <div>
            <p className="text-[24px] font-semibold mt-10 ">
              Service Agreement
            </p>
            <p className="text-[18px] mt-6">
              {" "}
              We offer consultation, coordination, and planning for weddings.
              Every service&apos;s particulars will be outlined in a formal
              agreement.
            </p>
            <div className="bg-black w-full h-[1px] mt-6"></div>
          </div>
          <div>
            <p className="text-[24px] font-semibold mt-10 ">
              {" "}
              Terms of Payment{" "}
            </p>
              
            <p className="text-[18px] mt-6">
              {" "}
              The agreed-upon schedule for payments for services must be
              followed. Extra fees will apply to any requested additional
              services.
            </p>
            <div className="bg-black w-full h-[1px] mt-6"></div>
          </div>
          <div>
            <p className="text-[24px] font-semibold mt-10 ">
              {" "}
              Policy for Cancellations
            </p>
            <p className="text-[18px] mt-6">
              {" "}
              Written cancellations are required. If applicable, refunds will be
              handled in accordance with the conditions specified in the service
              agreement.
            </p>
            <div className="bg-black w-full h-[1px] mt-6"></div>
          </div>
          <div>
            <p className="text-[24px] font-semibold mt-10 "> Liability</p>
            <p className="text-[18px] mt-6">
              {" "}
              Although we aim for perfection, Shaadivyah is not responsible for
              any unanticipated incidents or situations that happen outside of
              our control and could affect your wedding.
            </p>
            <div className="bg-black w-full h-[1px] mt-6"></div>
          </div>
          <div>
            <p className="text-[24px] font-semibold mt-10 ">
              {" "}
              Intellectual Property
            </p>
            <p className="text-[18px] mt-6">
              {" "}
              Shaadivyah owns all of the text and image content on our website;
              unauthorized use is prohibited.
            </p>
            <div className="bg-black w-full h-[1px] mt-6"></div>
          </div>
          <div>
            <p className="text-[24px] font-semibold mt-10 "> Governing Law </p>
            <p className="text-[18px] my-6">
              {" "}
              Indian law applies to these terms and conditions. Any
              disagreements will be settled under the rules of our main office.
            </p>
          </div>
        </div>
      </div>
      <div>
        {/* <div className='lg:w-[1100px] lg:h-[636px] mx-4 p-5 rounded-xl border border-[#C9184A] flex justify-between '>

<div className='hidden lg:block w-[515px] bg-black h-full rounded-l-xl'></div>
<div className='mt-6 w-[432px]'>
<p className='flex justify-end'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><g fill="red"><path d="M23.686 8.314a1.5 1.5 0 0 0-2.122 0L16 13.88l-5.564-5.565a1.5 1.5 0 0 0-2.122 2.122L13.88 16l-5.565 5.564a1.5 1.5 0 0 0 2.122 2.122L16 18.12l5.564 5.565a1.5 1.5 0 0 0 2.122-2.122L18.12 16l5.565-5.564a1.5 1.5 0 0 0 0-2.122"/><path d="M6 1a5 5 0 0 0-5 5v20a5 5 0 0 0 5 5h20a5 5 0 0 0 5-5V6a5 5 0 0 0-5-5zM3 6a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"/></g></svg></p>

    <p className=' font-medium text-[#02394A] text-[24px] text-center lg:text-[48px]'>Lorem ipsum dolor</p>
    <p className='lg:text-[18px] text-[14px] lg:w-[432px]'>Lorem ipsum dolor sit amet consectetur. Vitae interdum consectetur lobortis leo elementum viverra ut quam.</p>
    <div className='space-y-4 mt-6'>
        <input className='lg:w-[411px] w-full border border-[#D8E2DC] p-4 rounded-md' type="text" placeholder='Full Name' />
        <input  className='lg:w-[411px] w-full border border-[#D8E2DC] p-4 rounded-md' type="text" placeholder='Phone Number' />

        <input  className='lg:w-[411px] w-full border border-[#D8E2DC] p-4 rounded-md' type="text" placeholder='Email' />
        <textarea  className='lg:w-[411px] w-full border border-[#D8E2DC] p-4 rounded-md' placeholder='Your Query ( atmost 100 words)' name="" id=""></textarea>

    </div>
    <div className='flex justify-center items-center'>
    <button
              type="submit"
              className="mt-8 bg-gradient-to-r drop-shadow-md from-[#C9184A] to-[#FFB5A7] text-white font-bold py-2 px-4 w-[234px] h-[55px] rounded-full shadow-xl "
            >
              Submit
            </button></div>
            </div>
    </div> */}
        <Popup />
      </div>
    </div>
  );
}
