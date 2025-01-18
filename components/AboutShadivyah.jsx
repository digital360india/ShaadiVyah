import React from "react";
export default function AboutShadivyah() {
  return (
    <div>
      <div className="  w-full xl:px-[100px] py-[60px] md:px-[60px] px-6  bg-white  lg:flex justify-evenly text-center font-Merriweather ">
        <div className="space-y-6  pt-10 md:pt-20 justify-center text-center">
          <p className="font-medium text-center font-Merriweather ">
            About ShadiVyah
          </p>
          <div className="flex justify-center ">
          <h1 className="xl:text-[48px] text-[32px] xl:w-[650px]  font-semibold font-Merriweather text-[#C9184A] justify-center text-center  ">
          ShadiVyah: Your Uttarakhand Wedding Experts

          </h1>
          </div>
          <div className="md:flex  lg:gap-40 md:gap-16">
            <div className="py-10">
              <img
                src={"/images/venus_page.png"}
                alt={"image"}
                height={1000}
                width={1000}
                className=" lg:w-[503px] md:w-full lg:h-[523px] md:h-[400px] h-[200px] object-cover"
              />
            </div>
            <div className="space-y-8 md:mt-10">
              <p className="lg:text-[50px] md:text-[32px] text-[14px] md:text-start text-[#02394A] font-fira-sans lg:w-[507px] text-center">
                Get the Best in the Business{" "}
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <p className="lg:mt-2">
                    <img
                      src="/images/mandlart.svg"
                      alt={"image"}
                      height={1000}
                      width={1000}
                      className=" w-6"
                    />
                  </p>
                  <p className="md:font-semibold font-medium font-Merriweather-Sans text-[#02394A] lg:text-[25px] md:text-[16px]">
                    Best Quality Services
                  </p>
                </div>
                <div className="flex gap-4">
                <p className="lg:mt-2">
                    <img
                      src="/images/mandlart.svg"
                      alt={"image"}
                      height={1000}
                      width={1000}
                      className=" w-6"
                    />
                  </p>
                  <p className="md:font-semibold font-medium font-Merriweather-Sans text-[#02394A]  lg:text-[25px]  md:text-[16px] md:text-start">
                    100% Satisfaction Guarantee
                  </p>
                </div>
                <div className="flex gap-4">
                <p className="lg:mt-2"> 
                    <img
                      src="/images/mandlart.svg"
                      alt={"image"}
                      height={1000}
                      width={1000}
                      className=" w-6"
                    />
                  </p>
                  <p className="md:font-semibold font-medium font-Merriweather-Sans text-[#02394A]  lg:text-[25px]  md:text-[16px]">
                    Quality Control System
                  </p>
                </div>
                <div className="flex gap-4">
                <p className="lg:mt-2">
                    <img
                      src="/images/mandlart.svg"
                      alt={"image"}
                      height={1000}
                      width={1000}
                      className=" w-6"
                    />
                  </p>
                  <p className="md:font-semibold font-medium font-Merriweather-Sans text-[#02394A]  lg:text-[25px]  md:text-[16px] md:text-start">
                    Commitment to Customer
                  </p>
                </div>
                <div className="flex gap-4">
                <p className="lg:mt-2">
                    <img
                      src="/images/mandlart.svg"
                      alt={"image"}
                      height={1000}
                      width={1000}
                      className=" w-6"
                    />
                  </p>
                  <p className="md:font-semibold font-medium font-Merriweather-Sans text-[#02394A]  lg:text-[25px]  md:text-[16px] md:text-start">
                    Highly Professional Team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
