import Image from "next/image";
import React from "react";


const UserProfileDetails = ({
  user,
  handleEdit,
  handleSendApproval,
  handleShowRejectionDialog,
  isButtonActive,
  hasSentRequest,
}) => {
  return (
    <>
      
      <div className="w-full max-w-lg  p-6 rounded-lg  space-y-6 font-Merriweather-Sans ">
        {/* Header with Edit button */}
        <div className="flex space-x-10 items-center">
          <div
            className="font-bold text-2xl "
            style={{
              backgroundImage:
                "linear-gradient(180deg, #BE7318 0%, #EED68A 50%, #BE7318 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            ABOUT ME
            <div
              className="w-[170px] h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, #BE7318 0%, #EED68A 50%, #BE7318 100%)",
              }}
            ></div>
          </div>

          <button
            onClick={handleEdit}
            className="border border-[#A11C5C] text-[#A11C5C] text-[14px] rounded-xl w-[49px] pt-[2px] h-[30px] mt-1 cursor-pointer   "
          >
            Edit
          </button>
        </div>

        <div className="">
          {/* <span className=" text-[#A11C5C]">About:</span> */}
          <span className="text-[14px] text-[#4A4A4A]">{user?.about}</span>
        </div>

        {/* User Information */}
        <div className="space-y-5 text-[14px]">
          {/* <p>
            <span className=" text-[#A11C5C]">Name:</span>{" "}
            <span className="text-[#4A4A4A]">{user?.name}</span>
          </p> */}
          <div className="flex w-full max-w-lg  ">
            <div className="flex space-x-2 w-1/2">
              <Image
                src="/icons/profession.svg"
                alt="profession"
                width={1000}
                height={1000}
                className="w-[18px] h-[18px]"
              />
              <p className="font-semibold text-[#A11C5C]">Profession</p>
            </div>
            <div>
              <p className="text-[#4A4A4A]">{user?.businessName}</p>
            </div>
          </div>
          <div className="flex w-full max-w-lg  ">
            <div className="flex space-x-2 w-1/2">
              <Image
                src="/icons/phone.svg"
                alt="profession"
                width={1000}
                height={1000}
                className="w-[18px] h-[18px]"
              />
              <p className="font-semibold text-[#A11C5C]">Phone Number</p>
            </div>
            <div>
              <p className="text-[#4A4A4A]">{user?.phone}</p>
            </div>
          </div>
          <div className="flex w-full max-w-lg  ">
            <div className="flex space-x-2 w-1/2">
              <Image
                src="/icons/address.svg"
                alt="profession"
                width={1000}
                height={1000}
                className="w-[18px] h-[18px]"
              />
              <p className="font-semibold text-[#A11C5C]">Address</p>{" "}
            </div>
            <div>
              <p className="text-[#4A4A4A]">{user?.streetAddress}</p>
            </div>
          </div>
          {/* <p>
            <span className=" text-[#A11C5C]">Landmark</span>{" "}
            <span className="text-[#4A4A4A]">{user?.landmark}</span>
          </p> */}
          {/* <p>
            <span className=" text-[#A11C5C]">Post Code</span>{" "}
            <span className="text-[#4A4A4A]">{user?.postCode}</span>
          </p> */}
          <div className="flex w-full max-w-lg  ">
            <div className="flex space-x-2 w-1/2">
              <Image
                src="/icons/city.svg"
                alt="profession"
                width={1000}
                height={1000}
                className="w-[18px] h-[18px]"
              />
              <p className="font-semibold text-[#A11C5C]">City</p>{" "}
            </div>
            <div>
              <p className="text-[#4A4A4A]">{user?.city}</p>
            </div>
          </div>
          <div className="flex w-full max-w-lg  ">
            <div className="flex space-x-2 w-1/2">
              <Image
                src="/icons/country.svg"
                alt="profession"
                width={1000}
                height={1000}
                className="w-[18px] h-[18px]"
              />
              <p className="font-semibold text-[#A11C5C]">Country</p>{" "}
            </div>
            <div>
              <p className="text-[#4A4A4A]">{user?.country}</p>
            </div>
          </div>

          {/* <p>
            <span className=" text-[#A11C5C]">Alternate Number</span>{" "}
            <span className="text-[#4A4A4A]">{user?.alternateNumber}</span>
          </p> */}
          {/* <p>
            <span className=" text-[#A11C5C]">Aadhaar Card Number</span>{" "}
            <span className="text-[#4A4A4A]">{user?.adharCardNumber}</span>
          </p> */}

          {/* Aadhaar Card Photo */}
          {user?.adharCardPhoto && (
            <div className="flex flex-col mt-4">
              <p className=" text-[#A11C5C]">Aadhaar Card Photo</p>
              <img
                src={user?.adharCardPhoto}
                alt="Aadhaar Card"
                className="mt-2 max-w-xs rounded-lg shadow-sm"
              />
            </div>
          )}

          {/* <p>
            <span className=" text-[#A11C5C]">Pan Card Number:</span>{" "}
            <span className="">{user?.panCardNumber}</span>
          </p>
          <p>
            <span className=" text-[#A11C5C]">GSTIN:</span>{" "}
            <span className="">{user?.GSTIN}</span>
          </p> */}

          {/* Approval Button or Status */}
          {!user?.approval ? (
            <button
              onClick={handleSendApproval}
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, #DD0D63 0%, #A11C5C 100%)",
              }}
              className={`w-full h-12  text-white rounded-lg mt-4 text-[20px] ${
                isButtonActive && !hasSentRequest
                  ? ""
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isButtonActive || hasSentRequest}
            >
              {hasSentRequest ? "Sent For Approval" : "Send Profile Approval"}
            </button>
          ) : (
            <div className="w-[210px] h-12 bg-green-600 rounded-md text-white flex items-center justify-center mt-4 text-[16px] ">
              Profile Approved
            </div>
          )}

          {/* Rejection Reason Button */}
          {user?.rejectionReason && (
            <button
              onClick={handleShowRejectionDialog}
              className="w-full h-12 bg-red-500 text-white rounded-lg mt-4"
            >
              Show Rejection Reason
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfileDetails;
