"use client"
import React from 'react'
import Image from "next/image";
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
export default function DestinationCard() {
  return (
    <div>
       <div className="px-6 xl:px-[100px] lg:px-[40px] md:px-[40px] ">
    <div className=' md:flex md:flex-wrap '>
        {array.map((value, index) => (
          <div className="w-[100%] md:w-[50%] md:h-[620px] xl:px-4 lg:px-2 md:px-4 lg:w-[33.33%]   lg:h-full  py-4 ">
            <Image
              src={"/images/hero.png"}
              width={1000}
              height={1000}
              className="w-full rounded-t-lg h-[50%]"
            />
            <div className="px-5 py-3 space-y-3 w-full bg-gray-200  rounded-b-lg">
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
    </div>
  </div>
    </div>
  )
}