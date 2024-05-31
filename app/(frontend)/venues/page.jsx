import Parallax from "@/components/Carousel";
import ContactUSPhoto from "@/components/ContactUSPhoto";
import DestinationCard from "@/components/DestinationCard";
import Discription from "@/components/Discription";
import FAQ from "@/components/FAQ";
import HeadingsVenueSection from "@/components/HeadingsVenueSection";
import Hero_2 from "@/components/Hero_2";
import Space25px from "@/components/Space25px";
import Space50px from "@/components/Space50px";
import Image from "next/image";
import React from "react";

const page = () => {
  const array = [
    {
      venueImg: "/images/hero.png",
      venueName: "Dehradun",
      rating: "5.0",
      totalRatings: "3",
      location: "Lorem Ipsum, dior",
      about:
        "Lorem ipsum dolor sit amet consectetur. Molestie elit convallis a ac. Cras condimentum id quam nulla viverra diam neque. Et amet id sit aenean aliquet mauris etiam consequat.",
      venueDetails: ["32 rooms", "100-200 pax", "32 rooms"],
    },
    {
      venueImg: "/images/hero.png",
      venueName: "Mussoorie",
      rating: "5.0",
      totalRatings: "3",
      location: "Lorem Ipsum, dior",
      about:
        "Lorem ipsum dolor sit amet consectetur. Molestie elit convallis a ac. Cras condimentum id quam nulla viverra diam neque. Et amet id sit aenean aliquet mauris etiam consequat.",
      venueDetails: ["32 rooms", "100-200 pax", "32 rooms"],
    },
    {
      venueImg: "/images/hero.png",
      venueName: "Rishikesh",
      rating: "5.0",
      totalRatings: "3",
      location: "Lorem Ipsum, dior",
      about:
        "Lorem ipsum dolor sit amet consectetur. Molestie elit convallis a ac. Cras condimentum id quam nulla viverra diam neque. Et amet id sit aenean aliquet mauris etiam consequat.",
      venueDetails: ["32 rooms", "100-200 pax", "32 rooms"],
    },
    {
      venueImg: "/images/hero.png",
      venueName: "Nainital",
      rating: "5.0",
      totalRatings: "3",
      location: "Lorem Ipsum, dior",
      about:
        "Lorem ipsum dolor sit amet consectetur. Molestie elit convallis a ac. Cras condimentum id quam nulla viverra diam neque. Et amet id sit aenean aliquet mauris etiam consequat.",
      venueDetails: ["32 rooms", "100-200 pax", "32 rooms"],
    },
  ];
  return (
    <>
      <Hero_2
        img={"/images/venus_page.png"}
        text={"Lorem ipsum dolor sit amet consectetur."}
      />
      <Space50px />
      {/* Headings component */}
      <HeadingsVenueSection text1={"Weddings"} text2={"Destinations"} />
      <Space25px />
      <div className="flex justify-center items-center px-6  gap-8">
        {array.map((items) => (
          <div className="flex flex-col items-center justify-center ">
            <Image
              className="lg:w-[150px] lg:h-[100px]  md:w-[144px] md:h-[90px] w-[90px] h-[60px]  rounded-lg"
              src={items.venueImg}
              width={1000}
              height={1000}
            />
            <p className="text-blue md:text-base text-sm">{items.location} </p>
          </div>
        ))}
      </div>
      <Space25px />
      <HeadingsVenueSection text1={"Popular"} text2={"Destinations"} />
      <Parallax />
      <Space25px />
      <HeadingsVenueSection text1={"All"} text2={"Destinations"} />
      <DestinationCard />
      <Space50px />
      <Space50px />
     <ContactUSPhoto/>
      <Space50px />
      <Space50px />
      <Discription/>
      <div>
      <FAQ   />
    </div>
      
    </>
  );
};

export default page;
