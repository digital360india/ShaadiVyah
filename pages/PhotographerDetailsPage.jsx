"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getDocs, query, collection, orderBy, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import Space25px from "@/components/Space25px";
import Review from "@/components/Review";

const PhotographerDetailsPage = () => {
  const currentPage = usePathname();
  const pathArray = currentPage.split("/");
  const uniqueID = pathArray[pathArray.length - 1];

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
            spaces: values.spaces ? values.spaces[0] : {},
            portfolioImagesUrl: values.portfolioImagesUrl
              ? values.portfolioImagesUrl[0]
              : {},

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
  return (
    <>
      <div className="overflow-x-hidden">
        <div className="relative flex justify-center items-center mb-40">
          <img
            src={data?.bannerImageUrl}
            className="w-full rounded-b-[40px] h-[550px] object-cover "
          />

          <div className="absolute -bottom-28 z-10 border  bg-[#FFFFFF] justify-center items-center w-[1078px]  rounded-xl">
            <div className="flex flex-col justify-between">
              {" "}
              <div className="flex flex-row justify-between mx-16 my-5">
                <div className="flex flex-col   justify-start items-start">
                  <div className="text-2xl font-semibold text-[#4A4A4A]">
                    {data?.businessName}
                  </div>
                  <div className="flex gap-2 justify-start items-center mt-[10px]">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="black" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"/></svg>
                    </div>
                    <div></div>{" "}
                    {data?.googleLocation && (
                      <p>
                        {data?.city} , &nbsp;
                        {data?.country} &nbsp;
                        <Link
                          href={data.googleLocation}
                          className="underline text-[#909090] text-[14px]"
                        >
                          (View on Map)
                        </Link>
                      </p>
                    )}
                  </div>
                  <div className="text-[#909090] text-sm mt-[4px]">{data?.about}</div>
                  <button className="flex gap-2 justify-start items-center mt-[10px]">
                    <img
                      src="/icons/call.svg"
                      height={1000}
                      width={1000}
                      className="h-4 w-4 text-black-600 "
                    />
                    <div className="text-green-700">Contact</div>{" "}
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {" "}
                  <div className="h-[40px] w-[80px] rounded-sm bg-[#5BA829] flex justify-center items-center gap-2">
                    <img
                      src="/icons/ratingstar.svg"
                      height={1000}
                      width={1000}
                      className="h-4 w-4 text-black-600 "
                    />{" "}
                    <p className="mt-1 text-white">4.5</p>
                  </div>
                  <div className="flex justify-center items-center gap-2 text-[13px] text-[#909090]">
                    <p>19</p>
                    <p>Reviews</p>
                  </div>
                </div>
              </div>
              <div className=" py-3 flex  bg-[#FBFBFB] justify-center items-center text-sm rounded-xl  text-[#4A4A4A]">
                <div className="flex gap-12">
                  <div className="flex gap-2 justify-center items-center">
                    {" "}
                    <img
                      src="/icons/image.svg"
                      height={1000}
                      width={1000}
                      className="h-4 w-4 text-black-600 "
                    />{" "}
                    <p>Photos</p>
                  </div>{" "}
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
                  <div className="flex gap-2 justify-center items-center">
                    {" "}
                    <img
                      src="/icons/share.svg"
                      height={1000}
                      width={1000}
                      className="h-8 w-4 text-black-600 "
                    />{" "}
                    <p>Share</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="flex justify-between items-start  mx-[100px]">
          <div className="w-[46%] flex flex-col gap-10 ">
            <div className="text-3xl font-semibold text-[#4A4A4A] capitalize ">
              {data?.businessName}
              <div className="flex  justify-between items-center text-sm font-normal text-black mt-5 ">
                <div className="rounded-full flex gap-2  px-4 py-2 bg-[#C7F1C5]">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="black" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"/></svg>
                    </div>
                  <p>
                    {data?.city} ,&nbsp;
                    {data?.country}
                  </p>
                </div>
                <div className="flex">
                  <p className="text-[18px] font-semibold text-[#0A2D23]">4.5 <span className="text-[15px]">(1887 comentários)</span></p>

                </div>
              </div>
            </div>

            <div className="text-[#0A2D23]">{data?.about}</div>
          </div>
          <div className="px-20 py-10 flex justify-center items-center flex-col rounded-md bg-[#FFB5A71A] border-[#FEC5BB] border-2 gap-3">
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
              <input
                type="text"
                className="w-full h-12 px-4 my-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Function Name*"
                required
              />
              <textarea
                className="w-full h-32 px-4 py-2 my-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Function Details (at most 100 words)*"
                required
              ></textarea>
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

        <div className="m-20 flex justify-center items-center gap-10  text-[#0A2D23] text-[18px]">
          <div>Portfolio</div>
          <div>Services</div>
          <div>Location</div>
          <div>Reviews</div>
          <div>FAQ&apos;s</div>
        </div>
        {/* Portfolio*/}
        <div className=" pl-[100px] "><p className="text-[#4A4A4A] font-semibold text-[32px]">Portfolio</p></div>
        <Space25px />
        {data?.portfolioImagesUrl && data.portfolioImagesUrl.length > 0 && (
          <Gallery images={data.portfolioImagesUrl} />
        )}

<div className="bg-[#CFCCBF80]  p-16 m-[100px]  rounded-2xl text-[#0A2D23]">
          <div className=" flex flex-col  text-[32px] justify-start items-start gap-10">
            <div><p className="text-[42px] font-medium ">Services</p></div>
            <div className=" flex text-[20px] gap-60">
              <div className="space-y-4"><p className="text-[22px] font-medium">Well-being</p>
              <div className="text-[14px] font-semibold space-y-3">
                <p>Pool</p>
                <p>play Room</p>
                <p>Kid Space</p>

              </div>
              </div>
              <div className="space-y-4"><p className="text-[22px] font-medium">Common Areas</p>
              <div>
              <div className="text-[14px] font-semibold space-y-3">
                <p>Pool</p>
                <p>play Room</p>
                <p>Kid Space</p>

              </div>
                            </div>
              </div>
              <div className="space-y-4"><p className="text-[22px] font-medium">Gastronomy</p>
              <div>
              <div className="text-[14px] font-semibold space-y-3">
                <p>Pool</p>
                <p>play Room</p>
                <p>Kid Space</p>

              </div>
                            </div>
              </div>
            </div>
          </div>
        </div>
        <Review />
        <FAQ />
      </div>
    </>
  );
};

export default PhotographerDetailsPage;
