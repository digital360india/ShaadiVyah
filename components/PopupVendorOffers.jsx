"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const PopupVendorOffers = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
    }, 360000);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-10">
          <Link href={"/register"}>
            {" "}
            <img
              src="./images/vendorjoinimage.png"
              alt=""
              className=" bg-black lg:h-[636px] rounded-l-xl"
            />
          </Link>
          <div className="absolute top-6 right-6">
            <p className="flex justify-end">
              <svg
                onClick={handleClose}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 32"
                className="cursor-pointer"
              >
                <g fill="red">
                  <path d="M23.686 8.314a1.5 1.5 0 0 0-2.122 0L16 13.88l-5.564-5.565a1.5 1.5 0 0 0-2.122 2.122L13.88 16l-5.565 5.564a1.5 1.5 0 0 0 2.122 2.122L16 18.12l5.564 5.565a1.5 1.5 0 0 0 2.122-2.122L18.12 16l5.565-5.564a1.5 1.5 0 0 0 0-2.122" />
                  <path d="M6 1a5 5 0 0 0-5 5v20a5 5 0 0 0 5 5h20a5 5 0 0 0 5-5V6a5 5 0 0 0-5-5zM3 6a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" />
                </g>
              </svg>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupVendorOffers;
