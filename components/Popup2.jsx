import React from "react";

const Popup2 = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="lg:w-[1100px] lg:h-[636px] mx-4 p-5 rounded-xl border border-[#C9184A] flex justify-between bg-white">
        <div className="hidden lg:block w-[515px] bg-black h-full rounded-l-xl">
          <img src="./images/form.png" alt="" />
        </div>
        <div className="w-[432px]">
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
          <p className="font-medium text-[#02394A] text-[24px] text-start lg:text-[36px]">
            Create Your Dream Day!
          </p>
          <p className="lg:text-[16px] text-[14px] lg:w-[432px]">
            Planning a wedding or a grand celebration? Register now and let's
            make your dream wedding happen at your price!{" "}
          </p>
          <div className="space-y-4 mt-6">
            <input
              className="lg:w-[411px] w-full border border-[#D8E2DC] p-4 rounded-md"
              type="text"
              placeholder="Full Name"
            />
            <input
              className="lg:w-[411px] w-full border border-[#D8E2DC] p-4 rounded-md"
              type="text"
              placeholder="Phone Number"
            />
            <input
              className="lg:w-[411px] w-full border border-[#D8E2DC] p-4 rounded-md"
              type="text"
              placeholder="Email"
            />
            <textarea
              className="lg:w-[411px] w-full border border-[#D8E2DC] p-4 rounded-md"
              placeholder="Your Query (at most 100 words)"
              name=""
              id=""
            ></textarea>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="mt-8 bg-gradient-to-r drop-shadow-md from-[#C9184A] to-[#FFB5A7] text-white font-bold py-2 px-4 w-[234px] h-[55px] rounded-full shadow-xl"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Popup2.displayName = "Popup";

export default Popup2;
