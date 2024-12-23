"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getDocs, query, collection, orderBy, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import Space25px from "@/components/Space25px";
import Review from "@/components/Review";
import vendorsFAQs from "@/utils/faq.js";

const DetailPage = () => {
  const currentPage = usePathname();
  const pathArray = currentPage.split("/");
  const uniqueID = pathArray[pathArray.length - 1];
  const [facilities, setFacilities] = useState([]);
  const [additionalServices, setAdditionalServices] = useState([]);
  const [safetyAndSecurityOptions, setSafetyAndSecurityOptions] = useState([]);
  const [accessibilityOptions, setAccessibilityOptions] = useState([]);
  const [attraction, setAttractions] = useState([]);
  const [spaceTypes, setSpaceTypes] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [data, setData] = useState();
  const [amenities, setAmenities] = useState([]);
  useEffect(() => {
    const fetchRoutineData = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("uid", "==", uniqueID))
      );
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => {
          const values = doc.data();

          return {
            name: values.name,
            spaces: values.spaces,
            averageRating: values.averageRating,
            portfolioImagesUrl: values.portfolioImagesUrl
              ? values.portfolioImagesUrl[0]
              : {},
            amenitiesUID: values.amenitiesUID ? values.amenitiesUID : {},
            facilitiesUID: values.facilitiesUID ? values.facilitiesUID : {},
            accessibilityOptionsUID: values.accessibilityOptionsUID
              ? values.accessibilityOptionsUID
              : {},
            safetyAndSecurityOptionsUID: values.safetyAndSecurityOptionsUID
              ? values.safetyAndSecurityOptionsUID
              : {},
            additionalServicesUID: values.additionalServicesUID
              ? values.additionalServicesUID
              : {},
            accessibilityOptionsUID: values.accessibilityOptionsUID
              ? values.accessibilityOptionsUID
              : {},
            attractions: values.attractions ? values.attractions : {},
            uid: values.uid,
            streetAddress: values.streetAddress,
            landmark: values.landmark,
            postCode: values.postCode,
            city: values.city,
            country: values.country,
            about: values.about,
            phoneNumber: values.phone,
            alternateNumber: values.alternateNumber,
            instagram: values.instagram,
            facebook: values.facebook,
            twitter: values.twitter,
            title: values.title,
            id: values.id,
            googleLocation: values.googleLocation,
            businessName: values.businessName,
            description: values.description,
            bannerImageUrl: values.bannerImageUrl,
            portfolioImagesUrl: values.venueLinks,
          };
        });
        console.log(data);
        setData(data[0]);
      }
    };
    const fetchAmenities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "hotelamenities"));
        const amenitiesList = querySnapshot.docs.map((doc) => ({
          amenityName: doc.data().amenityName,
          amenityUID: doc.id,
        }));
        setAmenities(amenitiesList);
      } catch (error) {
        console.error("Error fetching amenities: ", error);
      }
    };
    const fetchfacilites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "hotelfacilities"));
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setFacilities(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const fetchSpaces = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "spacesTypes"));
        const spacesList = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setSpaceTypes(spacesList);
      } catch (error) {
        console.error("Error fetching spaces: ", error);
      }
    };
    const fetchAdditionalServices = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "additionalServices")
        );
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setAdditionalServices(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const fetchSaftey = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "safteyAndSecurity")
        );
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setSafetyAndSecurityOptions(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const fetchAccessibility = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "accessibility"));
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setAccessibilityOptions(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const fetchAttractions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "attractions"));
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setAttractions(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchAttractions();
    fetchAdditionalServices();
    fetchSpaces();
    fetchSaftey();
    fetchAmenities();
    fetchRoutineData();
    fetchAccessibility();
    fetchfacilites();
  }, []);
  const handleShare = async () => {
    const siteUrl = window.location.href;
    navigator.clipboard
      .writeText(siteUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      <div className="overflow-x-hidden">
        <div className="relative flex justify-center items-center mb-40">
          <img
            src={data?.bannerImageUrl}
            height={1000}
            width={1000}
            className="w-full rounded-b-[40px] h-[550px] bg-gray-300 object-cover "
          />

          <div className="absolute lg:-bottom-32 md:-bottom-24 -bottom-16  border  bg-[#FFFFFF] justify-center items-center xl:w-[1078px] lg:w-[900px]  w-[342px] sm:w-[600px] md:w-[650px]  rounded-xl">
            <div className="flex flex-col justify-between">
              {" "}
              <div className="flex flex-row justify-between lg:mx-16 md:mx-10 mx-4 my-5">
                <div className="flex flex-col justify-start items-start">
                  <div className="lg:text-2xl text-[18px] font-semibold text-[#4A4A4A]">
                    {data?.businessName}
                  </div>
                  <div className="flex gap-2 justify-start items-center mt-[10px]">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="black"
                          d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
                        />
                      </svg>
                    </div>

                    <div className="flex gap-1 text-[14px] md:text-[16px]">
                      <p>{data?.city}</p>
                    </div>
                    {data?.googleLocation && (
                      <Link
                        href={data?.googleLocation}
                        className="underline text-gray-700"
                      >
                        <p className="text-[#909090] text-[12px] md:text-[14px]">
                          (View on Map)
                        </p>
                      </Link>
                    )}
                  </div>
                  <div className="text-[#909090] text-sm mt-[4px] hidden  sm:block">
                    {data?.about}
                  </div>
                  <button className="flex gap-2 justify-start items-center mt-[10px]">
                    <img
                      src="/icons/call.svg"
                      height={1000}
                      width={1000}
                      className="md:h-4 md:w-4 h-3 w-3 text-black-600 "
                    />
                    <div className="text-green-700 text-[16px] ">Contact</div>{" "}
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {" "}
                  <div className="md:h-[40px] md:w-[80px] w-[48px] h-[30px]  rounded-sm bg-[#C9184A] flex justify-center items-center gap-2">
                    <img
                      src="/icons/ratingstar.svg"
                      height={1000}
                      width={1000}
                      className="md:h-4 md:w-4 h-3 w-3 text-black-600 "
                    />{" "}
                    <p className=" text-[12px] md:text-[16px] text-white">
                      {data?.averageRating || "3"}
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-2 text-[10px] md:text-[16px] text-[#909090]">
                    <p>{data?.totalRating || "3"}</p>
                    <p>Reviews</p>
                  </div>
                </div>
              </div>
              <div className=" py-3 lg:flex  bg-[#FBFBFB] hidden justify-center items-center text-sm rounded-xl  text-[#4A4A4A]">
                <div className="flex gap-12">
                  {" "}
                  <a href="#photos">
                    {" "}
                    <div className="flex gap-2 justify-center items-center">
                      {" "}
                      <img
                        src="/icons/image.svg"
                        height={1000}
                        width={1000}
                        className="h-4 w-4 text-black-600 "
                      />{" "}
                      <p>Photos</p>{" "}
                    </div>{" "}
                  </a>
                  <div className="h-8 border-l border-gray-600"></div>
                  <div className="flex gap-2 justify-center items-center">
                    {" "}
                    <img
                      src="/icons/like.svg"
                      height={1000}
                      width={1000}
                      className="h-4 w-4 text-black-600 "
                    />
                    <p>Shortlist</p>
                  </div>
                  <div className="h-8 border-l border-gray-600"></div>
                  <div className="flex gap-2 justify-center items-center">
                    {" "}
                    <img
                      src="/icons/review_icon.svg"
                      height={1000}
                      width={1000}
                      className="h-4 w-4 text-black-600 "
                    />
                    <p> Write a Review</p>
                  </div>
                  <div className="h-8 border-l border-gray-600"></div>
                  <button
                    className="flex gap-2 justify-center items-center"
                    onClick={handleShare}
                  >
                    <img
                      src="/icons/share.svg"
                      alt="Share icon"
                      className="h-8 w-4 text-black-600"
                    />
                    <p>Share</p>
                  </button>
                  {isCopied && (
                    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-md shadow-md">
                      Link copied to clipboard!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:flex space-y-4 justify-between items-start   xl:mx-[100px] lg:mx-[80px] md:mx-[60px] mx-6">
          <div className="lg:w-[46%] flex flex-col gap-5 ">
            <div className="md:text-3xl text-2xl  -mt-20 md:-mt-10 lg:-mt-0 font-semibold text-[#4A4A4A] capitalize ">
              {data?.businessName}
              <div className="flex  justify-between items-center text-sm font-normal text-white mt-5">
                <div className="rounded-full flex justify-center items-center gap-2  px-4 py-2 bg-[#FF8FA3]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
                    />
                  </svg>

                  <p>{data?.city}</p>
                </div>
              </div>
            </div>

            <div className="text-[#0A2D23] ">{data?.about}</div>
            <div className="bg-[#FFB5A71A] py-3 xl:w-[520px] rounded-xl shadow-lg ">
              <p className="border-b-2 border-gray-300  px-4 py-3  text-[22px] text=[#1B1B1B]">
                Areas Available
              </p>
              <div className="flex flex-wrap   ">
                <div className=" flex flex-warp  mt-5 gap-6 px-5">
                  <div className=" flex flex-wrap justify-between gap-4  ">
                    {Array.isArray(data?.spaces) && data.spaces.length > 0 ? (
                      data.spaces.map((space, index) => {
                        const spaceType = spaceTypes.find(
                          (type) => type.id === space.spaceType
                        );
                        return (
                          <div key={index} className="flex gap-4     ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="40"
                              height="40"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#C9184A"
                                fill-rule="evenodd"
                                d="M8.905 4.25h6.19c.838 0 1.372 0 1.832.091a4.75 4.75 0 0 1 3.732 3.732l-.736.147l.736-.147c.07.35.086.743.09 1.28A2.751 2.751 0 0 1 22.75 12v2.444c0 1.53-.798 2.874-2 3.637V19a.75.75 0 0 1-1.5 0v-.325c-.261.05-.53.075-.806.075H5.556c-.276 0-.545-.026-.806-.075V19a.75.75 0 0 1-1.5 0v-.919a4.302 4.302 0 0 1-2-3.636V12c0-1.26.846-2.32 2.001-2.647c.004-.537.02-.93.09-1.28a4.75 4.75 0 0 1 3.732-3.732c.46-.091.994-.091 1.832-.091M4.752 9.354A2.751 2.751 0 0 1 6.75 12v1.2c0 .028.022.05.05.05h10.4a.05.05 0 0 0 .05-.05V12c0-1.258.845-2.319 1.998-2.646c-.004-.51-.017-.77-.06-.988a3.25 3.25 0 0 0-2.554-2.554c-.296-.058-.669-.062-1.634-.062H9c-.965 0-1.338.004-1.634.062a3.25 3.25 0 0 0-2.554 2.554c-.043.218-.056.479-.06.988M4 10.75c-.69 0-1.25.56-1.25 1.25v2.444a2.806 2.806 0 0 0 2.806 2.806h12.888a2.806 2.806 0 0 0 2.806-2.806V12a1.25 1.25 0 0 0-2.5 0v1.2a1.55 1.55 0 0 1-1.55 1.55H6.8a1.55 1.55 0 0 1-1.55-1.55V12c0-.69-.56-1.25-1.25-1.25"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <div>
                              {" "}
                              <div className="flex gap-2 ">
                                <p className="text-pink text-md">
                                  {spaceType ? spaceType.name : "Unknown"}
                                </p>{" "}
                                <p className="text-pink">|</p>
                                <p className="text-md text-pink">
                                  {space.spaceName}
                                </p>
                              </div>
                              <div className="flex gap-2 ">
                                <p className="text-sm">
                                  {space.floating} Floating
                                </p>
                                <p className="-mt-1">|</p>
                                <p className="text-sm">
                                  {" "}
                                  {space.sitting} Sitting
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div>
                        <div className="flex gap-2">
                          <p>{data?.spaces?.sitting || "N/A"} Seating</p>
                          <p>|</p>
                          <p> {data?.spaces?.floating || "N/A"} Floating</p>
                        </div>
                        <p className="text-[#C9184A] text-[14px]">
                          {data?.spaces?.spaceName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:px-20 md:px-10 xl:py-10 px-5 py-5 flex justify-center items-center flex-col rounded-md bg-[#FFB5A71A] border-[#FEC5BB] border-2 gap-3">
            <p className="">{data?.bussinessName}</p>
            <form className="max-w-sm ">
              <input
                type="text"
                className="w-full h-12 px-4 my-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Full Name*"
                required
              />
              <input
                type="tel"
                className="w-full h-12 px-4 my-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Phone Number*"
                required
              />
              <input
                type="email"
                className="w-full h-12 px-4 my-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Email*"
                required
              />
              <input
                type="text"
                className="w-full h-12 px-4 my-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Function Name*"
                required
              />
              <textarea
                className="w-full h-32 px-4 py-2 my-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Function Details (at most 100 words)*"
                required
              ></textarea>
              <div className="flex justify-between items-center">
                <p className="mr-2">Notify me on Whatsapp</p>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="whatsappToggle"
                    className="sr-only"
                  />
                  <label
                    htmlFor="whatsappToggle"
                    className="block w-10 h-6 bg-gray-300 rounded-full cursor-pointer"
                  >
                    <div className="absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out"></div>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-12 mt-4 text-white bg-gradient-to-r from-[#C9184A] to-[#FFB5A7] rounded-md"
              >
                Check Availability and Prices
              </button>
            </form>
          </div>
        </div>

        <div className="m-20 md:flex justify-center items-center gap-10  text-[#0A2D23] text-[18px] hidden ">
          <div>Portfolio</div>
          <a href="#services">Services</a>
          <div>Location</div>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ&apos;s</a>
        </div>
        {/* Portfolio*/}
        <div className=" lg:pl-[100px] md:mx-[60px] mx-6 ">
          <p
            className="text-[#4A4A4A] font-semibold text-[32px] mt-10 md:mt-0"
            id="photos"
          >
            Portfolio
          </p>
        </div>
        <Space25px />
        {data?.portfolioImagesUrl && data.portfolioImagesUrl.length > 0 && (
          <Gallery images={data.portfolioImagesUrl} />
        )}

        <div className="bg-[#CFCCBF80] p-8 md:p-16  m-6 xl:mx-[100px] lg:mx-[80px] md:mx-10 rounded-2xl text-[#0A2D23]">
          <div className="flex flex-col text-[32px] ">
            <div id="services">
              <p className="text-[42px] font-medium py-5">Services</p>
            </div>
            <div className="flex flex-wrap gap-8 lg:flex-row text-[20px] md:justify-between ">
              <div className="space-y-4  w-[250px]  ">
                <p className="md:text-[22px] text-[18px] font-medium">
                  Amenities
                </p>
                <div className="text-[14px] font-semibold ">
                  <ul className="list-disc list-inside items-start flex flex-col  space-y-3">
                    {data &&
                    data.amenitiesUID &&
                    Array.isArray(data.amenitiesUID) ? (
                      data.amenitiesUID.map((amenityId) => {
                        const amenity = amenities.find(
                          (a) => a.amenityUID === amenityId
                        );
                        return amenity ? (
                          <li key={amenityId} className="text-gray-700">
                            {amenity.amenityName}
                          </li>
                        ) : null;
                      })
                    ) : (
                      <li className="text-gray-700">No amenities available</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="space-y-4  w-[250px] ">
                <p className="md:text-[22px] text-[18px] font-medium">
                  Accessibility
                </p>
                <ul className="list-disc list-inside text-[14px] font-semibold space-y-3 ">
                  {data &&
                  data.accessibilityOptionsUID &&
                  Array.isArray(data.accessibilityOptionsUID) ? (
                    data.accessibilityOptionsUID.map(
                      (accessibilityOptionsUID) => {
                        const accessibility = accessibilityOptions.find(
                          (a) => a.id === accessibilityOptionsUID
                        );
                        return accessibility ? (
                          <li key={accessibility.id} className="text-gray-700">
                            {accessibility.name}
                          </li>
                        ) : null;
                      }
                    )
                  ) : (
                    <li className="text-gray-700">
                      No accessibility options available
                    </li>
                  )}
                </ul>
              </div>
              <div className="space-y-4  w-[250px] ">
                <p className="md:text-[22px] text-[18px] font-medium">
                  {" "}
                  Security and Safety
                </p>
                <ul className="list-disc list-inside text-[14px] font-semibold space-y-3 ">
                  {data &&
                  data.safetyAndSecurityOptionsUID &&
                  Array.isArray(data.safetyAndSecurityOptionsUID) ? (
                    data.safetyAndSecurityOptionsUID.map((id) => {
                      const safety = safetyAndSecurityOptions.find(
                        (a) => a.id === id
                      );
                      return safety ? (
                        <li key={safety.id} className="text-gray-700">
                          {safety.name}
                        </li>
                      ) : null;
                    })
                  ) : (
                    <li className="text-gray-700">
                      No safety and security options available
                    </li>
                  )}
                </ul>
              </div>
              <div className="space-y-4  w-[250px] ">
                <p className="md:text-[22px] text-[18px] font-medium">
                  {" "}
                  Security and Safety
                </p>
                <ul className="list-disc list-inside text-[14px] font-semibold space-y-3 ">
                  {data &&
                  data.facilitiesUID &&
                  Array.isArray(data.facilitiesUID) ? (
                    data.facilitiesUID.map((id) => {
                      const facility = facilities.find((a) => a.id === id);
                      return facility ? (
                        <li key={facility.id} className="text-gray-700">
                          {facility.name}
                        </li>
                      ) : null;
                    })
                  ) : (
                    <li className="text-gray-700">No facilities available</li>
                  )}
                </ul>
              </div>
              <div className="space-y-4  w-[250px] ">
                <p className="md:text-[22px] text-[18px] font-medium">
                  {" "}
                  Additional Services
                </p>
                <ul className="list-disc list-inside text-[14px] font-semibold space-y-3 ">
                  {data &&
                  data.additionalServicesUID &&
                  Array.isArray(data.additionalServicesUID) ? (
                    data.additionalServicesUID.map((id) => {
                      const service = additionalServices.find(
                        (a) => a.id === id
                      );
                      return service ? (
                        <li key={service.id} className="text-gray-700">
                          {service.name}
                        </li>
                      ) : null;
                    })
                  ) : (
                    <li className="text-gray-700">
                      No additional services available
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start xl:mx-[100px] lg:mx-[80px] md:mx-10 mx-6 ">
          <div className="lg:w-[600px]  flex flex-col gap-6 bg-[#B4D4DF40] md:p-10 p-4 rounded-2xl ">
            <div className="text-xl font-bold capitalize">
              A hotel perfectly located at your destination
            </div>
            <div className="flex justify-between items-center">
              <ul className="list-disc list-inside text-[14px] font-semibold space-y-2">
                {data && data.attractions && Array.isArray(data.attractions) ? (
                  data.attractions.map((place) => {
                    const attractions = attraction.find(
                      (a) => a.id === place.locationType
                    );
                    console.log(attractions);
                    return attractions ? (
                      <>
                        {" "}
                        <div className="flex justify-between  items-center lg:w-[500px] md:w-[450px] sm:w-[400px] w-[350px] ">
                          {" "}
                          <div
                            key={attractions.id}
                            className="text-gray-700 flex gap-2 "
                          >
                            <img
                              src="/icons/locationblack.svg"
                              alt="location"
                            />
                            <div className="md:flex">
                              {" "}
                              <div className="text-gray-500">{place.name}</div>

                              <div className="text-gray-900">({attractions.name})</div>
                            </div>
                          </div>
                          <div className="text-gray-700 flex ">
                            <div>{place.distance}km</div> <div>/</div>
                            <div>{place.time}mins </div>
                          </div>
                        </div>
                        <hr className="w-full border-gray-300 mt-2" />
                      </>
                    ) : null;
                  })
                ) : (
                  <li className="text-gray-700">
                    No nearby attractions available
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* <div className="w-[46%] h-full">
        {data?.googleLocation && (
          <iframe
            src={data.googleLocation}
            width="571"
            height="598"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        )}
      </div> */}
        </div>
        <div id="reviews">
          <Review id={uniqueID} title={data?.businessName} />
        </div>
        <div id="faq">
          <FAQ faqData={vendorsFAQs} />
        </div>
      </div>
    </>
  );
};

export default DetailPage;
