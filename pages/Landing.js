"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "@/components/Hero";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import AboutShadivyah from "@/components/AboutShadivyah";
import HowToWork from "@/components/HowToWork";
import ContactUsPhoto from "@/components/ContactUsPhoto";
import Review from "@/components/Review";

export default function Landing() {
  // Custom Next Arrow Component
  const NextArrow = ({ className, style, onClick }) => (
    <div
      className={`${className} custom-arrow custom-next-arrow`}
      style={{ ...style, display: "block", background: "pink" }}
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
  const [mendhiArtists, setMendhiArtists] = useState([]);
  const [makeupArtist, setMakeupArtist] = useState([]);
  const [photographersArtists, setPhotographersArtists] = useState([]);

  const fetchVenue = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("vendorTypeUID", "==", "venuesvendor"),
        where("approval", "==", true)
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

  const fetchMendhiArtists = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("vendorTypeUID", "==", "mehndivendor"),
        where("approval", "==", true)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setMendhiArtists(data);
      }
    } catch (error) {
      console.error("Error fetching mendhivendors:", error);
    }
  };

  const fetchMakeupArtist = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("vendorTypeUID", "==", "makeupvendor"),
        where("approval", "==", true)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setMakeupArtist(data);
      }
    } catch (error) {
      console.error("Error fetching makeup vendors:", error);
    }
  };

  const fetchPhotographersVendor = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("vendorTypeUID", "==", "photographersvendor"),
        where("approval", "==", true)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setPhotographersArtists(data);
      }
    } catch (error) {
      console.error("Error fetching photographers vendors:", error);
    }
  };

  useEffect(() => {
    fetchVenue();
    fetchMendhiArtists();
    fetchMakeupArtist();
    fetchPhotographersVendor();
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
    if (text === undefined) {
      return "";
    }

    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="">
      <div className="">
        <Hero />
      </div>
      <div className="w-full ">
        <div className="sticky top-0">
          <div className="bg-cream py-16  relative  z-20 lg:px-10 px-6 ">
            <img
              src={"/vectors/vector3.png"}
              alt="image"
              height={1000}
              width={1000}
              className="w-[350px] lg:w-[880px] lg:h-[310px]   absolute lg:-top-[50px] lg:right-[250px] top-4 z-100 opacity-10 "
            />
            <div className="">
              <div className="flex flex-row justify-between items-center">
                {" "}
                <p className="md:text-3xl text-[32px] font-semibold text-pink font-fira-sans p-4 ">
                  Popular{" "}
                  <span className="font-dancing-script">Destinations</span>
                </p>
                <Link
                  href={"/venues"}
                  className="mt-2 text-[#C9184A] underline text-md font-dancing-script"
                >
                  See all
                </Link>
              </div>

              <div className="px-[15px]  ">
                {venue.length > 0 ? (
                  <Slider {...sliderSettings}>
                    {venue.map((arr, index) => (
                      <Link
                        href={`/venues/${arr.uid}`}
                        key={arr.uid}
                        className=" py-4 md:px-16 "
                      >
                        <div className="bg-white rounded  shadow-md lg:h-[488px] lg:w-[398px]  ">
                          <img
                            src={arr.bannerImageUrl || "/images/logo1.png"}
                            alt={arr.businessName}
                            className="w-full h-60 object-cover mt-2 rounded-t-[4px]"
                          />
                          <div className=" px-6 py-4  ">
                            {" "}
                            <div className="flex justify-between items-center h-[30px]">
                              {" "}
                              <h3 className="lg:text-xl text-blue  font-semibold mb-2">
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
                            <p className="text-sm py-4 h-[120px]">
                              {truncateText(arr.about, 30)}
                            </p>
                            {/* <div className="flex justify-between">
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
                        </div> */}
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
        </div>
        <div className="sticky top-0">
          <div className="bg-white py-16  relative  px-10 ">
            <img
              src={"/vectors/vector4.png"}
              alt="image"
              height={1000}
              width={1000}
              className=" w-[300px] lg:w-[430px] lg:h-[330px]  h-[270px]  absolute lg:-top-[50px] lg:left-[350px] left-[100px] top-4 z-100 opacity-10 "
            />

            <div className="flex flex-row justify-between items-center">
              {" "}
              <p className="md:text-3xl text-[32px] font-semibold text-pink font-fira-sans md:p-4 ">
                Popular{" "}
                <span className="font-dancing-script">Mendhi Artists</span>
              </p>
              <Link
                href={"/mehandivendors"}
                className="mt-2 text-[#C9184A] underline text-md font-dancing-script"
              >
                See all
              </Link>
            </div>
            {mendhiArtists.length > 0 ? (
              <Slider {...sliderSettings}>
                {mendhiArtists.map((arr, index) => (
                  <Link
                    href={`/venues/${arr.uid}`}
                    key={arr.uid}
                    className=" py-4  md:px-16 "
                  >
                    <div className="bg-white rounded  shadow-md lg:h-[488px] lg:w-[398px] ">
                      <img
                        src={arr.bannerImageUrl || "/images/logo1.png"}
                        alt={arr.businessName}
                        className="w-full h-60 object-cover mt-2 rounded-t-[4px]"
                      />
                      <div className=" px-6 py-4 ">
                        {" "}
                        <div className="flex justify-between items-center h-[30px]">
                          {" "}
                          <h3 className="lg:text-xl text-blue  font-semibold mb-2">
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
                        <p className="text-sm py-4 h-[120px]">
                          {truncateText(arr.about, 30)}
                        </p>
                        {/* <div className="flex justify-between">
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
                   </div> */}
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            ) : (
              <p>No Mendhi Artists available</p>
            )}
          </div>
        </div>
        <div className="sticky top-0">
          <div className="bg-cream py-16 relative z-20  px-10 ">
            <img
              src={"/vectors/vector2.png"}
              alt="image"
              height={1000}
              width={1000}
              className=" md:w-[769px] md:h-[471px] w-[350px] h-[300px]    absolute lg:-top-[100px] lg:right-[140px] -top-8 p4 z-100 opacity-20 "
            />

            <div className="flex flex-row justify-between items-center">
              {" "}
              <p className="md:text-3xl text-[32px] font-semibold text-pink font-fira-sans md:p-4 ">
                Popular{" "}
                <span className="font-dancing-script">Makeup Artists</span>
              </p>
              <Link
                href={"/makeupvendors"}
                className="mt-2 text-[#C9184A] underline text-md font-dancing-script"
              >
                See all
              </Link>
            </div>
            {makeupArtist.length > 0 ? (
              <Slider {...sliderSettings}>
                {makeupArtist.map((arr, index) => (
                  <Link
                    href={`/venues/${arr.uid}`}
                    key={arr.uid}
                    className=" py-4  md:px-16 "
                  >
                    <div className="bg-white rounded  shadow-md lg:h-[488px] lg:w-[398px] ">
                      <img
                        src={arr.bannerImageUrl || "/images/logo1.png"}
                        alt={arr.businessName}
                        className="w-full h-60 object-cover mt-2 rounded-t-[4px]"
                      />
                      <div className=" px-6 py-4 ">
                        {" "}
                        <div className="flex justify-between items-center h-[30px]">
                          {" "}
                          <h3 className="lg:text-xl text-blue font-semibold mb-2">
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
                        <p className="text-sm py-4 h-[120px]">
                          {" "}
                          {truncateText(arr.about, 30)}
                        </p>
                        {/* <div className="flex justify-between">
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
                    </div> */}
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            ) : (
              <p>No Makeup Artists available</p>
            )}
          </div>
        </div>
        <div className="sticky top-0">
          <div className="bg-white py-16  relative  px-10 ">
            <img
              src={"/vectors/Vector.png"}
              alt="image"
              height={1000}
              width={1000}
              className=" lg:w-[430px] lg:h-[330px] w-[300px] h-[270px]  absolute lg:-top-[50px] lg:left-[350px] left-[100px] top-4 z-100 opacity-10 "
            />

            <div className="flex flex-row justify-between items-center">
              {" "}
              <p className="md:text-3xl text-[32px] font-semibold text-pink font-fira-sans md:p-4 ">
                Popular{" "}
                <span className="font-dancing-script">Photographers</span>
              </p>
              <Link
                href={"/photograpgervendors"}
                className="mt-2 text-[#C9184A] underline text-md font-dancing-script"
              >
                See all
              </Link>
            </div>
            {photographersArtists.length > 0 ? (
              <Slider {...sliderSettings}>
                {photographersArtists.map((arr, index) => (
                  <Link
                    href={`/photographervendors/${arr.uid}`}
                    key={arr.uid}
                    className=" py-4  md:px-16 "
                  >
                    <div className="bg-white rounded  shadow-md lg:h-[488px] lg:w-[398px] ">
                      <img
                        src={arr.bannerImageUrl || "/images/logo1.png"}
                        alt={arr.businessName}
                        className="w-full h-60 object-cover mt-2 rounded-t-[4px]"
                      />
                      <div className=" px-6 py-4 ">
                        {" "}
                        <div className="flex justify-between items-center h-[30px]">
                          {" "}
                          <h3 className="lg:text-xl text-blue  font-semibold mb-2">
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
                        <p className="text-sm py-4 h-[120px]">
                          {" "}
                          {truncateText(arr.about, 30)}
                        </p>
                        {/* <div className="flex justify-between">
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
                    </div> */}
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            ) : (
              <p>No Photographers available</p>
            )}
          </div>
        </div>
        <div className="sticky top-0">
          <Testimonials />
        </div>
        <div className="sticky top-0">
          <AboutShadivyah />
        </div>
      </div>
      <HowToWork />
      <ContactUsPhoto />
      <Review />
    </div>
  );
}
