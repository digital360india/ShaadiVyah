"use client";
import Discription from "@/components/Discription";
import FAQ from "@/components/FAQ";
import HeadingsVenueSection from "@/components/HeadingsVenueSection";
import Hero_2 from "@/components/Hero_2";
import Space25px from "@/components/Space25px";
import Space50px from "@/components/Space50px";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import PhotographerCard from "@/components/PhotographerCard";
import { useRouter } from "next/navigation";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import ContactUsPhoto from "@/components/ContactUsPhoto";
import { MdOutlineStar } from "react-icons/md";
import PhotographerVendorCard from "@/components/PhotographerVendorCard";

const Page = () => {
  const [data, setData] = useState([]);
  const photographerFAQs = [
    {
      question:
        "How do I find the right photographer for my wedding on Shaadivyah?",
      answer:
        "Browse through the photographers' profiles on our platform. Shaadivyah will help you select the best photographer based on your style and requirements.",
    },
    {
      question:
        "What types of wedding photography services do photographers offer?",
      answer:
        "Our photographers offer a range of services, including pre-wedding shoots, wedding day photography, candid photography, traditional photography, and videography. Shaadivyah will help you choose the right package.",
    },
    {
      question:
        "Can I see examples of a photographer’s previous work before booking?",
      answer:
        "Yes, each photographer’s profile includes a portfolio of their previous work. Shaadivyah will also provide additional samples and references upon request.",
    },
    {
      question: "Do photographers offer customizable packages?",
      answer:
        "Yes, many photographers offer customizable packages tailored to your specific needs and preferences. Shaadivyah will assist in creating a package that suits your requirements.",
    },
    {
      question:
        "How long in advance should I book a photographer for my wedding?",
      answer:
        "It is recommended to book a photographer at least 6-12 months in advance to ensure their availability, especially during peak wedding seasons. Shaadivyah will help you with the booking process.",
    },
    {
      question: "What is the cost of hiring a photographer through Shaadivyah?",
      answer:
        "The cost varies based on the photographer’s experience, the type of services required, and the duration of the event. Shaadivyah will provide you with a detailed quote after discussing your specific requirements.",
    },
  ];

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("vendorTypeUID", "==", "photographersvendor"),
          where("approval", "==", true)
        );
        const dataSnapshot = await getDocs(q);
        const dataList = dataSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(dataList);
      } catch (error) {
        console.error("Error fetching venues: ", error);
      }
    };

    fetchVenues();
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
  const handleSearch = (selectedLocation) => {
    router.push(`/search/${selectedLocation}/Photographers`);
  };
  const sliderwedding = {
    dots: false,
    infinite: true,
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
    slidesToShow: 6,
    slidesToScroll: 1,
    //   centerMode: true,
    // centerPadding: "100px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1450, // xl
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

  return (
    <>
      <Hero_2
        img={"/images/venus_page.png"}
        text={"Lorem ipsum dolor sit amet consectetur."}
      />
      <Space50px />
      {/* <div>
        <div className="lg:px-10 px-6 bg-cream">
          <p className="md:text-3xl  text-[32px] font-semibold text-pink  font-Merriweather p-4 ">
            Wedding <span className="customGabriola font-normal">Photographers</span>
          </p>

          <div className="p-4 ">
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
                <div>
 
                </div>
  
              </Slider>
          </div>
        </div>
      </div> */}
      <Space25px />
      {/* populer  */}
      <div className=" py-16  relative  z-20 lg:px-10 px-6 ">
        <div className="">
          <p className="md:text-3xl text-[32px] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather p-4">
            Popular{" "}
            <span className="customGabriola font-normal text-pink">Photographers</span>
          </p>
          <div className="px-[15px] ">
            {data.length > 0 ? (
              <Slider {...sliderSettings}>
                {data.map((arr, index) => (
                  <Link
                    href={`/photographersvendor/${arr.uid}`}
                    key={index}
                    className=" rounded shadow-md min-h-[450px] lg:h-[488px] lg:w-[398px] md:w-[320px] w-full"
                  >
                    <PhotographerVendorCard vendor={arr} />
                  </Link>
                ))}
              </Slider>
            ) : (
              <p>No venues available</p>
            )}
          </div>
        </div>
      </div>
      <Space25px />

      <Space50px />
      {/* all  */}
      <div>
        <div>
          <p className="md:text-3xl lg:px-[100px] md:px-[70px] px-6 text-[32px] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217]  font-Merriweather p-4">
            All{" "}
            <span className="customGabriola font-normal text-pink">Photographers </span>
          </p>
          <div className="justify-center flex flex-wrap gap-10 px-6">
            {data.map((data, index) => (
              <Link
                href={`/photographersvendor/${data.uid}`}
                key={index}
                className="bg-white rounded shadow-md min-h-[450px] lg:h-[488px] lg:w-[398px] md:w-[320px] w-full"
              >
                {" "}
                <PhotographerVendorCard vendor={data} />
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
        <FAQ faqData={photographerFAQs} />
      </div>
    </>
  );
};

export default Page;
