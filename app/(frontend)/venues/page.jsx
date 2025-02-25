"use client";
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
import ContactUsPhoto from "@/components/ContactUsPhoto";
import { useRouter } from "next/navigation";
import { MdOutlineStar } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import VenueCard from "@/components/VenuesCard";
import Image from "next/image";

// import ContactUSPhoto from "@/components/ContactUSPhoto";

const Page = () => {
  const router = useRouter();

  const venueFAQ = [
    {
      question: "What types of wedding venues do hotels typically offer?",
      answer:
        "Hotels usually offer a variety of wedding venues, including grand ballrooms, intimate garden spaces, rooftop terraces, and beachfront locations, catering to different styles and sizes of weddings.",
    },
    {
      question: "Can I tour the hotel venues before making a decision?",
      answer:
        "Yes, most hotels allow prospective couples to tour the venues, meet with the event staff, and discuss wedding plans in detail before making a booking.",
    },
    {
      question: "What wedding services do hotels provide?",
      answer:
        "Hotels often provide comprehensive wedding services, including catering, decoration, event planning, accommodation for guests, and coordination on the wedding day to ensure everything runs smoothly.",
    },
    {
      question: "Do hotels offer wedding packages?",
      answer:
        "Yes, many hotels offer wedding packages that bundle together various services like venue rental, catering, decoration, and accommodation. These packages are designed to provide convenience and value.",
    },
    {
      question: "Can I customize my wedding package at a hotel?",
      answer:
        "Absolutely! Hotels typically offer customizable wedding packages that allow you to tailor services to your specific needs and preferences, ensuring your wedding day is exactly how you envision it.",
    },
    {
      question: "How far in advance should I book a hotel for my wedding?",
      answer:
        "It is recommended to book your hotel wedding venue at least 6-12 months in advance to ensure availability and provide ample time for planning and preparation.",
    },
  ];

  // Custom Next Arrow Component
  const NextArrow = ({ className, style, onClick }) => (
    <div
      className={`${className} custom-arrow custom-next-arrow`}
      style={{
        ...style,
        backgroundColor: "#A11C5C",
        color: "#ffffff",
        borderRadius: "50%",
      }} // Add background and text color
      onClick={onClick}
    />
  );

  // Custom Prev Arrow Component
  const PrevArrow = ({ className, style, onClick }) => (
    <div
      className={`${className} custom-arrow custom-prev-arrow`}
      style={{
        ...style,
        backgroundColor: "#A11C5C",
        color: "#ffffff",
        borderRadius: "50%",
      }} // Add background and text color
      onClick={onClick}
    />
  );

  const [venue, setVenues] = useState([]);

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

  useEffect(() => {
    fetchVenue();
  }, []);
  const handleSearch = (selectedLocation) => {
    router.push(`/search/${selectedLocation}/Venues`);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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

  const sliderwedding = {
    dots: false,
    infinite: true,
    speed: 500,

    //  centerMode: true,
    //  centerPadding: "100px",
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1440, // xl
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1324, // lg
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1124, // lg
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 740, // sm
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Hero_2
        img={"/images/venus_page.png"}
        text={"Uttrakhands Best Wedding Destinations"}
      />
      <Space50px />
      <Space25px />
      <div>
        <div className="lg:px-10 p-6 bg-cream">
          <p className="md:text-3xl  text-[32px] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217]  p-4 font-Merriweather ">
            Wedding{" "}
            <span className="customGabriola font-normal text-pink">
              Destinations
            </span>
          </p>

          {/* <div className="p-4 customGabriola text-[25px]">
            <Slider {...sliderwedding}>
              <div>
                <button
                  onClick={() => handleSearch("Rishikesh")}
                  className="  "
                >
                  <img
                    className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                    src="https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Frishikesh.png?alt=media&token=f64cf5e5-4b9d-43d3-befa-197992b4c2f6"
                    alt=""
                  />
                </button>
                <p className="px-[70px] text-[#02394A]">Rishikesh</p>
              </div>
              <div>
                <button onClick={() => handleSearch("Dehradun")} className="  ">
                  <img
                    className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                    src="https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Fdehradun.png?alt=media&token=ca835133-20d4-49da-8df8-265abe292acb"
                    alt=""
                  />
                </button>
                <p className="px-[70px] text-[#02394A]">Dehradun</p>
              </div>

              <div>
                <button onClick={() => handleSearch("Haridwar")} className="  ">
                  <img
                    className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                    src="https://image.cnbcfm.com/api/v1/image/107108131-1661279269174-gettyimages-831412090-20170731-tana9023.jpeg?v=1661279373&w=929&h=523&vtcrop=y"
                    alt=""
                  />
                </button>
                <p className="px-[70px] text-[#02394A]">Haridwar</p>
              </div>
              <div>
                <button
                  onClick={() => handleSearch("Mussoorie")}
                  className="  "
                >
                  <img
                    className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                    src="https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Fchamoli.png?alt=media&token=acb7527b-2c93-456c-a354-a49ae114556f"
                    alt=""
                  />
                </button>
                <p className="px-[70px] text-[#02394A]">Mussoorie</p>
              </div>
              <div>
                <button onClick={() => handleSearch("Ramnagar")} className="  ">
                  <img
                    className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                    src="https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Frudraprayag.png?alt=media&token=7a3a75a3-4751-498e-8410-6ab0d37a1990"
                    alt=""
                  />
                </button>
                <p className="px-[70px] text-[#02394A]">Ramnagar</p>
              </div>
              <div>
                <button onClick={() => handleSearch("Nainital")} className="  ">
                  <img
                    className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                    src="https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Ftehrigarhwal.png?alt=media&token=69a8a14f-4eb2-4c2f-9562-9b7fd9f78545"
                    alt=""
                  />
                </button>
                <p className="px-[70px] text-[#02394A]">Nainital</p>
              </div>
              <div></div>
            </Slider>
          </div> */}
          <div className="p-4 customGabriola text-[25px] w-full h-full gap-20 ">
            <Slider {...sliderwedding}>
              {[
                {
                  city: "Rishikesh",
                  src: "https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Frishikesh.png?alt=media&token=f64cf5e5-4b9d-43d3-befa-197992b4c2f6",
                },
                {
                  city: "Dehradun",
                  src: "https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Fdehradun.png?alt=media&token=ca835133-20d4-49da-8df8-265abe292acb",
                },
                {
                  city: "Haridwar",
                  src: "https://image.cnbcfm.com/api/v1/image/107108131-1661279269174-gettyimages-831412090-20170731-tana9023.jpeg?v=1661279373&w=929&h=523&vtcrop=y",
                },
                {
                  city: "Mussoorie",
                  src: "https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Fchamoli.png?alt=media&token=acb7527b-2c93-456c-a354-a49ae114556f",
                },
                // {
                //   city: "Ramnagar",
                //   src: "https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Frudraprayag.png?alt=media&token=7a3a75a3-4751-498e-8410-6ab0d37a1990",
                // },
                {
                  city: "Nainital",
                  src: "https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Ftehrigarhwal.png?alt=media&token=69a8a14f-4eb2-4c2f-9562-9b7fd9f78545",
                },
              ].map(({ city, src }) => (
                <div
                  key={city}
                  className="relative w-full mx-auto flex flex-col items-center "
                >
                  <div className="relative w-[180px] h-[180px] sm:w-[250px] sm:h-[250px]">
                    <Image
                      src="/icons/imgframe.svg"
                      alt="frame"
                      width={450}
                      height={450}
                      className="absolute w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleSearch(city)}
                      className="absolute inset-0 flex justify-center items-center"
                    >
                      <img
                        className=" w-[100px] h-[100px] sm:w-[170px] sm:h-[170px] object-cover"
                        src={src}
                        alt={city}
                      />
                    </button>
                  </div>
                  <p className="text-center text-[#02394A] mt-2">{city}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <Space25px />
      {/* populer  */}
      <div className="  relative  z-20 lg:px-5 px-2 ">
        <div className="">
          <p className="md:text-3xl text-[32px] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather p-4">
            Popular{" "}
            <span className="customGabriola font-normal text-pink">
              Destinations
            </span>
          </p>
          <div className=" xl:px-[48px] lg:px-[45px] md:px-[20px] px-[20px]  ">
            {venue.length > 0 ? (
              <Slider {...sliderSettings}>
                {venue.map((arr, index) => (
                  <Link href={`/venues/${arr.uid}`} key={index} className="  ">
                    <VenueCard arr={arr} />
                  </Link>
                ))}
              </Slider>
            ) : (
              <p>No venues available</p>
            )}
          </div>
        </div>
      </div>

      {/* all  */}
      <div>
        <div>
          <p className="md:text-3xl lg:px-[100px] md:px-[70px] px-6 text-[32px] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather p-4">
            All{" "}
            <span className="customGabriola font-normal text-pink">
              Destinations
            </span>
          </p>
          <div className="justify-center flex flex-wrap gap-10 px-6">
            {venue.map((venue, index) => (
              <Link
                href={`/venues/${venue.uid}`}
                key={index}
                className=" rounded  min-h-[450px] lg:h-[488px] lg:w-[398px] md:w-[320px] w-full"
              >
                <VenueCard arr={venue} />

               
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Space50px />

      <ContactUsPhoto />
      <Space50px />
      {/* <Discription /> */}
      <div>
        <FAQ faqData={venueFAQ} />
      </div>
    </>
  );
};

export default Page;
