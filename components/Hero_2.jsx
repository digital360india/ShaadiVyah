import React from "react";
const Hero_2 = ({ img, text }) => {
  return (
    <>
      <div>
        <img
          src={img}
          height={1000}
          width={1000}
          className="w-screen h-[100vh] md:object-cover object-cover md:mt-16 lg:mt-0 "
        />
        <p className="z-10 font-Merriweather absolute lg:left-[100px]  lg:top-[405px]  md:left-[60px] md:top-[404px] text-white md:text-[50px] md:font-semibold text-[40px] font-medium top-[150px] w-[300px] left-[24px] md:w-[640px] leading-[70px] backdrop-blur-md backdrop-opacity-20"> 
          {text}
        </p>
      </div>
    </> 
  );
};
export default Hero_2;
