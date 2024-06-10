"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getDocs, query, collection, orderBy, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import Space25px from "@/components/Space25px";

const DetailPage = () => {
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
            portfolioImagesUrl: values.portfolioImagesUrl ? values.portfolioImagesUrl[0] : {},

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
      <div>
        <div className="relative flex justify-center items-center mb-40">
          <img
            src={data?.bannerImageUrl}
            height={1000}
            width={1000}
            className="w-full rounded-b-[40px] h-[550px] object-cover "
          />

          <div className="absolute -bottom-24 z-10 bg-white justify-center items-center w-[1078px] h-[230px] rounded-xl">
            <div className="flex flex-col justify-between">
              {" "}
              <div className="flex flex-row justify-between mx-16 my-5">
                <div className="flex flex-col justify-start items-start">
                  <div className="text-2xl font-semibold">
                    {data?.businessName}
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <img
                      src={data?.bannerImageUrl}
                      height={1000}
                      width={1000}
                      className="h-4 w-4 text-black-600 "
                    />
                    <div></div>{" "}
                    {data?.googleLocation && (
                      <Link
                        href={data.googleLocation}
                        className="underline text-gray-700"
                      >
                        <p>(View on Map)</p>
                      </Link>
                    )}
                  </div>
                  <div className="text-[#909090]">{data?.about}</div>
                  <button className="flex gap-2 justify-start items-center">
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
                  <div className="h-[40px] w-[80px] rounded-sm bg-[#C9184A] flex justify-center items-center gap-2">
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
              <div className="mt-6 flex justify-center items-center text-[#4A4A4A]">
                <div className="flex gap-5">
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
        <div className="flex justify-between items-start mx-[150px]">
          <div className="w-[46%] flex flex-col gap-6 ">
            <div className="text-3xl font-bold capitalize ">
              {data?.bussinessName}
              <div className="flex justify-between items-center text-sm font-normal text-white">
                <div className="rounded-full flex px-4 py-2 bg-[#FF8FA3]">
                  <img
                    src="/icons/location.svg"
                    height={1000}
                    width={1000}
                    className="h-4 w-4 text-black-600 "
                  />
                  <p>
                    {data?.city}
                    {data?.country}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-[#0A2D23]">{data?.about}</div>
            <div className="bg-cream h-[216px] rounded-sm">
              <p className="border-b-2 border-gray-300 py-4 px-4 text-[22px] text=[#1B1B1B]">
                Areas Available
              </p>
              {Array.isArray(data?.spaces) && data.spaces.length > 0 ? (
                data.spaces.map((space, index) => (
                  <div key={index}>
                    <p>Space Name: {space.spaceName}</p>
                    <p>Floating Capacity: {space.floating}</p>
                    <p>Sitting Capacity: {space.sitting}</p>
                  </div>
                ))
              ) : (
                <div>
                  <p>Space Name: {data?.spaces.spaceName}</p>
                  <p>Floating Capacity: {data?.spaces.floating}</p>
                  <p>Sitting Capacity: {data?.spaces.sitting}</p>
                </div>
              )}
            </div>
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
          <div>FAQ's</div>
        </div>
        {/* Portfolio*/}
        <div className="text-[#4A4A4A] text-[32px] pl-[100px] ">Portfolio</div>
        <Space25px/>
  {data?.portfolioImagesUrl && data.portfolioImagesUrl.length > 0 && (
    <Gallery images={data.portfolioImagesUrl} />
  )}

        <div className="bg-[#CFCCBF80]  h-[50vh] m-[100px]  rounded-md">
          <div className=" flex flex-col p-10 text-[32px] justify-start items-start gap-10">
            <div>Services</div>
            <div className=" flex text-[20px] gap-20">
              <div>Well-being</div>
              <div>Common Areas</div>
              <div>Gastronomy</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start mx-[150px]">
          <div className="w-[46%] flex flex-col gap-6 bg-[#B4D4DF40] p-10 rounded-lg ">
            <div className="text-xl font-bold capitalize ">
              A hotel perfectly located at your destination
              <div className="flex justify-between items-center text-sm font-normal text-white">
                <div className="rounded-full flex px-4 py-2 bg-[#FF8FA3]">
                  <p>Nainital, Uttakhand</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[46%] h-full">
            {data?.googleLocation && (
              <iframe
                src={data.googleLocation}
                width="571"
                height="598"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
          </div>
        </div>
        <FAQ />
      </div>
    </>
  );
};

export default DetailPage;
