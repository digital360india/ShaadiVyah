import React from "react";
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

const MehandiCard = ({ data }) => {
  return (
    <div className="w-full ">
      <Slider {...sliderSettings}>
        {data.map((info) => (
          <Link href={`/mehandivendors/${info.id}`} key={info.id}>
            <div className="w-full px-2">
              <img
                src={info?.bannerImageUrl || "/images/hero.png"}
                width={1000}
                height={1000}
                className="w-full rounded-t-lg h-[50%]"
              />
              <div className="px-5 py-3 space-y-3 w-full bg-gray-200 rounded-b-lg">
                <div className="flex justify-between">
                  <p>{info?.bussinessName}</p>
                  <div>
                    <p>
                      {info?.rating} ({info?.totalRatings})
                    </p>
                  </div>
                </div>
                <div>
                  <p>{info?.location}</p>
                </div>
                {/* <p>{venue?.about}</p> */}
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default MehandiCard;
