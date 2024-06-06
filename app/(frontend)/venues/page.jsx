"use client";
import ContactUSPhoto from "@/components/ContactUSPhoto";
import DestinationCard from "@/components/DestinationCard";
import Discription from "@/components/Discription";
import FAQ from "@/components/FAQ";
import HeadingsVenueSection from "@/components/HeadingsVenueSection";
import Hero_2 from "@/components/Hero_2";
import Space25px from "@/components/Space25px";
import Space50px from "@/components/Space50px";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "@/firebase/firebase"; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

// import ContactUSPhoto from "@/components/ContactUSPhoto";

const Page = () => {
  // const [venues, setVenues] = useState([]);

  // useEffect(() => {
  //   const fetchVenues = async () => {
  //     try {
  //       const q = query(
  //         collection(db, "users"),
  //         where("vendorTypeUID", "==", "venuesvendor")
  //       );
  //       const venuesSnapshot = await getDocs(q);
  //       const venuesList = venuesSnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setVenues(venuesList);
  //     } catch (error) {
  //       console.error("Error fetching venues: ", error);
  //     }
  //   };

  //   fetchVenues();
  // }, []);

      // Custom Next Arrow Component
const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow custom-next-arrow`}
    style={{ ...style, display: "block", background: "pink" , }}
    onClick={onClick}
  />
);

// Custom Prev Arrow Component
const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow custom-prev-arrow`}
    style={{ ...style, display: "block", background: "pink" }}
    onClick={onClick}
  />
);
  const [venue, setVenues] = useState([]);
  

  const fetchVenue = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("vendorTypeUID", "==", "venuesvendor")
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(data);
        setVenues(data);
      }
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };


  useEffect(() => {
    fetchVenue();
    
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    //   centerMode: true,
    // centerPadding: "100px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1440, // xl
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1324, // lg
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };


  return (
    <>
      <Hero_2
        img={"/images/venus_page.png"}
        text={"Lorem ipsum dolor sit amet consectetur."}
      />
      <Space50px />
      <HeadingsVenueSection text1={"Weddings"} text2={"Destinations"} />
      <Space25px />
      <div className="flex justify-center items-center px-6 gap-8">
        {/* Place any additional content here if needed */}
      </div>
      <Space25px />
      {/* <HeadingsVenueSection text1={"Popular"} text2={"Destinations"} /> */}
      {/* <DestinationCard venues={venues} /> */}
      {/* <Space50px />
      <Space50px /> */}
      <div className=" py-16  relative  z-20 lg:px-10 px-6 ">
          
        <div className="">
          <p className="md:text-3xl text-[32px] font-semibold text-pink font-fira-sans p-4">
            Popular <span className="font-dancing-script">Destinations</span>
          </p>
          <div className="px-[15px] ">
            {venue.length > 0 ? (
              <Slider
                {...sliderSettings}
               
              >
                {venue.map((arr, index) => (
                  <Link
                    href={`/venues/${arr.uid}`}
                    key={index}
                    className=" py-4 px-4 "
                  >
                    <div className="bg-white rounded  shadow-md lg:h-[488px] lg:w-[398px] ">
                      <img
                        src={arr.bannerImageUrl}
                        alt={arr.businessName}
                        className="w-full h-60 object-cover mt-2 rounded-t-[4px]"
                      />
                      <div className=" px-6 py-4 ">
                        {" "}
                        <div className="flex justify-between items-center h-[30px]">
                          {" "}
                          <h3 className="lg:text-xl font-semibold mb-2">
                            {arr.businessName}
                          </h3>
                          <p>rating</p>
                        </div>
                        <div className="flex justify-start gap-2">
                          <img src="/icons/locationred.svg" />
                          <p className="text-[18px] text-[#666666]">
                            {arr.location}
                          </p>
                        </div>
                        <p className="text-sm py-4 h-[68px">
                          {" "}
                          {truncateText(
                            "lorem dfghj fghjk fghjk fghjkl fghjklorem dfghj fghjk fghjk fghjkl fghjklorem dfghj fghjk fghjk fghjkl fghjklorem dfghj fghjk fghjk fghjkl fghjklorem dfghj fghjk fghjk fghjkl fghjklorem dfghj fghjk fghjk fghjkl fghjklorem dfghj fghjk fghjk fghjkl fghjklorem dfghj fghjk fghjk fghjkl fghjklorem dfghj fghjk fghjk fghjkl fghjklorem dfghj fghjk fghjk fghjkl fghjk",
                            20
                          )}{" "}
                          {/* {truncateText(arr.about, 30)} */}
                        </p>
                        <div className="flex justify-between">
                          <div className="bg-[#dad9d9]  py-2 px-3 rounded-md  ">
                            <p className="text-[#333333] lg:lg:text-sm text-[10px]">
                              100-200 pax
                            </p>
                          </div>
                          <div className="bg-[#dad9d9] py-2 px-3 rounded-md  ">
                            <p className="text-[#333333] lg:text-sm text-[10px]">32 rooms</p>
                          </div>{" "}
                          <div className="bg-[#dad9d9] py-2 px-3 rounded-md  ">
                            <p className="text-[#333333] lg:text-sm text-[10px]">32 rooms</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            ) : (
              <p>No venues available</p>
            )}
          </div>
        </div>
        </div>
     
      <Space50px />
      
      <Space50px />
      <ContactUSPhoto />
      <Discription />
      <div>
        <FAQ />
      </div>
    </>
  );
};

export default Page;
