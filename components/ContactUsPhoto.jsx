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
        <div className="parallax h-[400px] w-full flex flex-col items-center justify-center" style={{ backgroundImage: 'url(/images/venues_contactus1.svg)' }}>
          <i className="lg:w-[914px] w-[80%] text-center lg:text-2xl md:text-xl text-md text-white mb-4">
            “Ready to Turn your dream wedding into reality? Contact us today and
            let&apos;s start planning your perfect days!”
          </i>
          <button
            type="submit"
            onClick={handleOpen}
            className="bg-transparent text-white border-white border-2 font-bold py-2 px-4 w-[160px] h-[50px] md:w-[234px] md:h-[55px] rounded-full shadow-xl"
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