'use client'
import React, { useState } from 'react';
import'@/styles/contactus.css'
import Popup2 from './Popup2';
const ContactUsPhoto = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className=''>
      <div className="relative min-h-full xl:px-[80px] lg:px-[40px] md:px-[50px] flex items-center justify-center">
        <div className="parallax h-[400px] md:h-[500px] w-full  flex flex-col items-center justify-center" style={{ backgroundImage: 'url(/images/venues_contactus1.svg)' }}>

          <div className="w-[361px] h-[219px] block md:hidden ">
            <p class="text-[12px] font-semibold text-white font-Merriweather">Best</p>
            <p class="text-[24px] font-bold text-white font-Merriweather">Wedding Planner</p>
            <p class="text-[24px] font-bold text-white font-Merriweather">
              <span class="text-[12px] font-medium font-Merriweather">in</span> Uttarakhand
            </p>
            <i class="lg:w-[914px] w-[80%] text-center  text-[12px] text-white mb-4 font-Merriweather-Sans">
              Welcome to Shaadivyah, where we proudly carry forward Prime
              Minister Narendra Modi's visionary 'Wed in India' movement. As the
              pioneers of India's First Uttarakhand dedicated destination
              wedding portal, We take pride in offering a global platform. Now
              couples from across the world can seamlessly book their dream
              weddings in the heart of Uttarakhand through Shaadivyah.
            </i>
          </div>
          <div className="lg:w-[1250px] lg:h-[266px] hidden md:block pb-20">
            <p class="text-[24px] font-semibold text-white font-Merriweather">Best</p>
            <p class="text-[48px] font-bold text-white font-Merriweather">Wedding Planner</p>
            <p class="text-[48px] font-bold text-white font-Merriweather">
              <span class="text-[24px] font-medium font-Merriweather">in</span> Uttarakhand
            </p>
            <i class="lg:w-[914px] w-[80%] text-center lg:text-[20px] md:text-[20px] text-md text-white mb-4 font-Merriweather-Sans">
              Welcome to Shaadivyah, where we proudly carry forward Prime
              Minister Narendra Modi's visionary 'Wed in India' movement. As the
              pioneers of India's First Uttarakhand dedicated destination
              wedding portal, We take pride in offering a global platform. Now
              couples from across the world can seamlessly book their dream
              weddings in the heart of Uttarakhand through Shaadivyah.
            </i>
          </div>
          <button
            type="submit"
            onClick={handleOpen}
            className="bg-transparent text-white border-white border-2 mt-10 font-bold py-2 px-4 w-[160px] h-[50px] md:w-[234px] md:h-[55px]  rounded-full shadow-xl"
          >
            Contact Us
          </button>
        </div>
      </div>

      {open && <Popup2 onClose={handleClose} />}
    </div>
  );
}

export default ContactUsPhoto;