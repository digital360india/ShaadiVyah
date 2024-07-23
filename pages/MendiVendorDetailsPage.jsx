"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getDocs, query, collection, orderBy, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import Space25px from "@/components/Space25px";
import { FaRupeeSign } from "react-icons/fa";
import { MdCheckCircle, MdCancel } from 'react-icons/md';
import { SlCalender } from "react-icons/sl"; 
import Review from "@/components/Review";

const MendiVendorDetailsPage = () => {
  const currentPage = usePathname();
  const pathArray = currentPage.split("/");
  const uniqueID = pathArray[pathArray.length - 1];

  const [isCopied, setIsCopied] = useState(false);

  const [data, setData] = useState();

  useEffect(() => {
    const fetchRoutineData = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("uid", "==", uniqueID))
      );
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => {
          const values = doc.data();

          return {
            name: values.name,
            spaces: values.spaces,
            portfolioImagesUrl: values.portfolioImagesUrl
              ? values.portfolioImagesUrl[0]
              : {},
              advancePayment: values.advancePayment,
            bridalMehendi: values.bridalMehendi,
            familyMehendi: values.familyMehendi,
            outstationTravel:values.outstationTravel,
            practicingSince: values.practicingSince,
            uid: values.uid,
            streetAddress: values.streetAddress,
            landmark: values.landmark,
            postCode: values.postCode,
            city: values.city,
            country: values.country,
            about: values.about,
            phoneNumber: values.phone,
            alternateNumber: values.alternateNumber,
            instagram: values.instagram,
            facebook: values.facebook,
            twitter: values.twitter,
            title: values.title,
            travelsToVenue: values.travelsToVenue,
            id: values.id,
            googleLocation: values.googleLocation,
            businessName: values.businessName,
            description: values.description,
            bannerImageUrl: values.bannerImageUrl,
            portfolioImagesUrl: values.venueLinks,
          };
        });
        console.log(data);
        setData(data[0]);
      }
    };
    fetchRoutineData();
  }, []);
  const handleShare = async () => {
    const siteUrl = window.location.href;
    navigator.clipboard
      .writeText(siteUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      <div className="overflow-x-hidden">
        <div className="relative flex justify-center items-center mb-40">
          <img
            src={data?.bannerImageUrl}
            height={1000}
            width={1000}
            className="w-full rounded-b-[40px] h-[550px] object-cover "
          />

<div className="absolute lg:-bottom-32 md:-bottom-20 -bottom-16 z-10 border  bg-[#FFFFFF] justify-center items-center xl:w-[1078px] lg:w-[900px] w-[342px] sm:w-[600px] md:w-[650px]  rounded-xl">
<div className="flex flex-col justify-between">
              {" "}
              <div className="flex flex-row justify-between lg:mx-16 md:mx-10 mx-4 my-5">
                <div className="flex flex-col justify-start items-start">
                <div className="lg:text-2xl text-[18px] font-semibold text-[#4A4A4A]">
                {data?.businessName}
                  </div>
                  <div className="flex gap-2 justify-start items-center mt-[10px]">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="black"
                          d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
                        />
                      </svg>
                    </div>

                    <div className="flex gap-2 text-[14px] md:text-[16px]">
                      <p>{data?.city},</p>
                      {data?.country}
                    </div>
                    {data?.googleLocation && (
                      <Link
                        href={data?.googleLocation}
                        className="underline text-gray-700"
                      >
                        <p className="text-[#909090] text-[10px] md:text-[14px]">(View on Map)</p>
                        </Link>
                    )}
                  </div>
                  <div className="text-[#909090] text-sm mt-[4px] hidden sm:block">
                    {data?.about}
                  </div>
                  <button className="flex gap-2 justify-start items-center mt-[10px]">
                    <img
                      src="/icons/call.svg"
                      height={1000}
                      width={1000}
                      className="md:h-4 md:w-4 h-3 w-3 text-black-600 "
                    />
                    <div className="text-green-700 text-[10px] md:text-[16px] ">Contact</div>{" "}
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                  {" "}
                  <div className="md:h-[40px] md:w-[80px] w-[48px] h-[30px]  rounded-sm bg-[#C9184A] flex justify-center items-center gap-2">
                    <img
                      src="/icons/ratingstar.svg"
                      height={1000}
                      width={1000}
                      className="md:h-4 md:w-4 h-3 w-3 text-black-600 "
                    />{" "}
                    <p className=" text-[12px] md:text-[16px] text-white">4.5</p>
                    </div>
                    <div className="flex justify-center items-center gap-2 text-[10px] md:text-[16px]text-[#909090]">
                    <p>19</p>
                    <p>Reviews</p>
                  </div>
                </div>
              </div>
              <div className=" py-3 lg:flex  bg-[#FBFBFB] hidden justify-center items-center text-sm rounded-xl  text-[#4A4A4A]">
                <div className="flex gap-12">
                  {" "}
                  <a href="#photos">
                    {" "}
                    <div className="flex gap-2 justify-center items-center">
                      {" "}
                      <img
                        src="/icons/image.svg"
                        height={1000}
                        width={1000}
                        className="h-4 w-4 text-black-600 "
                      />{" "}
                      <p>Photos</p>{" "}
                    </div>{" "}
                  </a>
                  <div className="h-8 border-l border-gray-600"></div>
                  <div className="flex gap-2 justify-center items-center">
                    {" "}
                    <img
                      src="/icons/like.svg"
                      height={1000}
                      width={1000}
                      className="h-4 w-4 text-black-600 "
                    />
                    <p>Shortlist</p>
                  </div>
                  <div className="h-8 border-l border-gray-600"></div>
                  <div className="flex gap-2 justify-center items-center">
                    {" "}
                    <img
                      src="/icons/review_icon.svg"
                      height={1000}
                      width={1000}
                      className="h-4 w-4 text-black-600 "
                    />
                    <p> Write a Review</p>
                  </div>
                  <div className="h-8 border-l border-gray-600"></div>
                  <button
                    className="flex gap-2 justify-center items-center"
                    onClick={handleShare}
                  >
                    <img
                      src="/icons/share.svg"
                      alt="Share icon"
                      className="h-8 w-4 text-black-600"
                    />
                    <p>Share</p>
                  </button>
                  {isCopied && (
                    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-md shadow-md">
                      Link copied to clipboard!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:flex space-y-6 justify-between items-start   xl:mx-[100px] lg:mx-[80px] md:mx-[60px] mx-6">
        <div className="lg:w-[46%] flex flex-col gap-10 ">
        <div className="md:text-3xl text-2xl -mt-20 md:-mt-10 lg:-mt-0 font-semibold text-[#4A4A4A] capitalize ">
              {data?.businessName}
              <div className="flex  justify-between items-center text-sm font-normal text-white mt-5">
                <div className="rounded-full flex gap-2  px-4 py-2 bg-[#FF8FA3]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
                    />
                  </svg>

                  <p>{data?.city},</p>
                  {data?.country || "India"}
                </div>
              </div>
            </div>

            <div className="text-[#0A2D23] ">{data?.about}</div>
            {/* <div className="bg-[#FFB5A71A] py-3 w-[720px] rounded-xl shadow-lg">
              <p className="border-b-2 border-gray-300  px-5 py-3  text-[22px] text=[#1B1B1B]">
                Areas Available
              </p>
              <div className="flex flex-wrap gap-10">
                <div className="flex mt-5 gap-6 px-5">
                  <div className="flex flex-warp gap-10 ">
                    {Array.isArray(data?.spaces) && data.spaces.length > 0 ? (
                      data.spaces.map((space, index) => {
                        const spaceType = spaceTypes.find(
                          (type) => type.id === space.spaceType
                        );
                        return (
                          <div key={index} className="flex gap-2 ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="40"
                              height="40"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#C9184A"
                                fill-rule="evenodd"
                                d="M8.905 4.25h6.19c.838 0 1.372 0 1.832.091a4.75 4.75 0 0 1 3.732 3.732l-.736.147l.736-.147c.07.35.086.743.09 1.28A2.751 2.751 0 0 1 22.75 12v2.444c0 1.53-.798 2.874-2 3.637V19a.75.75 0 0 1-1.5 0v-.325c-.261.05-.53.075-.806.075H5.556c-.276 0-.545-.026-.806-.075V19a.75.75 0 0 1-1.5 0v-.919a4.302 4.302 0 0 1-2-3.636V12c0-1.26.846-2.32 2.001-2.647c.004-.537.02-.93.09-1.28a4.75 4.75 0 0 1 3.732-3.732c.46-.091.994-.091 1.832-.091M4.752 9.354A2.751 2.751 0 0 1 6.75 12v1.2c0 .028.022.05.05.05h10.4a.05.05 0 0 0 .05-.05V12c0-1.258.845-2.319 1.998-2.646c-.004-.51-.017-.77-.06-.988a3.25 3.25 0 0 0-2.554-2.554c-.296-.058-.669-.062-1.634-.062H9c-.965 0-1.338.004-1.634.062a3.25 3.25 0 0 0-2.554 2.554c-.043.218-.056.479-.06.988M4 10.75c-.69 0-1.25.56-1.25 1.25v2.444a2.806 2.806 0 0 0 2.806 2.806h12.888a2.806 2.806 0 0 0 2.806-2.806V12a1.25 1.25 0 0 0-2.5 0v1.2a1.55 1.55 0 0 1-1.55 1.55H6.8a1.55 1.55 0 0 1-1.55-1.55V12c0-.69-.56-1.25-1.25-1.25"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <div>
                              {" "}
                              <p className="text-pink">
                                {spaceType ? spaceType.name : "Unknown"}
                              </p>
                              <p className="text-md">{space.spaceName}</p>
                              <p className="text-sm">
                                Floating Capacity: {space.floating}
                              </p>
                              <p className="text-sm">
                                {" "}
                                Sitting Capacity: {space.sitting}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div>
                        <div className="flex gap-2">
                          <p>{data?.spaces?.sitting || "N/A"} Seating</p>
                          <p>|</p>
                          <p> {data?.spaces?.floating || "N/A"} Floating</p>
                        </div>
                        <p className="text-[#C9184A] text-[14px]">
                          {data?.spaces?.spaceName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="xl:px-20 md:px-10 xl:py-10 px-5 py-5 flex justify-center items-center flex-col rounded-md bg-[#FFB5A71A] border-[#FEC5BB] border-2 gap-3">
            <p className="">{data?.bussinessName}</p>
            <form className="max-w-sm ">
              <input
                type="text"
                className="w-full h-12 px-4 my-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Full Name*"
                required
              />
              <input
                type="tel"
                className="w-full h-12 px-4 my-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Phone Number*"
                required
              />
              <input
                type="email"
                className="w-full h-12 px-4 my-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Email*"
                required
              />

              <div className="flex justify-between items-center">
                <p className="mr-2">Notify me on Whatsapp</p>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="whatsappToggle"
                    className="sr-only"
                  />
                  <label
                    htmlFor="whatsappToggle"
                    className="block w-10 h-6 bg-gray-300 rounded-full cursor-pointer"
                  >
                    <div className="absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out"></div>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-12 mt-4 text-white bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] rounded-md"
              >
                Check Availability and Prices
              </button>
            </form>
          </div>
        </div>

        <div className="m-20 md:flex justify-center items-center gap-10  text-[#0A2D23] text-[18px] hidden ">
          <div>Portfolio</div>
          <a href="#services">Services</a>
          <div>Location</div>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ&apos;s</a>
        </div>
        {/* Portfolio*/}
        <div className=" lg:pl-[100px] md:mx-[60px] mx-6  ">
          <p className="text-[#4A4A4A] font-semibold text-[32px] mt-10 md:mt-0" id="photos">
            Portfolio
          </p>
        </div>
        <Space25px />
        {data?.portfolioImagesUrl && data.portfolioImagesUrl.length > 0 && (
          <Gallery images={data.portfolioImagesUrl} />
        )}

<div className="bg-[#CFCCBF80] p-8 md:p-16  m-6 xl:mx-[100px] lg:mx-[80px]  rounded-2xl text-[#0A2D23]">
<div className="flex flex-col text-[32px] gap-4 md:gap-10">
            <div id="services">
              <p className="text-[42px] font-medium">Information</p>
            </div>
            <div className="flex flex-wrap gap-8 lg:flex-row text-[20px] md:justify-between ">
              <div className="space-y-4  w-[250px]  ">
                <p className="md:text-[22px] text-[18px] font-medium">Charges</p>
                <div className="text-[14px] font-semibold ">
                  <ul className="list-disc list-inside items-start flex flex-col  space-y-3">
                    <li className="text-gray-700 flex gap-1 justify-center items-center">
                      <p>Bridal Mendhi : </p>
                      <FaRupeeSign className="text-sm" />
                      <p>{data?.bridalMehendi}</p>
                    </li>
                    <li className="text-gray-700 flex gap-1 justify-center items-center">
                      <p>Family Mehndi : </p>
                      <FaRupeeSign className="text-sm" />
                      <p>{data?.familyMehendi}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4  w-[250px] ">
                <p className="md:text-[22px] text-[18px] font-medium">Travels to Venue</p>
                <ul className="list-disc list-inside text-[14px] font-semibold space-y-3 ">
                  <li className="text-gray-700 flex gap-1 justify-start items-center">
                    {data?.travelsToVenue ? (
                      <MdCheckCircle className="text-green-500" />
                    ) : (
                      <MdCancel className="text-red-500" />
                    )}
                    <p>
                      {data?.travelsToVenue
                        ? "Yes, travels to venue available"
                        : "No, does not travel to venue"}
                    </p>
                  </li>
                  <li className="text-gray-700 flex gap-1 justify-start items-center">
                    {data?.outstationTravel ? (
                      <MdCheckCircle className="text-green-500" />
                    ) : (
                      <MdCheckCircle className="text-red-500" />
                    )}
                    <p>
                      {data?.outstationTravel
                        ? "Travel paid by client"
                        : "Travel paid by self"}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="space-y-4  w-[250px] ">
                <p className="md:text-[22px] text-[18px] font-medium">Practicing Since</p>
                <ul className="list-disc list-inside items-start space-y-3">
                    <li className="text-gray-700 flex gap-1 text-[14px] font-semibold ">
                      <p>Practicing Since : </p>
                      <SlCalender className="text-sm" />
                      <p>{data?.practicingSince}</p>
                    </li>
               
                  </ul>
              </div>
              <div className="space-y-4  w-[250px] ">
                <p className="md:text-[22px] text-[18px] font-medium">Advance Payment</p>
                <ul className="list-disc list-inside text-[14px] font-semibold space-y-3 ">
                <li className="text-gray-700 flex gap-1 ">
                      <p>Advance Payment : </p>
   
                      <p>{data?.advancePayment}</p><p>%</p>
                    </li>
                </ul>
              </div>
    
            </div>
          </div>
        </div>
        <div id="reviews">
          <Review id={uniqueID} title={data?.businessName} />
        </div>

        <div id="faq">
        <FAQ faqData={vendorsFAQs} />
        </div>
      </div>
    </> 
  );
};

export default MendiVendorDetailsPage;
