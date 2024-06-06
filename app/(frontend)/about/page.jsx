import React from "react";
import "@/styles/Textgradient.css";
import Link from "next/link";
export default function page() {
  return (
    <div>
      {/* About ShadiVyah */}
      <div className="xl:px-[100px] lg:px-[50px] md:px-[50px] px-6 py-[70px] flex flex-col lg:flex-row justify-between">
        <div>
          <p className="lg:text-[56px] text-[43px] font-medium xl:w-[676px] lg:w-[500px] ">
            <span className="gradient-text">About ShadiVyah</span>{" "}
            <span>: where excellence meets innovation</span>
          </p>
        </div>
        <div className="space-y-7 mt-6 lg:mt-0">
          <p className="lg:text-[18px] text-[14px]  xl:w-[504px]">
            Welcome to Shaadivyah, your premier choice for destination weddings
            in Rishikesh and the enchanting region of Uttarakhand. We are proud
            to be at the forefront of Prime Minister Narendra Modi's visionary
            'Wed in India' movement, offering couples from around the world the
            chance to celebrate their love in one of India's most spiritually
            uplifting and picturesque locations.
          </p>
          <button className="py-[14px] w-[234px] bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] text-white rounded-3xl">
            Contact Us
          </button>
        </div>
      </div>
      {/* About ShadiVyah */}
      {/* OUR COMMITMENT */}
      <div className="h-[600px] bg-black relative">
        <img
          src="/images/bgimageourcommitment.png"
          height={1000}
          width={1000}
          className="w-screen h-[600px] absolute"
        />
        <div className="absolute  space-x-8  xl:px-[100px] lg:px-[50px] md:px-[50px] px-6  mt-20 ">
          <p className="xl:text-[56px] text-[32px] font-medium">
            <span className="text-white">OUR</span>{" "}
            <span className="text-[#FEC89A]">COMMITMENT</span>
          </p>
          <div className="md:space-y-4 space-y-2 text-white lg:w-[503px] md:w-[350px] text-[14px] lg:text-[18px]">
            <p>
              At Shaadivyah, we understand that your wedding day is one of the
              most significant events in your life. That's why we provide
              comprehensive wedding planning services tailored to your unique
              vision and preferences. From stunning venues and professional
              photographers to expert makeup artists and intricate mehndi
              designs, we ensure every detail is perfect.
            </p>
            <p>
              Our commitment to excellence, combined with our deep knowledge of
              Uttarakhand's most beautiful wedding destinations, makes us the
              ideal partner for your destination wedding in Nainital. Let us
              turn your dream wedding into a reality, surrounded by the
              breathtaking beauty of the Himalayas and the tranquil charm of
              Nainital's lakes.
            </p>
          </div>
        </div>
      </div>
      {/* OUR COMMITMENT */}
      {/* OUR SPECIALIST SERVICES */}
      <div className="xl:mx-[100px] lg:mx-[50px] md:mx-[50px] mx-6 py-10 my-20 bg-[#F9DCC466]">
        <p className="lg:text-[56px] text-[32px] font-medium text-[#02394A] text-center">
          OUR SPECIALIST SERVICES
        </p>
        <p className="lg:text-[17px] text-[13px] font-medium text-[#C9184A] text-center">
          Led by experts in each respective field, our specialist services teams
          execute requests with swift authority whilst always watching for
          what's next.
        </p>
        <div className="xl:px-[60px] lg:px-[30px] lg:flex-nowrap px-10 flex flex-col md:flex-row md:flex-wrap xl:gap-10 lg:gap-5 md:gap-10 gap-5  mt-12 justify-center items-center">
          <Link
            href={"/venues"}
            className="h-[244px] lg:w-[244px] w-[300px] md:w-[270px] bg-black rounded-xl relative"
          >
            <img
              src="/images/venus_page.png"
              height={1000}
              width={1000}
              className="lg:w-[244px] w-[300px] md:w-[270px] h-[244px] absolute  rounded-xl object-cover object-left"
            />
            <p className="text-[18px] font-medium text-white px-9 absolute bottom-7">
              WEDDING VENUES
            </p>
          </Link>
          <Link
            href={"/photographervendors"}
            className="h-[244px] lg:w-[244px] w-[300px] md:w-[270px] bg-black rounded-xl relative"
          >
            <img
              src="/images/photography_service_page.png"
              height={1000}
              width={1000}
              className="lg:w-[244px] w-[300px] md:w-[270px] h-[244px] absolute rounded-xl object-cover object-left"
            />
            <p className="text-[18px] font-medium text-white px-9 absolute bottom-7">
              PHOTOGRAPHERS
            </p>
          </Link>
          <Link
            href={"/makeupvendors"}
            className="h-[244px] lg:w-[244px] w-[300px] md:w-[270px] bg-black rounded-xl relative"
          >
            <img
              src="/images/hero.png"
              height={1000}
              width={1000}
              className="lg:w-[244px] w-[300px] md:w-[270px] h-[244px] absolute rounded-xl object-cover object-left"
            />
            <p className="text-[18px] font-medium text-white px-9 absolute bottom-7">
              MAKE UP ARTISTS
            </p>
          </Link>
          <Link
            href={"/mehandivendors"}
            className="h-[244px] lg:w-[244px] w-[300px] md:w-[270px] bg-black rounded-xl relative"
          >
            <img
              src="/images/mehndi_services_page.png"
              height={1000}
              width={1000}
              className="lg:w-[244px] w-[300px] md:w-[270px] h-[244px] absolute rounded-xl object-cover object-right"
            />
            <p className="text-[18px] font-medium text-white px-9 absolute bottom-7">
              MEHNDI ARTISTS
            </p>
          </Link>
        </div>
      </div>
      {/* OUR SPECIALIST SERVICES */}
      {/* OUR APPROACH */}
      <div className="xl:px-[100px] lg:px-[50px] md:px-[50px] px-6">
        <p className="lg:text-[24px] font-medium text-[#02394A]">
          OUR APPROACH
        </p>
        <p className="lg:text-[48px] text-[32px] font-medium text-[#02394A] mb-10">
          <span>REMOTE</span>, <span className="text-[#C9184A]">EXCLUSIVE</span>
          , <span>SEAMLESS</span>
        </p>
        <div className="lg:flex justify-between">
          <div className="lg:w-[509px]  space-y-7 ">
            <li className="lg:text-[18px] text-[14px]">
              We discuss your vision and requirements to create a personalized
              plan.
            </li>
            <li className="lg:text-[18px] text-[14px]">
              Our team manages all logistics, ensuring a seamless experience.
            </li>
            <li className="lg:text-[18px] text-[14px]">
              {" "}
              We oversee every detail on your big day, providing support and coordination.
            </li>
            <button className="hidden lg:block py-[14px] w-[234px] bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] rounded-3xl text-white">
              Contact Us
            </button>
          </div>
          <img src="/images/bangles.png" className="bg-black lg:h-[400px] lg:w-[627px] h-[220px] mt-4 lg:mt-0"></img>
          <div className="flex justify-center items-center mt-7">
            <button className="block lg:hidden py-[14px] w-[234px] bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] rounded-3xl text-white">
              Contact Us
            </button>
          </div>
        </div>
      </div>
      {/* OUR APPROACH */}
      {/* Make an Enquiry */}
      <div className="bg-[#F9DCC4] lg:py-[48px] py-8 mt-40  ">
        <p className="lg:text-[56px] text-[40px] font-medium text-[#C9184A] text-center">
          Make an Enquiry
        </p>
        <div className="xl:px-[140px] pl-6 md:pl-16 lg:pl-32 flex flex-col justify-center items-center ">
          <p className="text-[#02394A] text-[32px] xl:text-[56px] font-light ">
            Please share your{" "}
            <input
              className="placeholder:text-center  border-b border-b-black bg-transparent   "
              type="text "
              placeholder="name"
            />{" "}
          </p>
          <p className="text-[#02394A] text-[32px] xl:text-[56px] font-light ">
            and your{" "}
            <input
              className="placeholder:text-center border-b border-b-black bg-transparent   "
              type="text "
              placeholder="phone number"
            />{" "}
          </p>
          <p className="text-[#02394A] text-[32px] xl:text-[56px] font-light ">
            {" "}
            <input
              className="placeholder:text-center border-b border-b-black bg-transparent lg:w-[800px] md:w-[600px]   xl:w-[1037px] mt-10"
              type="text "
              placeholder=" message"
            />{" "}
          </p>
          <p className="text-[#02394A] text-[32px] xl:text-[56px] font-light ">
            {" "}
            Lets figure out what project we can do together.{" "}
          </p>
        </div>
        <div className="flex justify-center items-center mt-16">
          <button className="py-[14px] w-[234px] bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] rounded-3xl text-white">
            Submit
          </button>
        </div>
      </div>
      {/* Make an Enquiry */}
    </div>
  );
}
