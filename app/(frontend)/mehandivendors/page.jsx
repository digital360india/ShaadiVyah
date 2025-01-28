"use client";
import Discription from "@/components/Discription";
import FAQ from "@/components/FAQ";
import Hero_2 from "@/components/Hero_2";
import Space25px from "@/components/Space25px";
import Space50px from "@/components/Space50px";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import ContactUsPhoto from "@/components/ContactUsPhoto";
import { MdOutlineStar } from "react-icons/md";
import MendhiVendorCard from "@/components/MendhiCard";
import Image from "next/image";

const Page = () => {
  const mendhiArtistsFAQ = [
    {
      question:
        "How do I choose the best Mehndi artist for my wedding on Shaadivyah?",
      answer:
        "Browse through the profiles of Mehndi artists on our platform. Shaadivyah will help you select the best artist based on your style preferences and requirements.",
    },
    {
      question: "What styles of mehndi designs do the artists offer?",
      answer:
        "Our mehndi artists offer a variety of styles, including traditional, Arabic, Indo-Arabic, and customized designs. Shaadivyah will help match you with an artist who specializes in your preferred style.",
    },
    {
      question: "How long does it take to apply for bridal mehndi?",
      answer:
        "The application time varies depending on the complexity of the design. Typically, bridal mehndi can take anywhere from 2 to 6 hours to complete.",
    },
    {
      question:
        "When should I schedule my Mehndi application before the wedding?",
      answer:
        "It is recommended to schedule your mehndi application 1-2 days before the wedding to ensure the color has fully developed.",
    },
    {
      question: "Do Mehndi artists provide aftercare instructions?",
      answer:
        "Yes, our mehndi artists will provide detailed aftercare instructions to ensure your mehndi design lasts longer and maintains its color.",
    },
    {
      question:
        "What is the cost of hiring a Mehndi artist through Shaadivyah?",
      answer:
        "The cost varies based on the artist's experience and the complexity of the design. Shaadivyah will provide you with a detailed quote after discussing your specific requirements.",
    },
  ];
  const [mendhiArtists, setmendhiArtists] = useState([]);
  const router = useRouter();

  useEffect(() => {
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
          setmendhiArtists(data);
        }
      } catch (error) {
        console.error("Error fetching mendhivendors:", error);
      }
    };

    fetchMendhiArtists();
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
    speed: 500,
    //     centerMode: true,
    // centerPadding: "100px",
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

    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
  const handleSearch = (selectedLocation) => {
    router.push(`/search/${selectedLocation}/Mehndi`);
  };

  return (
    <>
      <Hero_2
        img={"/images/venus_page.png"}
        text={"Uttarakhand's Best Mehndi Artists"}
      />
      <Space50px />
      <div>
        <div className="lg:px-10 px-6 bg-cream">
          <p className="md:text-3xl  text-[32px] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather  p-4 ">
            Mehndi{" "}
            <span className="customGabriola font-normal text-pink">
              Artists
            </span>
          </p>

          {/* <div className="p-4 pb-10 customGabriola text-[25px] ">
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
      <Space25px />
      {/* populer  */}
      <div className=" py-16  relative  z-20 lg:px-10 px-6 ">
        <div className="">
          <p className="md:text-3xl text-[32px] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather p-4">
            Popular{" "}
            <span className="customGabriola font-normal text-pink">
              {" "}
              Mehndi Artists
            </span>
          </p>
          <div className="px-[15px] ">
            {mendhiArtists.length > 0 ? (
              <Slider {...sliderSettings}>
                {mendhiArtists.map((arr, index) => (
                  <Link
                    href={`/mehandivendors/${arr.uid}`}
                    key={arr.uid}
                    className=" py-4  "
                  >
                    <MendhiVendorCard arr={arr} />
                  </Link>
                ))}
              </Slider>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
      <Space25px />

      <Space50px />
      {/* all  */}
      <div>
        <div className="">
          <p className="md:text-3xl lg:px-[100px] md:px-[70px] px-6 text-[32px] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217]  font-Merriweather p-4">
            All{" "}
            <span className="customGabriola font-normal text-pink">
              Mendhi Artists
            </span>
          </p>
          <div className="justify-center flex flex-wrap gap-10 px-6 ">
            {mendhiArtists.map((mendhiArtists, index) => (
              <Link
                href={`/mehandivendors/${mendhiArtists.uid}`}
                key={index}
                className=" rounded  min-h-[450px] lg:h-[488px] lg:w-[398px] md:w-[320px] w-full "
              >
                <MendhiVendorCard arr={mendhiArtists} />
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
        <FAQ faqData={mendhiArtistsFAQ} />
      </div>
    </>
  );
};

export default Page;
