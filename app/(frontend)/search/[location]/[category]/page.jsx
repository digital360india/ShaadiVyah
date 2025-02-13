"use client";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
// import { useRouter } from "next/navigation";
import Hero_2 from "@/components/Hero_2";
import Discription from "@/components/Discription";
import FAQ from "@/components/FAQ";
import ContactUsPhoto from "@/components/ContactUsPhoto";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { MdOutlineStar } from "react-icons/md";
import Link from "next/link";
import MendhiVendorCard from "@/components/MendhiCard";
import MakeupVendorCard from "@/components/MakeupCard";
import PhotographerVendorCard from "@/components/PhotographerVendorCard";
import VenueCard from "@/components/VenuesCard";


const componentMap = {
  makeupvendor: MakeupVendorCard,
  mehandivendors: MendhiVendorCard,
  photographersvendor: PhotographerVendorCard,
  venues: VenueCard,
};

export default function Page(params) {
  const [data, setData] = useState([]);
  const [route, setRoute] = useState("");
  const fetchData = async (params) => {
    try {
      const location = params.params.location;
      const category = params.params.category;
      let collectionName = "";
      switch (category.toLowerCase()) {
        case "makeup":
          collectionName = "makeupvendor";
          setRoute("makeupvendor");
          break;
        case "mehndi":
          collectionName = "mehndivendor";
          setRoute("mehandivendors");
          break;
        case "photographers":
          collectionName = "photographersvendor";
          setRoute("photographersvendor");
          break;
        case "venues":
          collectionName = "venuesvendor";
          setRoute("venues");
          break;
        default:
          collectionName = "venuesvendor";
          setRoute("venues");
      }
      const q = query(
        collection(db, "users"),
        where("city", "==", location || "location", "==", location),
        where("vendorTypeUID", "==", collectionName),
        where("approval", "==", true)
      );
      console.log(params.params);
      const querySnapshot = await getDocs(q);
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(fetchedData);
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    fetchData(params);
  }, []);
  const truncateText = (text, limit) => {
    if (text === undefined) {
      return ""; // Or any other fallback value you prefer
    }

    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  console.log(data, " data");

  const VendorComponent = componentMap[route] || MendhiVendorCard;

  return (
    <div>
      <Hero_2
        img={"/images/hero_services_page.png"}
        text={`${params.params.category} vendors in ${params.params.location}`}
      />
      {/* dropdown */}
      <div className=" xl:gap-10 lg:gap-4 xl:pl-[100px] lg:pl-[20px] bg-[#F7FEFD]  h-[80px] mt-6 hidden lg:flex  ">
        {/* <div>
          <select
            className="text-[24px] font-semibold text-[#02394A] w-[131px] py-[14px]"
            name="Locality"
            id=""
          >
            <option className="" value="">
              Locality
            </option>
            <option className="" value="">
              Locality
            </option>
            <option className="" value="">
              Locality
            </option>
            <option className="" value="">
              Locality
            </option>
          </select>
        </div>
        <div>
          <select
            className="text-[24px] font-semibold text-[#02394A] w-[193px] py-[14px]"
            name="Locality"
            id=""
          >
            <option className="" value="">
              No. of Guests
            </option>
            <option className="" value="">
              Locality
            </option>
            <option className="" value="">
              Locality
            </option>
            <option className="" value="">
              Locality
            </option>
          </select>
        </div>
        <div>
          <select
            className="text-[24px] font-semibold text-[#02394A] w-[171px] py-[14px]"
            name="Locality"
            id=""
          >
            <option className="" value="">
              Venue Type
            </option>
            <option className="" value="">
              Locality
            </option>
            <option className="" value="">
              Locality
            </option>
            <option className="" value="">
              Locality
            </option>
          </select>
        </div>
        <div>
          <select
            className="text-[24px] font-semibold text-[#02394A] w-[203px] py-[14px]"
            name="Locality"
            id=""
          >
            <option className="" value="">
              Price Per Plate
            </option>
            <option className="" value="">
              Locality
            </option>
            <option className="" value="">
              Locality
            </option>
            <option className="" value="">
              Locality
            </option>
          </select>
        </div> */}
        {/* <div className="xl:w-[345px] h-[48px] bg-[#ECEEED] mt-[6px] xl:ml-16 rounded-md ">
          <div className="flex gap-3 pl-4 py-2">
            <div className="mt-2">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#CCCCCC"
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
                />
              </svg>
            </div>
            <input
              type="search"
              className="bg-[#ECEEED] placeholder:text-black text-[14px]"
              placeholder="Search Wedding Venues"
            />
          </div>
        </div> */}
      </div>
      {/* dropdown */}
      {/* heading */}
      <div className="xl:px-[100px] lg:px-[50px] md:px-[50px] px-6 mt-[30px] lg:mt-0">
        <div className="flex justify-between items-center">
          <h1 className="text-[#C9184A] md:text-[48px] text-[34px] font-semibold">
            {params.params.category} vendors in {params.params.location}
          </h1>
          {/* 
          <div className="hidden lg:block">
            <select
              className="text-[18px] font-semibold text-[#C9184A] border border-[#C9184A] w-[256px] rounded-md py-[12px]"
              name="Locality"
              id=""
            >
              <option className="" value="">
                Nanital
              </option>
              <option className="" value="">
                Locality
              </option>
              <option className="" value="">
                Locality
              </option>
              <option className="" value="">
                Locality
              </option>
            </select>
          </div> */}
        </div>
        <p className="text-[#C9184A] text-[18px] mb-4">
          Showing {data.length} results as per your search criteria
        </p>
      </div>
      {/* heading */}
      {/* search  */}
      {/* <div className="md:w-[345px] w-[236px] mx-6 h-[48px] bg-[#ECEEED] mt-6 xl:ml-16 rounded-md lg:hidden md:mx-[50px] mb-8">
        <div className="flex gap-3 pl-4 py-2">
          <div className="mt-2">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#CCCCCC"
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
              />
            </svg>
          </div>
          <input
            type="search"
            className="bg-[#ECEEED] placeholder:text-black text-[14px]"
            placeholder="Search Wedding Venues"
          />
        </div>
      </div> */}
      {/* search  */}
      {/* cards */}
      <div className="xl:mt-16 lg:mt-8  ">
        <div className="bg-cream py-16 relative z-20  px-10 ">
          <img
            src={"/vectors/vector2.png"}
            alt="image"
            height={1000}
            width={1000}
            className=" md:w-[769px] md:h-[471px] w-[400px] h-[300px]    absolute lg:-top-[100px] lg:right-[140px] -top-8 p-4 -z-10 opacity-20 "
          />
          <div className=" md:flex flex-wrap   ">
            {" "}
            {data.map((arr, index) => (
              <Link
                href={`/${route}/${arr.uid}`}
                key={index}
                className=" py-4 px-4 "
              >
                <VendorComponent arr={arr} />

           {/*     <div className="bg-white rounded  shadow-md lg:h-[488px] lg:w-[398px] ">
                  <img
                    src={arr.bannerImageUrl || "/logo.png"}
                    alt={arr.businessName}
                    className="w-full h-60 object-cover mt-2 rounded-t-[4px]"
                  />
                  <div className=" px-6 py-4 ">
                    {" "}
                    <div className="flex justify-between items-center h-[30px]">
                      {" "}
                      <h3 className="lg:text-xl font-semibold my-6 pt-4">
                        {arr.businessName}
                      </h3>
                    </div>
                    <div className="flex justify-between gap-2 pt-4">
                      <img src="/icons/locationred.svg" />
                      <p className="text-[18px] text-[#666666]">
                        {arr.location}
                      </p>
                      <p className="flex justify-end items-center mb-2  gap-0">
                        {" "}
                        <p className="text-pink mt-1  ">
                          {" "}
                          {arr.averageRating?.toFixed(2) || 3}{" "}
                        </p>{" "}
                        <p>
                          <MdOutlineStar className="text-yellow-300 text-xl " />
                        </p>
                      </p>{" "}
                    </div>
                     <p className="text-sm py-4 h-[68px">
                      {" "}
                      {truncateText(arr.about, 20)}
                    </p>  */}
                    {/* <div className="flex justify-between">
                      <div className="bg-[#dad9d9]  py-2 px-3 rounded-md  ">
                        <p className="text-[#333333] lg:lg:text-sm text-[10px]">
                          100-200 pax
                        </p>
                      </div>
                      <div className="bg-[#dad9d9] py-2 px-3 rounded-md  ">
                        <p className="text-[#333333] lg:text-sm text-[10px]">
                          32 rooms
                        </p>
                      </div>{" "}
                      <div className="bg-[#dad9d9] py-2 px-3 rounded-md  ">
                        <p className="text-[#333333] lg:text-sm text-[10px]">
                          32 rooms
                        </p>
                      </div>
                    </div>  
                  </div>
                </div>*/}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20">
        <ContactUsPhoto />
      </div>
      {/* description */}
      <div>
        <Discription />
      </div>
      {/* FAQ */}
      <div>
        <FAQ />
      </div>
    </div>
  );
}
