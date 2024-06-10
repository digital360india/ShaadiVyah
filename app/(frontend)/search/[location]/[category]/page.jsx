"use client";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import Hero_2 from "@/components/Hero_2";
import Discription from "@/components/Discription";
import FAQ from "@/components/FAQ";

export default function Page(params) {
  const [data, setData] = useState([]);
  const router = useRouter();

  const fetchData = async (params) => {
    try {
      const location = params.params.location;
      const category = params.params.category;
      let collectionName = "";
      let route = "";
      switch (category.toLowerCase()) {
        case "makeup":
          collectionName = "makeupvendor";
          route = "makeupvendor";
          break;
        case "photographers":
          collectionName = "photographersvendor";
          route = "photographersvendor";
          break;
        case "venues":
          collectionName = "venuesvendor";
          route = "venues";
          break;
        default:
          collectionName = "venuesvendor";
          route = "venues";
      }
      const q = query(
        collection(db, "users"),
        where("city", "==", location && "vendorTypeUID", "==", collectionName),
      );

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
  return (
    <div>
      <Hero_2 img={"/images/hero_services_page.png"} text={"Lorem ipsum d"} />
      {/* dropdown */}
      <div className=" xl:gap-10 lg:gap-4 xl:pl-[100px] lg:pl-[20px] bg-[#F7FEFD]  h-[80px] mt-6 hidden lg:flex  ">
        <div>
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
        </div>
        <div className="xl:w-[345px] h-[48px] bg-[#ECEEED] mt-[6px] xl:ml-16 rounded-md ">
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
        </div>
      </div>
      {/* dropdown */}
      {/* heading */}
      <div className="xl:px-[100px] lg:px-[50px] md:px-[50px] px-6 mt-[30px] lg:mt-0">
        <div className="flex justify-between items-center">
          <h1 className="text-[#C9184A] md:text-[48px] text-[34px] font-semibold">
            Wedding Destinations in Nainital
          </h1>
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
          </div>
        </div>
        <p className="text-[#C9184A] text-[18px]">
          Showing 54 results as per your search criteria
        </p>
      </div>
      {/* heading */}
      {/* search  */}
      <div className="md:w-[345px] w-[236px] mx-6 h-[48px] bg-[#ECEEED] mt-6 xl:ml-16 rounded-md lg:hidden md:mx-[50px] mb-8">
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
      </div>
      {/* search  */}
      {/* cards */}
      <div className="xl:mt-16 lg:mt-8"></div>
      {/* cards */}
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
