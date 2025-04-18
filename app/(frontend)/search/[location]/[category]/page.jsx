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
  const [loading, setLoading] = useState(true);

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

      // console.log("Query Parameters:", { location, collectionName });

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

      console.log(fetchedData, "Fetched Data");
      setData(fetchedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(params);
  }, [params]);

  console.log(data[0], " data");

  // useEffect(() => {
  //   console.log("Updated Data:", data);
  // }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data.length === 0) {
    return <p>No data available</p>;
  }

  const VendorComponent = componentMap[route] || MendhiVendorCard;

  return (
    <div>
      <Hero_2
        img={"/images/hero_services_page.png"}
        text={`${params.params.category} vendors in ${params.params.location}`}
      />

      <div className=" xl:gap-10 lg:gap-4 xl:pl-[100px] lg:pl-[20px] bg-[#F7FEFD]  h-[80px] mt-6 hidden lg:flex  "></div>

      <div className="xl:px-[100px] lg:px-[50px] md:px-[50px] px-6 mt-[30px] lg:mt-0">
        <div className="flex justify-between items-center">
          <h1 className="text-[#C9184A] md:text-[48px] text-[34px] font-semibold">
            {params.params.category} vendors in {params.params.location}
          </h1>
        </div>
        <p className="text-[#C9184A] text-[18px] mb-4">
          Showing {data.length} results as per your search criteria
        </p>
      </div>

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
