"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Parallax({ array }) {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 3,
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
  return (
    <div className={`h-[90vh] bg-${array.bgColor}  xl:px-[100px] lg:px-[60px] md:px-[30px] sm:px-[20px] py-[60px]`}>
      <div className="">
        <p className="md:text-3xl text-[32px] font-semibold text-pink font-fira-sans p-4 ">
          Popular <span className="font-dancing-script">{array.heading}</span>
        </p>
      </div>
      <div>
        <Slider {...settings} className="">
          {array.array.map((value, index) => (
            <div key={index} className="xl:w-[400px] xl:h-[488px] lg:w-[350px] md:w-[300px] sm:w-[250px]   p-4 ">
              <Image
                src={value.image || "/images/hero.png"}
                width={1000}
                height={1000}
                className="w-full rounded-t-lg h-[50%] object-cover"
                alt={value.venueName}
              />
              <div className="px-5 py-3 space-y-3 w-full bg-white shadow-lg rounded-b-lg">
                <div className="flex justify-between">
                  <p>{value.venueName}</p>
                  <div>
                    <p>
                      {value.rating} ({value.totalRatings})
                    </p>
                  </div>
                </div>
                <div>
                  <p>{value.location}</p>
                </div>
                <p>{value.about}</p>
                <div className="flex flex-wrap gap-2">
                  {value.venueDetails.map((detail, index) => (
                    <p key={index} className="bg-gray-200 w-fit px-2 py-1 rounded">{detail}</p>
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
