"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const InstagramFollow = () => {
  const [photos, setPhotos] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  18133721761396406, 18046359278194189, 18077502460633269, 18487239202012924, 18040505393097864
  useEffect(() => {
    const fetchInstagramPhotos = async () => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,media_url,thumbnail_url,permalink,media_type,caption&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_KEY}`
        );
        const data = await response.json();

        const allowedIds = [
          "18133721761396406",
          "18046359278194189",
          "18077502460633269",
          "18487239202012924",
          "17892615384132666",
        ];

        const videos = (data.data || []).filter(
          (item) => item.media_type === "VIDEO" && allowedIds.includes(item.id)
        );

        console.log(videos);

        setPhotos(videos);
      } catch (error) {
        console.error("Error fetching Instagram videos:", error);
      }
    };

    fetchInstagramPhotos();
  }, []);

  return (
    <div className="px-6 xl:px-20 lg:px-10 lg:py-12 py-4">
      <p className="text-[#A11C5C] capitalize lg:text-2xl text-xl mb-8 text-center font-bold font-Merriweather">
        Your dream Wedding, Our Passion
      </p>

      {isSmallScreen ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="w-full"
        >
          {photos.map(({ id, media_url, media_type, permalink }) => (
            <SwiperSlide key={id}>
              <div className="relative overflow-hidden">
                {media_type === "IMAGE" ? (
                  <Image
                    width={500}
                    height={500}
                    src={media_url}
                    alt={`Instagram Post ${id}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  >
                    <source src={media_url} type="video/mp4" />
                  </video>
                )}

                <Link
                  href={permalink}
                  target="_blank"
                  className="absolute inset-0 flex items-center justify-center bg-[#00000085] opacity-0 hover:opacity-100 transition-opacity duration-500"
                >
                  <FaInstagram className="text-white" size={34} />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-1 p-0 md:p-4">
          {photos.map(({ id, media_url, permalink }) => (
            <div key={id} className="group relative overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={media_url} type="video/mp4" />
              </video>

              <Link
                href={permalink}
                target="_blank"
                className="absolute inset-0 flex items-center justify-center bg-[#00000085] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <FaInstagram className="text-white" size={34} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstagramFollow;
