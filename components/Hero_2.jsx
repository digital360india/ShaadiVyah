import Image from "next/image";
import React from "react";
const Hero_2 = ({ img, text }) => {
  return (
    <>
      |
      <div >
        <Image src={img} height={1000} width={1000} className="w-screen h-[500px]" />
        <p
          className="absolute lg:left-[100px]  lg:top-[405px]  md:left-[60px] md:top-[404px] text-white md:text-[60px] md:font-semibold text-[40px] font-medium top-[260px] left-[24px] md:w-[503px]   leading-[70px] backdrop-blur-md backdrop-opacity-20 object-fill"
        >
          {text}
        </p>
      </div>
    </>
  );
};
export default Hero_2;