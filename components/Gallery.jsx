import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "@/styles/gallery.css";

export default function Gallery({ images }) {
  if (!Array.isArray(images)) {
    return null; 
  }


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className="w-screen  ">
     <div className="hidden md:block">
     <Carousel
      key={images.index}
        additionalTransfrom={0}
        arrows={false}  
        autoPlaySpeed={3000}
        centerMode
        className="xl:h-[600px] lg:h-[600px] md:h-[400px]"
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
            items: 2,
            // partialVisibilityGutter: 80,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            // partialVisibilityGutter: 80,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
            // partialVisibilityGutter: 80,
          },
          lagre: {
            breakpoint: {
              max: 1440,
              min: 1024,
            },
            items: 2,
            // partialVisibilityGutter: 80,
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
            className="xl:w-[450px] lg:w-[320px] lg:h-[450px] md:w-[350px]   md:h-[300px]  hidden md:block  object-fit rounded-lg"
            src={photo}
            alt={index}
            key={index} 

          />

        ))}
      </Carousel>
   
     </div>
     <div className="mt-10">
  
  <Carousel
  arrows={false}
  responsive={responsive}>
  {images.map((photo, index) => (
         <div className="px-6">
           <img
            className="w-full  md:hidden h-[450px] object-cover rounded-xl bg-black"
            src={photo}
            alt={index}
            key={index} 

          />
         </div>
        ))}
  </Carousel>
       </div>
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
