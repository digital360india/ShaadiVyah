import Hero from "@/components/Hero";
import Parallax from "@/components/Parallax";
import React from "react";
import "../app/globals.css";

const data = [
  {
    heading: "Destinations",
    bgColor: "cream",
    array: [
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
    ],
  },
  {
    heading: "Photographs",
    bgColor: "white",
    array: [
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
    ],
  },
  {
    heading: "Mehndi Artist",
    bgColor: "cream",
    array: [
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
    ],
  },
  {
    heading: "Makeup Artist",
    bgColor: "white",
    array: [
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
    ],
  },
  {
    heading: "Decorators",
    bgColor: "cream",
    array: [
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
    ],
  },
];

export default function Landing() {
  return (
    <div className="bg-[url('/images/hero.png')] h-[540vh] bg-no-repeat bg-cover bg-fixed ">
      <div>
        <Hero />
        <div className="absolute w-full">
          {data.map((arr, index) => (
            <Parallax key={index} array={arr} />
          ))}
        </div>
      </div>
    </div>
  );
}
