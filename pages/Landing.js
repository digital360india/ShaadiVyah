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
import AboutShadivyah from "@/components/AboutShadivyah";
import HowToWork from "@/components/HowToWork";
import ContactUsPhoto from "@/components/ContactUsPhoto";
import { MdOutlineStar } from "react-icons/md";
import Space25px from "@/components/Space25px";
import Space50px from "@/components/Space50px";
import FAQ from "@/components/FAQ";
import BookingForm from "@/components/BookingForm";
import VenueCard from "@/components/VenuesCard";
import MendhiVendorCard from "@/components/MendhiCard";
import MakeupVendorCard from "@/components/MakeupCard";
import PhotographerVendorCard from "@/components/PhotographerVendorCard";
import Image from "next/image";
import BiddingCards from "@/components/BiddingCards";

export default function Landing() {
  const HomeFaqData = [
    {
      question: "What services does Shaadivyah offer?",
      answer:
        "Shaadivyah provides comprehensive wedding planning services, including venue selection, decoration, catering, photography, makeup artists, mehndi artists, and more. We also offer a platform for vendors and artists to showcase their services.",
    },
    {
      question: "How do I register as a vendor on Shaadivyah?",
      answer:
        'To register as a vendor, simply click on the "Register" button on our homepage, fill out the required details, and submit your application. Once approved, you can start showcasing your products and services to our wide audience.',
    },
    {
      question: "Can Shaadivyah help with destination weddings in Uttarakhand?",
      answer:
        "Yes, Shaadivyah specializes in destination weddings in Uttarakhand, providing beautiful venues, breathtaking backdrops, and complete wedding planning services to ensure your special day is perfect.",
    },
    {
      question: "How do I start planning my wedding with Shaadivyah? ",
      answer:
        "Start by contacting us through our website or by phone. We will discuss your vision and preferences, create a personalized plan, and take care of all the details to make your dream wedding a reality.",
    },

    {
      question: "What makes Shaadivyah different from other wedding planners?",
      answer:
        "Shaadivyah is unique because we offer a seamless, stress-free experience, personalized planning, and access to top-rated vendors and artists. Our commitment to quality and attention to detail ensures that every wedding we plan is truly special.",
    },
    {
      question: "Can I customize my wedding package with Shaadivyah? ",
      answer:
        "Absolutely! We believe every wedding is unique, and we offer customizable packages to suit your specific needs and preferences. Discuss your vision with us, and we'll tailor our services accordingly.",
    },
  ];

  const NextArrow = ({ onClick }) => (
    <div
      className={`absolute lg:-right-10 lg:bottom-[50%] hidden lg:block  custom-arrow custom-next-arrow w-[100px]`}
      onClick={onClick}
    >
      <img
        src="/icons/righticon.svg"
        alt="Next Arrow"
        className="lg:w-20 lg:h-20"
      />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className={`absolute lg:-left-20 lg:bottom-[50%] hidden lg:block custom-arrow custom-prev-arrow w-60`}
      onClick={onClick}
    >
      <img
        src="/icons/lefticon.svg"
        alt="Previous Arrow"
        className="lg:w-20 lg:h-20 "
      />
    </div>
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
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 2860, // For screens larger than 1440px
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 2240, // xl
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1840, // xl
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1440, // xl
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
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
      <div>
        <BiddingCards />
      </div>
      <div className="w-full font-Merriweather ">
        {/* <div className="sticky top-0">
          <div className="bg-cream pt-24 pb-12  relative  px-6 md:px-20">
            <Image
              src={"/vectors/vector3.png"}
              alt="image"
              height={1000}
              width={1000}
              className="w-[350px] lg:w-[880px] lg:h-[310px]  absolute lg:-top-[0px] lg:right-[250px] top-4 z-10 opacity-10  "
            />
            <div className="">
              <div className="flex flex-row justify-between items-center">
                {" "}
                <p className="md:text-3xl text-[32px] text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217]  pl-4 ">
                  Popular{" "}
                  <span className="customGabriola text-pink bg-clip-text">
                    Destinations
                  </span>
                </p>
                <Link
                  href={"/venues"}
                  className="mt-2 text-[#C9184A] underline text-md font-Merriweather"
                >
                  more.
                </Link>
              </div>

              <div className=" ">
                {venue.length > 0 ? (
                  <Slider {...sliderSettings} className="gap-6">
                    {venue.map((arr, index) => (
                      <div key={index} className="px-2">
                        <VenueCard arr={arr} index={index} />
                      </div>
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
          <div className="bg-white pt-24 pb-12   px-6 md:px-20 ">
           

            <div className="flex flex-row justify-between items-center">
              <p className="md:text-3xl text-[32px] font-medium text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather md:p-4 ">
                Popular{" "}
                <span className="customGabriola text-pink bg-clip-text">
                  Mehndi Artists
                </span>
              </p>
              <Link
                href={"/mehandivendors"}
                className="mt-2 text-[#C9184A] underline text-md font-Merriweather z-10"
              >
                more.
              </Link>
            </div>
            <div className="">
              {mendhiArtists.length > 0 ? (
                <Slider {...sliderSettings} className="gap-6">
                  {mendhiArtists.map((arr, index) => (
                    <div key={index} className="px-2">
                      <MendhiVendorCard arr={arr} index={index} />
                    </div>
                  ))}
                </Slider>
              ) : (
                <p>No Mehndi Artists available</p>
              )}
            </div>
          </div>
        </div>
        <div className="sticky top-0">
          <div className="bg-cream pt-24 pb-12   relative  px-6 md:px-20 ">
            <Image
              src={"/vectors/vector2.png"}
              alt="image"
              height={1000}
              width={1000}
              className=" md:w-[569px] md:h-[471px] w-[350px] h-[300px]    absolute lg:-top-[100px] lg:right-[140px] -top-8 p4 z-10 opacity-20 "
            />

            <div className="flex flex-row justify-between items-center">
              {" "}
              <p className="md:text-3xl text-[32px] font-medium text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather md:p-4 ">
                Popular{" "}
                <span className="customGabriola text-pink bg-clip-text">
                  Makeup Artists
                </span>
              </p>
              <Link
                href={"/makeupvendors"}
                className="mt-2 text-[#C9184A] underline text-md font-Merriweather"
              >
                more.
              </Link>
            </div>
            {makeupArtist.length > 0 ? (
              <Slider {...sliderSettings} className="gap-6">
                {makeupArtist.map((arr, index) => (
                  <div key={index} className="px-2">
                    <MakeupVendorCard vendor={arr} index={index} />
                  </div>
                ))}
              </Slider>
            ) : (
              <p>No Makeup Artists available</p>
            )}
          </div>
        </div>
        <div className="sticky top-0">
          <div className="bg-white pt-24 pb-12   relative  px-6 md:px-20 ">
            <Image
              src={"/vectors/Vector.png"}
              alt="image"
              height={1000}
              width={1000}
              className=" lg:w-[300px] lg:h-[230px] w-[270px] h-[270px]  absolute  lg:left-[350px] left-[100px] top-4 z-10 opacity-10 "
            />

            <div className="flex flex-row justify-between items-center">
              {" "}
              <p className="md:text-3xl text-[32px] font-medium font-Merriweather text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] md:p-4 ">
                Popular{" "}
                <span className="customGabriola text-pink bg-clip-text">
                  Photographers
                </span>
              </p>
              <Link
                href={"/photographersvendors"}
                className="mt-2 text-[#C9184A] underline text-md font-Merriweather"
              >
                more.
              </Link>
            </div>
            {photographersArtists.length > 0 ? (
              <Slider {...sliderSettings} className="gap-6">
                {photographersArtists.map((arr, index) => (
                  <div key={index} className="px-2">
                    <PhotographerVendorCard vendor={arr} index={index} />
                  </div>
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
        */}
      </div>
     
      {/* <Space50px />
      <ContactUsPhoto />
      <Space50px />
      <FAQ faqData={HomeFaqData} /> */}
    </div>
  );
}
