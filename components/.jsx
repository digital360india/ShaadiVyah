import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
const PhotographerCard = ({ arr }) => {
    return (
        <div className="w-full ">
          <Slider {...sliderSettings}>
            {arr.map((data) => (
              <Link href={`/photographervendor/${data.id}`} key={data.id}>
                <div className="w-full px-2">
                  <Image
                    src={data?.bannerImageUrl || "/images/hero.png"}
                    width={1000}
                    height={1000}
                    className="w-full rounded-t-lg h-[50%]"
                  />
                  <div className="px-5 py-3 space-y-3 w-full bg-gray-200 rounded-b-lg">
                    <div className="flex justify-between">
                      <p>{data?.bussinessName}</p>
                      <div>
                        <p>
                          {data?.rating} ({data?.totalRatings})
                        </p>
                      </div>
                    </div>
                    <div>
                      <p>{data?.location}</p>
                    </div>
                    {/* <p>{venue?.about}</p> */}
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      );
}

export default PhotographerCard