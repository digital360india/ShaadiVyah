import Hero_2 from "@/components/Hero_2";
import Space100px from "@/components/Space100px";
import Image from "next/image";
import React from "react";
const page = () => {
  return (
    <>
      {/*Hero section*/}
      <Hero_2
        img={"/images/hero_services_page.png"}
        text={"Lorem ipsum d"}
      />
      {/*left component section */}
      <Space100px />
      <div   className="w-full xl:px-[100px] px-6 lg:h-[550px] lg:px-[60px] lg:relative   ">
        <Image
          src={"/images/wedding_venues.png"}
          alt="image"
          height={1000}
          width={1000}
          className="xl:w-[640px]  xl:h-[410px] md:h-[400px] h-[319px] lg:w-[450px] lg:h-[350px] lg:absolute xl:top-0 xl:left-[100px]  lg:z-10 filter grayscale hover:filter-none border-white border-r-8 border-b-8 "
        />
        <Image
          src={"/vectors/vector2.png"}
          alt="image"
          height={1000}
          width={1000}
          className="hidden lg:block w-[580px] h-[410px]  lg:absolute -top-[100px] right-[100px] z-10 opacity-10 "
        />
        <div className="bg-peach xl:h-[400px]  xl:w-[924px] md:h-[300px] lg:h-[350px]   lg:absolute z-0  xl:top-36 lg:top-32 lg:right-16 xl:right-24 lg:w-[700px] shadow-2xl ">
          <div className="text-center lg:text-start  xl:pl-[400px] px-5 lg:pl-[300px] lg:relative text-pink lg:pt-12 pt-4">
            <div className="text-2xl font-semibold ">WEDDING VENUES</div>
            <div className="flex justify-center items-center">
            <div className=" lg:hidden  border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[300px] "></div>
            </div>
            <div className="h-[30px]"></div>
            <div className="text-lg text-blue xl:w-[479px]">
              Lorem ipsum dolor sit amet consectetur. Integer ac molestie nibh
              risus auctor imperdiet pellentesque. Tempor cursus tortor neque
              sapien interdum ac tortor felis. Ligula facilisis ullamcorper
              augue imperdiet nulla. Lectus nec sed platea aenean nisl{" "}
            </div>
          </div>
          <div className="flex flex-row xl:pt-14 xl:gap-16 xl:pr-10 lg:pr-52 xl:justify-start  pt-4 gap-16  justify-center items-center pb-8    ">
            <div className="hidden lg:block border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[270px] ml-[64px]"></div>
            <div className="border-b-2 border-spacing-0 border-pink text-pink">
              <p>explore now</p>
            </div>
          </div>
        </div>
      </div>
      <Space100px />
      <div className="w-full xl:px-[100px] px-6  lg:px-[60px] relative lg:h-[550px]">
        <Image
          src={"/images/photography_service_page.png"}
          alt="image"
          height={1000}
          width={1000}
          className="xl:w-[640px] xl:h-[410px] md:h-[400px] h-[319px]  lg:w-[450px] lg:h-[350px] lg:absolute xl:top-0 xl:right-[100px] lg:right-[60px]   z-10 filter grayscale hover:filter-none border-white border-l-8 border-b-8 object-center "
        />
        <Image
          src={"/vectors/Vector.png"}
          alt="image"
          height={1000}
          width={1000}
          className="hidden lg:block w-[330px] h-[300px] absolute -top-[70px] left-[100px] z-10 opacity-10 "
        />
        <div className="bg-peach xl:h-[400px] xl:w-[924px] lg:absolute z-0 lg:h-[350px] lg:w-[700px] xl:top-36 lg:top-32 xl:left-24  shadow-2xl text-center lg:text-start px-5 ">
          <div className="xl:pl-[36px] lg:pr-[300px] lg:relative text-pink xl:pt-10 pt-4">
            <div className="text-2xl font-semibold">PHOTOGRAPHERS</div>
            <div className="flex justify-center items-center">
            <div className=" lg:hidden border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[300px] "></div>
            </div>
            <div className="h-[30px]"></div>
            <div className="text-lg text-blue xl:w-[479px] w-full">
              Lorem ipsum dolor sit amet consectetur. Integer ac molestie nibh
              risus auctor imperdiet pellentesque. Tempor cursus tortor neque
              sapien interdum ac tortor felis. Ligula facilisis ullamcorper
              augue imperdiet nulla. Lectus nec sed platea aenean nisl{" "}
            </div>
          </div>
          <div className=" flex-row-reverse xl:pt-14 gap-72 xl:pr-24 xl:justify-start flex justify-center items-center pt-4 pb-8  ">
            <div className="hidden lg:block border-0 border-transparent bg-gradient-to-r from-[#FFB5A7] to-[#C9184A] h-[2px] w-[270px] xl:ml-[100px]"></div>
            <div className="border-b-2 border-spacing-0 border-pink text-pink  ">
              <p className="">explore now</p>
            </div>
          </div>
        </div>
      </div>
      <Space100px />
      <div   className="w-full xl:px-[100px] px-6 lg:h-[550px] lg:px-[60px] lg:relative   ">
        <Image
          src={"/images/wedding_venues.png"}
          alt="image"
          height={1000}
          width={1000}
          className="xl:w-[640px]  xl:h-[410px] md:h-[400px] h-[319px] lg:w-[450px] lg:h-[350px] lg:absolute xl:top-0 xl:left-[100px]  lg:z-10 filter grayscale hover:filter-none border-white border-r-8 border-b-8 "
        />
        <Image
          src={"/vectors/vector2.png"}
          alt="image"
          height={1000}
          width={1000}
          className="hidden lg:block w-[580px] h-[410px]  lg:absolute -top-[100px] right-[100px] z-10 opacity-10 "
        />
        <div className="bg-peach xl:h-[400px]  xl:w-[924px] md:h-[300px] lg:h-[350px]   lg:absolute z-0  xl:top-36 lg:top-32 lg:right-16 xl:right-24 lg:w-[700px] shadow-2xl ">
          <div className="text-center lg:text-start  xl:pl-[400px] px-5 lg:pl-[300px] lg:relative text-pink lg:pt-12 pt-4">
            <div className="text-2xl font-semibold ">WEDDING VENUES</div>
            <div className="flex justify-center items-center">
            <div className=" lg:hidden  border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[300px] "></div>
            </div>
            <div className="h-[30px]"></div>
            <div className="text-lg text-blue xl:w-[479px]">
              Lorem ipsum dolor sit amet consectetur. Integer ac molestie nibh
              risus auctor imperdiet pellentesque. Tempor cursus tortor neque
              sapien interdum ac tortor felis. Ligula facilisis ullamcorper
              augue imperdiet nulla. Lectus nec sed platea aenean nisl{" "}
            </div>
          </div>
          <div className="flex flex-row xl:pt-14 xl:gap-16 xl:pr-10 lg:pr-52 xl:justify-start  pt-4 gap-16  justify-center items-center pb-8    ">
            <div className="hidden lg:block border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[270px] ml-[64px]"></div>
            <div className="border-b-2 border-spacing-0 border-pink text-pink">
              <p>explore now</p>
            </div>
          </div>
        </div>
      </div>
      <Space100px />
      <div className="w-full xl:px-[100px] px-6  lg:px-[60px] relative lg:h-[550px]">
        <Image
          src={"/images/photography_service_page.png"}
          alt="image"
          height={1000}
          width={1000}
          className="xl:w-[640px] xl:h-[410px] md:h-[400px] h-[319px]  lg:w-[450px] lg:h-[350px] lg:absolute xl:top-0 xl:right-[100px] lg:right-[60px]   z-10 filter grayscale hover:filter-none border-white border-l-8 border-b-8 object-center "
        />
        <Image
          src={"/vectors/Vector.png"}
          alt="image"
          height={1000}
          width={1000}
          className="hidden lg:block w-[330px] h-[300px] absolute -top-[70px] left-[100px] z-10 opacity-10 "
        />
        <div className="bg-peach xl:h-[400px] xl:w-[924px] lg:absolute z-0 lg:h-[350px] lg:w-[700px] xl:top-36 lg:top-32 xl:left-24  shadow-2xl text-center lg:text-start px-5 ">
          <div className="xl:pl-[36px] lg:pr-[300px] lg:relative text-pink xl:pt-10 pt-4">
            <div className="text-2xl font-semibold">PHOTOGRAPHERS</div>
            <div className="flex justify-center items-center">
            <div className=" lg:hidden border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[300px] "></div>
            </div>
            <div className="h-[30px]"></div>
            <div className="text-lg text-blue xl:w-[479px] w-full">
              Lorem ipsum dolor sit amet consectetur. Integer ac molestie nibh
              risus auctor imperdiet pellentesque. Tempor cursus tortor neque
              sapien interdum ac tortor felis. Ligula facilisis ullamcorper
              augue imperdiet nulla. Lectus nec sed platea aenean nisl{" "}
            </div>
          </div>
          <div className=" flex-row-reverse xl:pt-14 gap-72 xl:pr-24 xl:justify-start flex justify-center items-center pt-4 pb-8  ">
            <div className="hidden lg:block border-0 border-transparent bg-gradient-to-r from-[#FFB5A7] to-[#C9184A] h-[2px] w-[270px] xl:ml-[100px]"></div>
            <div className="border-b-2 border-spacing-0 border-pink text-pink  ">
              <p className="">explore now</p>
            </div>
          </div>
        </div>
      </div>
      <Space100px />
      <div   className="w-full xl:px-[100px] px-6 lg:h-[550px] lg:px-[60px] lg:relative   ">
        <Image
          src={"/images/wedding_venues.png"}
          alt="image"
          height={1000}
          width={1000}
          className="xl:w-[640px]  xl:h-[410px] md:h-[400px] h-[319px] lg:w-[450px] lg:h-[350px] lg:absolute xl:top-0 xl:left-[100px]  lg:z-10 filter grayscale hover:filter-none border-white border-r-8 border-b-8 "
        />
        <Image
          src={"/vectors/vector2.png"}
          alt="image"
          height={1000}
          width={1000}
          className="hidden lg:block w-[580px] h-[410px]  lg:absolute -top-[100px] right-[100px] z-10 opacity-10 "
        />
        <div className="bg-peach xl:h-[400px]  xl:w-[924px] md:h-[300px] lg:h-[350px]   lg:absolute z-0  xl:top-36 lg:top-32 lg:right-16 xl:right-24 lg:w-[700px] shadow-2xl ">
          <div className="text-center lg:text-start  xl:pl-[400px] px-5 lg:pl-[300px] lg:relative text-pink lg:pt-12 pt-4">
            <div className="text-2xl font-semibold ">WEDDING VENUES</div>
            <div className="flex justify-center items-center">
            <div className=" lg:hidden  border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[300px] "></div>
            </div>
            <div className="h-[30px]"></div>
            <div className="text-lg text-blue xl:w-[479px]">
              Lorem ipsum dolor sit amet consectetur. Integer ac molestie nibh
              risus auctor imperdiet pellentesque. Tempor cursus tortor neque
              sapien interdum ac tortor felis. Ligula facilisis ullamcorper
              augue imperdiet nulla. Lectus nec sed platea aenean nisl{" "}
            </div>
          </div>
          <div className="flex flex-row xl:pt-14 xl:gap-16 xl:pr-10 lg:pr-52 xl:justify-start  pt-4 gap-16  justify-center items-center pb-8    ">
            <div className="hidden lg:block border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[270px] ml-[64px]"></div>
            <div className="border-b-2 border-spacing-0 border-pink text-pink">
              <p>explore now</p>
            </div>
          </div>
        </div>
      </div>
      <Space100px />
    </>
  );
};
export default page;