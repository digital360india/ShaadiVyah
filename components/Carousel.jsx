"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Parallax() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Medium screens and up
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Small screens and up
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
    <div className="px-2 md:px-8 lg:px-[100px] overflow-hidden">
    
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
              <div className="px-5 py-3 space-y-3 w-full bg-white  rounded-b-lg">
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