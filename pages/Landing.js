"use client";
"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase"; // adjust the import path as needed
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "@/components/Hero"; // adjust the import path as needed
import Link from "next/link";

export default function Landing() {
  const [venue, setVenues] = useState([]);
  const [mendhiArtists, setMendhiArtists] = useState([]);
  const [makeupArtist, setMakeupArtist] = useState([]);
  const [photographersArtists, setPhotographersArtists] = useState([]);

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

  const fetchMendhiArtists = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("vendorTypeUID", "==", "mehndivendor")
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
        where("vendorTypeUID", "==", "makeupvendor")
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
        where("vendorTypeUID", "==", "photographersvendor")
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
    centerMode: true,
    centerPadding: "30px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-[url('/images/hero.png')] min-h-screen bg-no-repeat bg-cover bg-fixed">
      <Hero />
      <div className="w-full bg-cream p-10 space-y-16">
        <div>
          <p className="md:text-3xl text-[32px] font-semibold text-pink font-fira-sans p-4">
            Popular <span className="font-dancing-script">Destinations</span>
          </p>
          <div className="px-[15px]">
            {venue.length > 0 ? (
              <Slider
                {...sliderSettings}
                nextArrow={<img src="/images/next.png" />}
                prevArrow={<img src="/images/previous.png" />}
              >
                {venue.map((arr, index) => (
                  <Link
                    href={`/venues/${arr.uid}`}
                    key={index}
                    className="px-4 h-[488px] "
                  >
                    <div className="bg-white rounded shadow-md">
                      <img
                        src={arr.bannerImageUrl}
                        alt={arr.businessName}
                        className="w-full h-64 object-cover mt-2 rounded-t-[8px]"
                      />
                      <div className="bg-white px-6 py-2 ">
                        {" "}
                        <div className="flex justify-between items-center">
                          {" "}
                          <h3 className="text-xl font-semibold mb-2">
                            {arr.businessName}
                          </h3>
                          <p>rating</p>
                        </div>
                        <div className="flex justify-start gap-2">
                          <img src="/icons/locationred.svg" />
                          <p>{arr.location}</p>
                        </div>
      

                        <p>{arr.about}</p>

           
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

        <div>
          <p className="md:text-3xl text-[32px] font-semibold text-pink font-fira-sans p-4">
            Popular <span className="font-dancing-script">Mendhi Artists</span>
          </p>
          {mendhiArtists.length > 0 ? (
            <Slider {...sliderSettings}>
              {mendhiArtists.map((arr, index) => (
               <Link
               href={`/venues/${arr.uid}`}
               key={index}
               className="px-4 h-[488px] "
             >
               <div className="bg-white rounded shadow-md">
                 <img
                   src={arr.bannerImageUrl}
                   alt={arr.businessName}
                   className="w-full h-64 object-cover mt-2 rounded-t-[8px]"
                 />
                 <div className="bg-white px-6 py-2 ">
                   {" "}
                   <div className="flex justify-between items-center">
                     {" "}
                     <h3 className="text-xl font-semibold mb-2">
                       {arr.businessName}
                     </h3>
                     <p>rating</p>
                   </div>
                   <div className="flex justify-start gap-2">
                     <img src="/icons/locationred.svg" />
                     <p>{arr.location}</p>
                   </div>
 

                   <p>{arr.about}</p>

      
                 </div>
               </div>
             </Link>
              ))}
            </Slider>
          ) : (
            <p>No Mendhi Artists available</p>
          )}
        </div>

        <div>
          <p className="md:text-3xl text-[32px] font-semibold text-pink font-fira-sans p-4">
            Popular <span className="font-dancing-script">Makeup Artists</span>
          </p>
          {makeupArtist.length > 0 ? (
            <Slider {...sliderSettings}>
              {makeupArtist.map((arr, index) => (
                  <Link
                  href={`/venues/${arr.uid}`}
                  key={index}
                  className="px-4 h-[488px] "
                >
                  <div className="bg-white rounded shadow-md">
                    <img
                      src={arr.bannerImageUrl}
                      alt={arr.businessName}
                      className="w-full h-64 object-cover mt-2 rounded-t-[8px]"
                    />
                    <div className="bg-white px-6 py-2 ">
                      {" "}
                      <div className="flex justify-between items-center">
                        {" "}
                        <h3 className="text-xl font-semibold mb-2">
                          {arr.businessName}
                        </h3>
                        <p>rating</p>
                      </div>
                      <div className="flex justify-start gap-2">
                        <img src="/icons/locationred.svg" />
                        <p>{arr.location}</p>
                      </div>
    

                      <p>{arr.about}</p>

         
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          ) : (
            <p>No Makeup Artists available</p>
          )}
        </div>

        <div>
          <p className="md:text-3xl text-[32px] font-semibold text-pink font-fira-sans p-4">
            Popular <span className="font-dancing-script">Photographers</span>
          </p>
          {photographersArtists.length > 0 ? (
            <Slider {...sliderSettings}>
              {photographersArtists.map((arr, index) => (
                  <Link
                  href={`/venues/${arr.uid}`}
                  key={index}
                  className="px-4 h-[488px] "
                >
                  <div className="bg-white rounded shadow-md">
                    <img
                      src={arr.bannerImageUrl}
                      alt={arr.businessName}
                      className="w-full h-64 object-cover mt-2 rounded-t-[8px]"
                    />
                    <div className="bg-white px-6 py-2 ">
                      {" "}
                      <div className="flex justify-between items-center">
                        {" "}
                        <h3 className="text-xl font-semibold mb-2">
                          {arr.businessName}
                        </h3>
                        <p>rating</p>
                      </div>
                      <div className="flex justify-start gap-2">
                        <img src="/icons/locationred.svg" />
                        <p>{arr.location}</p>
                      </div>
    

                      <p>{arr.about}</p>

         
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
    </div>
  );
}
