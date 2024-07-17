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
import MehandiCard from "@/components/MehandiCard ";
import { useRouter } from "next/navigation";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import ContactUsPhoto from "@/components/ContactUsPhoto";

const Page = () => {
  const [mendhiArtists, setmendhiArtists] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMendhiArtists = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("vendorTypeUID", "==", "mehndivendor"),
          where('approval' , "==", true)

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
      onClick={onClick}
    />
  );

  // Custom Prev Arrow Component
  const PrevArrow = ({ className, style, onClick }) => (
    <div
      className={`${className} custom-arrow custom-prev-arrow`}
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
      centerMode: true,
  centerPadding: "100px",
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
      <p className="md:text-3xl  text-[32px] font-semibold text-pink font-fira-sans p-4 ">
      Mehndi   <span className="font-dancing-script">Artists</span>
          </p>
       
          <div className="p-4 pb-10 ">
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
                  <button onClick={() => handleSearch("Almora")} className="  ">
                    <img
                      className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                      src="https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Falmora.png?alt=media&token=5e99c7e5-2e71-4803-8349-f28325cb33b4"
                      alt=""
                    />
                  </button>
                  <p className="px-[70px] text-[#02394A]">Almora</p>
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
                    onClick={() => handleSearch("Chamoli")}
                    className="  "
                  >
                    <img
                      className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                      src="https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Fchamoli.png?alt=media&token=acb7527b-2c93-456c-a354-a49ae114556f"
                      alt=""
                    />
                  </button>
                  <p className="px-[70px] text-[#02394A]">Chamoli</p>
                </div>
                <div>
                  <button
                    onClick={() => handleSearch("Rudraprayag")}
                    className="  "
                  >
                    <img
                      className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                      src="https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Frudraprayag.png?alt=media&token=7a3a75a3-4751-498e-8410-6ab0d37a1990"
                      alt=""
                    />
                  </button>
                  <p className="px-[70px] text-[#02394A]">Rudraprayag</p>
                </div>
                <div>
                  <button
                    onClick={() => handleSearch("TehriGarhwal")}
                    className="  "
                  >
                    <img
                      className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                      src="https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Ftehrigarhwal.png?alt=media&token=69a8a14f-4eb2-4c2f-9562-9b7fd9f78545"
                      alt=""
                    />
                  </button>
                  <p className="px-[70px] text-[#02394A]">Tehri Garhwal</p>
                </div>
                <div>
                  <button
                    onClick={() => handleSearch("Uttarkashi")}
                    className="  "
                  >
                    <img
                      className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                      src="https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Futtarkashi.png?alt=media&token=c57d61d7-3998-4d82-9c7b-c203cb4a5a33"
                      alt=""
                    />
                  </button>
                  <p className="px-[70px] text-[#02394A]">Uttarkashi</p>
                </div>
                <div>
                  <button
                    onClick={() => handleSearch("PauriGarhwal")}
                    className="  "
                  >
                    <img
                      className="rounded-md w-[150px] h-[100px] sm:w-[225px] sm:h-[150px]"
                      src="https://firebasestorage.googleapis.com/v0/b/shaadivyah-a1043.appspot.com/o/imagesStatic%2Fpaurigarhwal.png?alt=media&token=eb02f9f7-d18c-4749-8aa0-ec02458c5807"
                      alt=""
                    />
                  </button>
                  <p className="px-[70px] text-[#02394A]">Pauri Garhwal</p>
                </div>
              </Slider>
              </div>
          
      </div>
      </div>
      <Space25px />
      {/* populer  */}
      <div className=" py-16  relative  z-20 lg:px-10 px-6 ">
        <div className="">
          <p className="md:text-3xl text-[32px] font-semibold text-pink font-fira-sans p-4">
            Popular <span className="font-dancing-script">  Mehndi Artists</span>
          </p>
          <div className="px-[15px] ">
            {mendhiArtists.length > 0 ? (
              <Slider {...sliderSettings}>
                {mendhiArtists.map((arr, index) => (
                <Link
                href={`/mehandivendors/${arr.uid}`}
                key={arr.uid}
                className=" py-4  md:px-16 "
              >
                <div className="bg-white rounded  shadow-md lg:h-[488px] lg:w-[398px] ">
                  <img
                    src={arr.bannerImageUrl || "/images/logo1.png"}
                    alt={arr.businessName}
                    className="w-full h-60 object-cover mt-2 rounded-t-[4px]"
                  />
                  <div className=" px-6 py-4 ">
                    {" "}
                    <div className="flex justify-between items-center h-[30px]">
                      {" "}
                      <h3 className="lg:text-xl text-blue  font-semibold mb-2">
                        {arr.businessName}
                      </h3>
                      <p>rating</p>
                    </div>
                    <div className="flex justify-start gap-2">
                      <img src="/icons/locationred.svg" />
                      <p className="text-[18px] text-[#666666]">
                        {arr.location}
                      </p>
                    </div>
                    <p className="text-sm py-4 h-[120px]">
                      {truncateText(arr.about, 30)}
                    </p>
                    {/* <div className="flex justify-between">
                 <div className="bg-[#dad9d9]  py-2 px-3 rounded-md  ">
                   <p className="text-[#333333] lg:lg:text-sm text-[10px]">
                     100-200 pax
                   </p>
                 </div>
                 <div className="bg-[#dad9d9] py-2 px-3 rounded-md  ">
                   <p className="text-[#333333] lg:text-sm text-[10px]">32 rooms</p>
                 </div>{" "}
                 <div className="bg-[#dad9d9] py-2 px-3 rounded-md  ">
                   <p className="text-[#333333] lg:text-sm text-[10px]">32 rooms</p>
                 </div>
               </div> */}
                  </div>
                </div>
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
          <p className="md:text-3xl lg:px-[100px] md:px-[70px] px-6 text-[32px] font-semibold text-pink font-fira-sans p-4">
            All <span className="font-dancing-script">Mendhi Artists</span>
          </p>
          <div className="justify-center flex flex-wrap gap-10 px-6">
            {mendhiArtists.map((mendhiArtists, index) => (
              <Link 
              href={`/mehandivendors/${mendhiArtists.uid}`}
              key={index}
                className="bg-white rounded shadow-md min-h-[450px] lg:h-[488px] lg:w-[398px] md:w-[320px]"
              >
                <img
                  src={mendhiArtists.bannerImageUrl || "/images/logo1.png"}
                  alt={mendhiArtists.businessName}
                  className="w-full h-60 object-cover  rounded-t-[4px] "
                />
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center h-[30px]">
                    <h3 className="lg:text-xl font-semibold mb-2">
                      {mendhiArtists.businessName}
                    </h3>
                    <p>rating</p>
                  </div>
                  <div className="flex justify-start gap-2">
                    <img src="/icons/locationred.svg" alt="location icon" />
                    <p className="text-[18px] text-[#666666]">
                      {mendhiArtists.location}
                    </p>
                  </div>
                  <p className="text-sm py-4 h-[68px]">
                    {truncateText(mendhiArtists.about, 20)}
                  </p>
                </div>
                {/* <div className="absolute top-150 left-20">
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
                    </div>
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
      <Discription />
      <div>
        <FAQ />
      </div>
    </>
  );
};

export default Page;
