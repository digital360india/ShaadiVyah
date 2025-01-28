"use client";
import DestinationCard from "@/components/DestinationCard";
import Discription from "@/components/Discription";
import FAQ from "@/components/FAQ";
import Hero_2 from "@/components/Hero_2";
import Space50px from "@/components/Space50px";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
// import ContactUsPhoto from "@/components/ContactUsPhoto";
import { useRouter } from "next/navigation";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import ContactUsPhoto from "@/components/ContactUsPhoto";
import { MdOutlineStar } from "react-icons/md";
import MakeupVendorCard from "@/components/MakeupCard";
import Image from "next/image";

const Page = () => {
  const [makeupArtist, setMakeupArtist] = useState([]);
  const router = useRouter();
  const makeupArtistsFAQs = [
    {
      question: "How do I find a makeup artist for my wedding on Shaadivyah?",
      answer:
        "Browse through the makeup artists' profiles on our platform. Shaadivyah will help you select the best artist based on your preferences and needs.",
    },
    {
      question: "What makeup styles can I choose from for my wedding?",
      answer:
        "Our makeup artists offer a range of styles, including traditional bridal, contemporary, natural, glamorous, and customized looks. Shaadivyah will help match you with an artist who can create your desired look.",
    },
    {
      question: "Do makeup artists offer trial sessions?",
      answer:
        "Yes, many makeup artists offer trial sessions so you can test their services and finalize your look before the wedding day. Shaadivyah will assist in arranging these trials.",
    },
    {
      question: "How long does bridal makeup usually take?",
      answer:
        "Bridal makeup typically takes around 1.5 to 3 hours, depending on the complexity of the look and any additional services such as hair styling.",
    },
    {
      question:
        "Can makeup artists accommodate group bookings for my bridal party?",
      answer:
        "Yes, most makeup artists can accommodate group bookings for your bridal party, including bridesmaids, family members, and guests. Shaadivyah will help coordinate these arrangements.",
    },
    {
      question:
        "What is the cost of hiring a makeup artist through Shaadivyah?",
      answer:
        "The cost varies based on the artist's experience and the type of services required. Shaadivyah will provide you with a detailed quote after discussing your specific requirements.",
    },
  ];

  useEffect(() => {
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

    fetchMakeupArtist();
  }, []);

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
    // centerMode: true,
    // centerPadding: "100px",
    speed: 500,
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
        breakpoint: 1480, // xl
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // lg
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

  const handleSearch = (selectedLocation) => {
    router.push(`/search/${selectedLocation}/Makeup`);
  };
  return (
    <>
      <Hero_2
        img={"/images/venus_page.png"}
        text={"Best Makeup Artists in Uttarakhand."}
      />

      <div className=" py-16  relative  z-20 customGabriola text-[25px] ">
        <div className="bg-cream pb-10  lg:px-10 px-6">
          {" "}
          <p className="md:text-3xl  text-[32px] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217]font-Merriweather p-4  ">
            Makeup{" "}
            <span className="customGabriola font-normal text-pink">
              Artists
            </span>
          </p>
          {/* <div className=" ">
            {makeupArtist.length > 0 ? (
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
                  <button
                    onClick={() => handleSearch("Dehradun")}
                    className="  "
                  >
                    <img
                      className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                      src="https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Fdehradun.png?alt=media&token=ca835133-20d4-49da-8df8-265abe292acb"
                      alt=""
                    />
                  </button>
                  <p className="px-[70px] text-[#02394A]">Dehradun</p>
                </div>

                <div>
                  <button
                    onClick={() => handleSearch("Haridwar")}
                    className="  "
                  >
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
                  <button
                    onClick={() => handleSearch("Ramnagar")}
                    className="  "
                  >
                    <img
                      className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                      src="https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Frudraprayag.png?alt=media&token=7a3a75a3-4751-498e-8410-6ab0d37a1990"
                      alt=""
                    />
                  </button>
                  <p className="px-[70px] text-[#02394A]">Ramnagar</p>
                </div>
                <div>
                  <button
                    onClick={() => handleSearch("Nainital")}
                    className="  "
                  >
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
            ) : (
              <p>No data available</p>
            )}
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
                {
                  city: "Ramnagar",
                  src: "https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Frudraprayag.png?alt=media&token=7a3a75a3-4751-498e-8410-6ab0d37a1990",
                },
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

      <div>
        <div className=" py-16  relative  z-20  lg:px-10 px-6 ">
          <div className="">
            <p className="md:text-3xl text-[32px] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217]font-Merriweather p-4 ">
              Popular{" "}
              <span className="customGabriola font-normal text-pink">
                {" "}
                Makeup Artists
              </span>
            </p>
            <div className="px-[15px] ">
              {makeupArtist.length > 0 ? (
                <Slider {...sliderSettings}>
                  {makeupArtist.map((arr, index) => (
                    <Link
                      href={`/makeupvendors/${arr.uid}`}
                      key={arr.uid}
                      className=" py-4  md:px-1 "
                    >
                      <MakeupVendorCard vendor={arr} />
                    </Link>
                  ))}
                </Slider>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Space50px />
      {/* all  */}
      <div>
        <div>
          <p className="md:text-3xl lg:px-[100px] md:px-[70px] px-6 text-[32px] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather p-4">
            All{" "}
            <span className="customGabriola font-normal text-pink">
              Makeup Artists
            </span>
          </p>
          <div className="justify-center flex flex-wrap gap-10 px-6">
            {makeupArtist.map((data, index) => (
              <Link
                href={`/makeupvendors/${data.uid}`}
                key={index}
                className=" rounded  min-h-[450px] lg:h-[488px] lg:w-[398px] md:w-[320px] w-full"
              >
                <MakeupVendorCard vendor={data} />
                {/* <img
                  src={data.bannerImageUrl || "/logo.png"}
                  alt={data.businessName}
                  className="w-full h-60     rounded-t-[4px] object-cover "
                />
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center h-[30px]">
                    <h3 className="lg:text-xl font-semibold mb-2">
                      {data.businessName}
                    </h3>
                    <p className="flex justify-end items-center mb-2  gap-0">
                      {" "}
                      <p className="text-pink mt-1  ">
                        {" "}
                        {data.averageRating?.toFixed(2) || 3}{" "}
                      </p>{" "}
                      <p>
                        <MdOutlineStar className="text-yellow-300 text-xl " />
                      </p>
                    </p>
                  </div>
                  <div className="flex justify-start gap-2">
                    <img src="/icons/locationred.svg" alt="location icon" />
                    <p className="text-[18px] text-[#666666]">
                      {data.location}
                    </p>
                  </div>
                  <p className="text-sm py-4 h-[68px]">
                    {truncateText(data.about, 20)}
                  </p>
                </div>
                <div className="absolute top-150 left-20">
                  <div className="block">
                    <div className="flex flex-row justify-between">
                      <div className="bg-[#dad9d9] py-2 px-3 rounded-md">
                        <p className="text-[#333333] lg:text-sm text-[10px]">
                          {venue.capacity} pax
                        </p>
                      </div>
                      <div className="bg-[#dad9d9] py-2 px-3 rounded-md">
                        <p className="text-[#333333] lg:text-sm text-[10px]">
                          {venue.rooms} rooms
                        </p>
                      </div>
                    </div> /*
                  </div>
                </div> */}
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
        <FAQ faqData={makeupArtistsFAQs} />
      </div>
    </>
  );
};

export default Page;
