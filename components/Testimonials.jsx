import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function Testimonials() {
  return (
    <div className="w-screen h-[631px] overflow-x-hidden">
      <div>
        <p className="font-Fira Sans font-semibold text-[48px] text-[#C9184A] pt-[67px] pb-[47px] text-center">
          Testimonials
        </p>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows={false}  // Set arrows to false
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
            partialVisibilityGutter: 30,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
            partialVisibilityGutter: 30,
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
        <div className="w-[607px] pt-10 bg-[#EBECED] px-6 text-center border border-[#C9184A] rounded-xl ml-20">
          <p className="text-[19px]">
            Lorem ipsum dolor sit amet consectetur. Rutrum ipsum mi ut ac sed in
            volutpat. Mauris cras ut orci non nisl. Lectus risus fermentum
            laoreet eu arcu eget. Viverra sed ante ac enim justo commodo ac
            nunc. Ornare est augue cursus nec. Elit sit purus tellus sagittis id
            tortor dignissim. Magna neque sed magna phasellus. Sodales id
            scelerisque imperdiet consequat in nunc donec. Tempus rutrum
            faucibus lectus orci. Ac condimentum aenean bibendum nam ornare.
            Platea integer.
          </p>{" "}
          <div className="flex items-center justify-center pt-6 pb-10">
            <img
              className="w-16 h-16 rounded-full object-cover border border-gray-300"
              src="/1.jpeg"
              alt=""
            />
            <div className="ml-4 text-left">
              <p className="text-[18px] font-medium text-[#C9184A]">shivam ji</p>
              <p className="text-[#02394A] text-[16px]">developer</p>
            </div>
          </div>
        </div>
        <div className="w-[607px] pt-10 bg-[#EBECED] px-6 text-center border border-[#C9184A] rounded-xl ml-20">
          <p className="text-[19px]">
            Lorem ipsum dolor sit amet consectetur. Rutrum ipsum mi ut ac sed in
            volutpat. Mauris cras ut orci non nisl. Lectus risus fermentum
            laoreet eu arcu eget. Viverra sed ante ac enim justo commodo ac
            nunc. Ornare est augue cursus nec. Elit sit purus tellus sagittis id
            tortor dignissim. Magna neque sed magna phasellus. Sodales id
            scelerisque imperdiet consequat in nunc donec. Tempus rutrum
            faucibus lectus orci. Ac condimentum aenean bibendum nam ornare.
            Platea integer.
          </p>{" "}
          <div className="flex items-center justify-center pt-6 pb-10">
            <img
              className="w-16 h-16 rounded-full object-cover border border-gray-300"
              src="/1.jpeg"
              alt=""
            />
            <div className="ml-4 text-left">
              <p className="text-[18px] font-medium text-[#C9184A]">shivam ji</p>
              <p className="text-[#02394A] text-[16px]">developer</p>
            </div>
          </div>
        </div>
        <div className="w-[607px] pt-10 bg-[#EBECED] px-6 text-center border border-[#C9184A] rounded-xl ml-20">
          <p className="text-[19px]">
            Lorem ipsum dolor sit amet consectetur. Rutrum ipsum mi ut ac sed in
            volutpat. Mauris cras ut orci non nisl. Lectus risus fermentum
            laoreet eu arcu eget. Viverra sed ante ac enim justo commodo ac
            nunc. Ornare est augue cursus nec. Elit sit purus tellus sagittis id
            tortor dignissim. Magna neque sed magna phasellus. Sodales id
            scelerisque imperdiet consequat in nunc donec. Tempus rutrum
            faucibus lectus orci. Ac condimentum aenean bibendum nam ornare.
            Platea integer.
          </p>{" "}
          <div className="flex items-center justify-center pt-6 pb-10">
            <img
              className="w-16 h-16 rounded-full object-cover border border-gray-300"
              src="/1.jpeg"
              alt=""
            />
            <div className="ml-4 text-left">
              <p className="text-[18px] font-medium text-[#C9184A]">shivam ji</p>
              <p className="text-[#02394A] text-[16px]">developer</p>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}