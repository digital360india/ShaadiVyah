import Hero_2 from "@/components/Hero_2";
import Space100px from "@/components/Space100px";
import Link from "next/link";
import React from "react";
const page = () => {
  return (
    <>
      <div className="relative w-full h-[105vh] ">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center">
          <Hero_2
            img={"/images/servicehero.jpg"}
            text={"Turn Wedding Dreams into Stunning Reality with Shaadivyah"}
          />
        </div>
        <img
          src="/icons/gradient.svg"
          alt="Overlay"
          className="absolute inset-0 w-full h-full object-cover "
        />
      </div>
      {/*Hero section*/}
      {/* <Hero_2
        img={"/images/servicehero.jpg"}
        text={"Turn Wedding Dreams into Stunning Reality with Shaadivyah"}
      /> */}
      {/*left component section */}
      <Space100px />
      <div className="w-full xl:px-[100px] px-6 lg:h-[550px] lg:px-[60px] lg:relative   ">
        <img
          src={"/images/wedding_venues.png"}
          alt="image"
          height={1000}
          width={1000}
          className="xl:w-[640px]  xl:h-[410px] md:h-[400px] h-[319px] lg:w-[450px] lg:h-[350px] lg:absolute xl:top-0 xl:left-[100px]  lg:z-10  border-white border-r-8 border-b-8 "
        />
        <img
          src={"/vectors/vector2.png"}
          alt="image"
          height={1000}
          width={1000}
          className="hidden lg:block w-[580px] h-[410px]  lg:absolute -top-[100px] right-[100px] z-10 opacity-10 "
        />
        <div
          className="lg:bg-[url('/icons/rightframe.svg')]  xl:h-[400px]  xl:w-[924px] md:h-[300px] lg:h-[350px]   lg:absolute z-0  xl:top-36 lg:top-32 lg:right-16 xl:right-24 lg:w-[700px] shadow-2xl "
          style={{
            boxShadow: "0 10px 12px rgba(255, 105, 135, 0.2)",
          }}
        >
          <div className="text-center lg:text-start  xl:pl-[400px] px-5 lg:pl-[300px] lg:relative text-pink lg:pt-12 pt-4">
            <div className="text-2xl font-semibold ">WEDDING VENUES</div>
            <div className="flex justify-center items-center">
              <div className=" lg:hidden  border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[300px] "></div>
            </div>
            <div className="h-[30px]"></div>
            <div className="text-lg text-blue xl:w-[479px] md:h-[100px] h-[110px]">
              Discover a variety of stunning wedding venues in Uttarakhand.
              Whether you prefer a luxurious hotel or a rustic outdoor setting,
              we have options to suit every taste.
            </div>
          </div>
          <div className="flex flex-row xl:pt-14 xl:gap-16 xl:pr-10 lg:pr-52 xl:justify-start  pt-4 gap-16  justify-center items-center pb-8    ">
            <div className="hidden lg:block border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[270px] ml-[64px]"></div>
            <Link
              href={`/venues`}
              className="border-b-2 border-spacing-0 border-pink text-pink"
            >
              <p>Explore now</p>
            </Link>
          </div>
        </div>
      </div>
      <Space100px />
      <div className="w-full xl:px-[100px] px-6  lg:px-[60px] relative lg:h-[550px]">
        <img
          src={"/images/photography_service_page.png"}
          alt="image"
          height={1000}
          width={1000}
          className="xl:w-[640px] xl:h-[410px] md:h-[400px] h-[319px]  lg:w-[450px] lg:h-[350px] lg:absolute xl:top-0 xl:right-[100px] lg:right-[60px]   z-10  border-white border-l-8 border-b-8 object-center object-cover "
        />
        <img
          src={"/vectors/Vector.png"} 
          alt="image"
          height={1000}
          width={1000}
          className="hidden lg:block w-[330px] h-[300px] absolute -top-[70px] left-[100px] z-10 opacity-10 "
        />
        <div
          style={{
            boxShadow: "0 10px 12px rgba(255, 105, 135, 0.2)",
          }}
          className="lg:bg-[url('/icons/leftframe.svg')]  xl:h-[400px] xl:w-[924px] lg:absolute z-0 lg:h-[350px] lg:w-[700px] xl:top-36 lg:top-32 xl:left-24  shadow-2xl text-center lg:text-start px-5 "
        >
          <div className="xl:pl-[36px] lg:pr-[300px] lg:relative text-pink xl:pt-10 pt-4">
            <div className="text-2xl font-semibold">PHOTOGRAPHERS</div>
            <div className="flex justify-center items-center">
              <div className=" lg:hidden border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[300px] "></div>
            </div>
            <div className="h-[30px]"></div>
            <div className="text-lg text-blue xl:w-[479px] h-[100px] w-full">
              Choose from our selection of top photographers who specialize in
              capturing the essence of your wedding day.
            </div>
          </div>
          <div className=" flex-row-reverse xl:pt-14 gap-72 xl:pr-24 xl:justify-start flex justify-center items-center pt-4 pb-8  ">
            <div className="hidden lg:block border-0 border-transparent bg-gradient-to-r from-[#FFB5A7] to-[#C9184A] h-[2px] w-[270px] xl:ml-[100px]"></div>
            <Link
              href={`/photographersvendors`}
              className="border-b-2 border-spacing-0 border-pink text-pink  "
            >
              <p className="">Explore now</p>
            </Link>
          </div>
        </div>
      </div>
      <Space100px />
      <div className="w-full xl:px-[100px] px-6 lg:h-[550px] lg:px-[60px] lg:relative   ">
        <img
          src={"/images/bridal_services_page.png"}
          alt="image"
          height={1000}
          width={1000}
          className="xl:w-[640px]  xl:h-[410px] md:h-[400px] h-[319px] lg:w-[450px] lg:h-[350px] lg:absolute xl:top-0 xl:left-[100px]  lg:z-10    border-b-8 object-center object-cover"
        />
        <img
          src={"/vectors/vector2.png"}
          alt="image"
          height={1000}
          width={1000}
          className="hidden lg:block w-[580px] h-[410px]  lg:absolute -top-[100px] right-[100px] z-10 opacity-10 "
        />
        <div
          style={{
            boxShadow: "0 10px 12px rgba(255, 105, 135, 0.2)",
          }}
          className="lg:bg-[url('/icons/rightframe.svg')]  xl:h-[400px]  xl:w-[924px] md:h-[300px] lg:h-[350px]   lg:absolute z-0  xl:top-36 lg:top-32 lg:right-16 xl:right-24 lg:w-[700px] shadow-2xl "
        >
          <div className="text-center lg:text-start  xl:pl-[400px] px-5 lg:pl-[300px] lg:relative text-pink lg:pt-12 pt-4">
            <div className="text-2xl font-semibold ">BRIDAL MAKEUP</div>
            <div className="flex justify-center items-center">
              <div className=" lg:hidden  border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[300px] "></div>
            </div>
            <div className="h-[30px]"></div>
            <div className="text-lg text-blue xl:w-[479px] h-[100px]">
              Our professional makeup artists will enhance your natural beauty,
              making sure you look radiant on your special day.
            </div>
          </div>
          <div className="flex flex-row xl:pt-14 xl:gap-16 xl:pr-10 lg:pr-52 xl:justify-start  pt-4 gap-16  justify-center items-center pb-8    ">
            <div className="hidden lg:block border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[270px] ml-[64px]"></div>
            <Link
              href={`/makeupvendors`}
              className="border-b-2 border-spacing-0 border-pink text-pink"
            >
              <p>Explore now</p>
            </Link>
          </div>
        </div>
      </div>
      <Space100px />
      <div className="w-full xl:px-[100px] px-6  lg:px-[60px] relative lg:h-[550px]">
        <img
          src={"/images/mehndi_services_page.png"}
          alt="image"
          height={1000}
          width={1000}
          className="xl:w-[640px] xl:h-[410px] md:h-[400px] h-[319px]  lg:w-[450px] lg:h-[350px] lg:absolute xl:top-0 xl:right-[100px] lg:right-[60px]   z-10  border-white border-l-8 border-b-8 object-center "
        />
        <img
          src={"/vectors/Vector.png"}
          alt="image"
          height={1000}
          width={1000}
          className="hidden lg:block w-[330px] h-[300px] absolute -top-[70px] left-[100px] z-10 opacity-10 "
        />
        <div
          style={{
            boxShadow: "0 10px 12px rgba(255, 105, 135, 0.2)",
          }}
          className="lg:bg-[url('/icons/leftframe.svg')]  xl:h-[400px] xl:w-[924px] lg:absolute z-0 lg:h-[350px] lg:w-[700px] xl:top-36 lg:top-32 xl:left-24  shadow-2xl text-center lg:text-start px-5 "
        >
          <div className="xl:pl-[36px] lg:pr-[300px] lg:relative text-pink xl:pt-10 pt-4">
            <div className="text-2xl font-semibold ">MEHNDI ARTISTS</div>
            <div className="flex justify-center items-center">
              <div className=" lg:hidden border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[300px] "></div>
            </div>
            <div className="h-[30px]"></div>
            <div className="text-lg text-blue xl:w-[479px] w-full h-[100px]">
              Our talented mehndi artists create beautiful, intricate designs
              that reflect your style and culture.
            </div>
          </div>
          <div className=" flex-row-reverse xl:pt-14 gap-72 xl:pr-24 xl:justify-start flex justify-center items-center pt-4 pb-8  ">
            <div className="hidden lg:block border-0 border-transparent bg-gradient-to-r from-[#FFB5A7] to-[#C9184A] h-[2px] w-[270px] xl:ml-[100px]"></div>
            <Link
              href={`/mehandivendors`}
              className="border-b-2 border-spacing-0 border-pink text-pink  "
            >
              <p className="">Explore now</p>
            </Link>
          </div>
        </div>
      </div>
      <Space100px />
      {/* <div   className="w-full xl:px-[100px] px-6 lg:h-[550px] lg:px-[60px] lg:relative   ">
        <img
          src={"/images/wedding_venues.png"}
          alt="image"
          height={1000}
          width={1000}
          className="xl:w-[800px]  xl:h-[410px] md:h-[400px] h-[319px] lg:w-[450px] lg:h-[350px] lg:absolute xl:top-0 xl:left-[100px]  lg:z-10 filter grayscale hover:filter-none border-white border-r-8 border-b-8 "
        />
        <img
          src={"/vectors/vector2.png"}
          alt="image"
          height={1000}
          width={1000}
          className="hidden lg:block w-[580px] h-[410px]  lg:absolute -top-[100px] right-[100px] z-10 opacity-10 "
        />
        <div className="bg-peach xl:h-[400px]  xl:w-[924px] md:h-[300px] lg:h-[350px]   lg:absolute z-0  xl:top-36 lg:top-32 lg:right-16 xl:right-24 lg:w-[700px] shadow-2xl ">
          <div className="text-center lg:text-start  xl:pl-[400px] px-5 lg:pl-[300px] lg:relative text-pink lg:pt-12 pt-4">
            <div className="text-2xl font-semibold ">DECORATORS</div>
            <div className="flex justify-center items-center">
            <div className=" lg:hidden  border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[300px] "></div>
            </div>
            <div className="h-[30px]"></div>
            <div className="text-lg text-blue xl:w-[479px]">
            Transform your wedding venue with our expert decorators who bring your vision to life with creativity and flair.
            </div>
          </div>
          <div className="flex flex-row xl:pt-14 xl:gap-16 xl:pr-10 lg:pr-52 xl:justify-start  pt-4 gap-16  justify-center items-center pb-8    ">
            <div className="hidden lg:block border-0 border-transparent bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] h-[2px] w-[270px] ml-[64px]"></div>
            <Link href={`/`} className="border-b-2 border-spacing-0 border-pink text-pink">
              <p>Explore now</p>
            </Link>
          </div>
        </div>
      </div> */}
      {/* <Space100px /> */}
    </>
  );
};
export default page;
