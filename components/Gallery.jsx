import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "@/styles/gallery.css"
export default function Gallery() {
  return (
    <div className="w-screen h-[631px] overflow-x-hidden">
      <div>
        <p className="font-Fira Sans font-semibold text-[48px] text-[#C9184A] pt-[67px] pb-[47px] text-center">
          Wedding
        </p>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows={false}  
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
            partialVisibilityGutter: 80,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 80,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
            partialVisibilityGutter: 80,
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
        <img
          className="xl:w-[520px] xl:h-[350px] w-[200px] h-[250px] ml-16 "
          src="https://w.forfun.com/fetch/01/0192cff3a54b31445228802994c94f79.jpeg"
          alt=""
        />
        <img
          className="xl:w-[520px] xl:h-[350px] w-[200px] h-[250px] ml-16 "
          src="https://w.forfun.com/fetch/01/0192cff3a54b31445228802994c94f79.jpeg"
          alt=""
        />
        <img
          className="xl:w-[520px] xl:h-[350px] w-[200px] h-[250px] ml-16 "
          src="https://w.forfun.com/fetch/01/0192cff3a54b31445228802994c94f79.jpeg"
          alt=""
        />
      </Carousel>
    </div>
  );
}