"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Comp() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const array = [
    {
      venueImg: "/hero.png",
      venueName: "The Bristol Hotel",
      rating: "5.0",
      totalRatings: "3",
      location: "Lorem Ipsum, dior",
      about:
        "Lorem ipsum dolor sit amet consectetur. Molestie elit convallis a ac. Cras condimentum id quam nulla viverra diam neque. Et amet id sit aenean aliquet mauris etiam consequat.",
      venueDetails: ["32 rooms", "100-200 pax", "32 rooms"],
    },
    {
      venueImg: "/hero.png",
      venueName: "The Bristol Hotel",
      rating: "5.0",
      totalRatings: "3",
      location: "Lorem Ipsum, dior",
      about:
        "Lorem ipsum dolor sit amet consectetur. Molestie elit convallis a ac. Cras condimentum id quam nulla viverra diam neque. Et amet id sit aenean aliquet mauris etiam consequat.",
      venueDetails: ["32 rooms", "100-200 pax", "32 rooms"],
    },
    {
      venueImg: "/hero.png",
      venueName: "The Bristol Hotel",
      rating: "5.0",
      totalRatings: "3",
      location: "Lorem Ipsum, dior",
      about:
        "Lorem ipsum dolor sit amet consectetur. Molestie elit convallis a ac. Cras condimentum id quam nulla viverra diam neque. Et amet id sit aenean aliquet mauris etiam consequat.",
      venueDetails: ["32 rooms", "100-200 pax", "32 rooms"],
    },
    {
      venueImg: "/hero.png",
      venueName: "The Bristol Hotel",
      rating: "5.0",
      totalRatings: "3",
      location: "Lorem Ipsum, dior",
      about:
        "Lorem ipsum dolor sit amet consectetur. Molestie elit convallis a ac. Cras condimentum id quam nulla viverra diam neque. Et amet id sit aenean aliquet mauris etiam consequat.",
      venueDetails: ["32 rooms", "100-200 pax", "32 rooms"],
    },
  ];

  return (
    <div className="h-[90vh] bg-white px-[100px] py-[60px] mb-4">
      <div>
        <p className="text-3xl font-semibold text-pink font-fira-sans">
          Popular <span className="font-dancing-script">Photographers</span>
        </p>
      </div>
      <div>
        <Slider {...settings} className="">
          {array.map((value, index) => (
            <div className="w-[400px] h-[488px]  p-4 ">
              <img
                src={"/images/hero.png"}
                width={1000}
                height={1000}
                className="w-full rounded-t-lg h-[50%]"
              />
              <div className="px-5 py-3 space-y-3 w-full bg-white  rounded-b-lg shadow-lg">
                <div className="flex justify-between">
                  <p>{value.venueName}</p>
                  <div>
                    <></>
                    <p>
                      {value.rating}({value.totalRatings})
                    </p>
                  </div>
                </div>
                <div>
                  <p>{value.location}</p>
                </div>
                <p>{value.about}</p>
                <div className="flex justify-between">
                  {value.venueDetails.map((value) => (
                    <p className="bg-gray w-fit px-2 py-1 rounded">{value}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div> 
    </div>
  );
}
