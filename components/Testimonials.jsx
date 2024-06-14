"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setTestimonials(data);
          console.log(data)
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);
  return (
    <div className="w-screen  bg-white  ">
      <div>
        <p className="font-Fira Sans font-semibold md:text-[48px] text-[32px] md:pb-11 pb-6 text-[#C9184A]  text-center">
          Testimonials
        </p>
      </div>
      <Carousel
            key={testimonials.index}

        additionalTransfrom={0}
        arrows={false} // Set arrows to false
        autoPlaySpeed={3000}
        centerMode
        className=""
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
            partialVisibilityGutter: 10,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            // partialVisibilityGutter: 10,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
            partialVisibilityGutter: 10,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={true}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="lg:pt-10 pt-4 bg-[#EBECED] md:px-6 px-2 text-center border border-[#C9184A] rounded-xl xl:ml-20 lg:ml-10 ml-5"
          >
            <p className="lg:text-[19px] md:text-[14px] text-[12px] xl:h-[200px] lg:h-[240px] md:h-[200px] xl:px-10">
              {testimonial.testimonial}
            </p>
            <div className="flex items-center justify-center md:pt-6 md:pb-10 py-2">
              <img
                className="w-16 h-16 rounded-full object-contain border border-gray-300"
                src={testimonial.imgURL || "/images/logo1.png"}
                alt=""
              />
              <div className="ml-4 text-left">
                <p className="text-[18px] font-medium text-[#C9184A]">
                  {testimonial.name}
                </p>
                <p className="text-[#02394A] text-[16px]">
                  {testimonial.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
