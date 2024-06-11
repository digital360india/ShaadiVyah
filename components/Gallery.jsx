import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "@/styles/gallery.css";

export default function Gallery({ images }) {
  if (!Array.isArray(images)) {
    return null; 
  }

  return (
    <div className="w-screen  ">
      <Carousel
      key={images.index}
        additionalTransfrom={0}
        arrows={false}  
        autoPlaySpeed={3000}
        centerMode
        className="h-[500px]"
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
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        customButtonGroup={<CustomButtonGroup />}
      >
        {images.map((photo, index) => (
          <img
            className="xl:w-[700px] xl:h-[350px] w-[300px] h-[250px] object-cover rounded-lg"
            src={photo}
            alt={index}
            key={index} 

          />
        ))}
      </Carousel>
    </div>
  );
}
function CustomButtonGroup({ next, previous }) {
  return (
    <div className="custom-button-group">
      <button onClick={previous} className="button-previous">
        <img src="/icons/previous.png" alt="Previous" className="arrow-icon" />
      </button>
      <button onClick={next} className="button-next">
        <img src="/icons/next.png" alt="Next" className="arrow-icon" />
      </button>
    </div>
  );
}
