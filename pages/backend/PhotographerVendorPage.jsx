"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { parseCookies } from "nookies";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Space50px from "@/components/Space50px";
import Image from "next/image";

const PhotographerVendorPage = () => {
  const [formData, setFormData] = useState({
    pricePreWeddingPerDay: "",
    priceWeddingDayPerDay: "",
    priceSpecialEventPerDay: "",
    outstationTravelCovered: false,
    practicingSince: "",
    travelsToVenue: false,
    advancePayment: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [services, setServices] = useState([]);
  const [userServices, setUserServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("services");

  const cookies = parseCookies();
  const photographerId = cookies.token;

  useEffect(() => {
    const fetchPhotographerData = async () => {
      if (photographerId) {
        const photographerRef = doc(db, "users", photographerId);
        const photographerSnap = await getDoc(photographerRef);
        if (photographerSnap.exists) {
          const data = photographerSnap.data();
          setFormData({
            pricePreWeddingPerDay: data.pricePreWeddingPerDay || "",
            priceWeddingDayPerDay: data.priceWeddingDayPerDay || "",
            priceSpecialEventPerDay: data.priceSpecialEventPerDay || "",
            outstationTravelCovered: data.outstationTravelCovered || false,
            practicingSince: data.practicingSince || "",
            travelsToVenue: data.travelsToVenue || false,
            advancePayment: data.advancePayment || "",
          });
          setUserServices(data.servicesID || []);
        } else {
          console.error("Photographer data not found:", photographerId);
        }
      }
    };

    const fetchPhotographerServices = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "photographerServices")
        );
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchPhotographerData();
    fetchPhotographerServices();
  }, [photographerId]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "true" || value === "false" ? value === "true" : value,
    }));
  };

  const handleServicesChange = (e) => {
    const { value, checked } = e.target;
    setUserServices((prev) =>
      checked ? [...prev, value] : prev.filter((amenity) => amenity !== value)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const photographerRef = doc(db, "users", photographerId);
      await updateDoc(photographerRef, formData);

      alert("Photographer details updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating photographer:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleSaveServices = async () => {
    try {
      const userRef = doc(db, "users", photographerId);
      await updateDoc(userRef, { servicesID: userServices });
      setIsEditing(false);
      toast.success("Service updated successfully!");
    } catch (error) {
      console.error("Error updating Service: ", error);
      toast.error("Error updating Service.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen bg-[url('/images/dashbg1.svg')] w-full">
      <div
        className=" md:w-[955px] w-full mx-auto bg-[#FFF4E8] rounded-lg shadow-lg shadow-[#D2730040] mb-8 pb-8"
        style={{
          borderWidth: "3px",
          borderStyle: "solid",
          borderImage: "linear-gradient(180deg, #BE7318, #EED68A, #BE7217) 1",
        }}
      >
        <img
          src={"/images/topbg.svg"}
          width={1000}
          height={1000}
          className="md:w[960px] md:h-[52px] w-full "
        />
        <div className="p-6 md:w-full md:h-full ">
          <h2 className="md:text-2xl text-[16px] text-center md:text-left font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather ">
            VENDOR BUSINESS DETAILS
          </h2>
          <div className="relative w-full mt-10 mb-10 ">
            <div className="h-[2px] bg-gradient-border"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row md:flex-row items-center justify-center space-x-10 md:space-x-4 lg:space-x-32 font-Merriweather-Sans">
              <button
                className="relative w-[60px] h-[60px] md:w-[170px] md:h-[75px] flex items-center justify-center cursor-pointer"
                onClick={() => setActiveSection("services")}
              >
                <Image
                  src="/icons/servicbg.svg"
                  alt="left icon"
                  width={1000}
                  height={1000}
                  className="w-full h-full"
                />
                <span
                  className={`absolute text-[12px] md:text-[16px] font-semibold px-2 py-1 transition-all duration-300 font-Merriweather rounded ${
                    activeSection === "services"
                      ? "bg-[#A11C5C] text-white"
                      : "bg-cream text-[#A11C5C]"
                  }`}
                >
                  Services
                </span>
              </button>

              <button
                className="relative w-[120px] h-[50px] md:w-[170px] md:h-[75px] flex items-center justify-center cursor-pointer"
                onClick={() => setActiveSection("pricing")}
              >
                <Image
                  src="/icons/servicbg.svg"
                  alt="center icon"
                  width={1000}
                  height={1000}
                  className="w-full h-full"
                />
                <span
                  className={`absolute text-[12px] md:text-[16px] font-semibold px-2 py-1 transition-all duration-300 font-Merriweather rounded ${
                    activeSection === "pricing"
                      ? "bg-[#A11C5C] text-white"
                      : "bg-cream text-[#A11C5C]"
                  }`}
                >
                  Vendor Pricing
                </span>
              </button>

              {/* 
              <button
                className="relative w-[60px] h-[50px] md:w-[170px] md:h-[75px] flex items-center justify-center"
                onClick={() => setActiveSection("lorem")}
              >
                <Image
                  src="/icons/servicbg.svg"
                  alt="right icon"
                  width={1000}
                  height={1000}
                  className="w-full h-full"
                />
                <span
                  className={`absolute text-[12px] md:text-[16px] font-semibold px-2 py-1 transition-all duration-300 font-Merriweather rounded ${
                    activeSection === "lorem"
                      ? "bg-[#A11C5C] text-white"
                      : "bg-cream text-[#A11C5C]"
                  }`}
                >
                  Lorem
                </span>
              </button> */}
            </div>
          </div>

          {activeSection === "services" && (
            <div className=" p-4">
              <div className="flex flex-row justify-between">
                <h2 className="md:text-[20px] text-[16px] font-semibold mb-4 text-[#A11C5C] font-Merriweather">
                  Services
                </h2>
                <hr className="border-t-2 border-[#A11C5C] w-full lg:ml-6 ml-2 lg:mt-4 mt-3" />
                <div className="mb-4">
                  <button
                    className="px-4 md:py-2 rounded bg-blue-500 text-black md:mb-4"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel" : <MdEdit />}
                  </button>
                </div>
              </div>
              {isEditing ? (
                <div className="font-Merriweather">
                  <p className="md:text-[16px] text-[14px] font-semibold mb-4 text-red-600">
                    Edit Services
                  </p>
                  {services.map((data) => (
                    <div
                      key={data.id}
                      className="flex items-center bg-pink-700 text-[#FFC200] font-bold p-4 rounded-lg shadow-md mb-2 bg-[#BE005C] text-[12px] md:text-[16px]"
                    >
                      <input
                        type="checkbox"
                        id={data.id}
                        value={data.id}
                        checked={userServices.includes(data.id)}
                        onChange={handleServicesChange}
                        className="mr-3 w-4 h-4 accent-"
                      />
                      <label htmlFor={data.id} className="flex-grow">
                        {data.name}
                      </label>
                      <div className="flex-1 h-[1px]  bg-gradient-to-r from-[#BE7318] via-[#EED68A] to-[#BE7318]"></div>
                    </div>
                  ))}
                  <button
                    onClick={handleSaveServices}
                    className="px-6 py-3 rounded-lg text-white font-semibold mt-4 shadow-md 
                                 bg-[radial-gradient(50%_50%_at_50%_50%,_#DD0D63_0%,_#A11C5C_100%)] 
                                 hover:opacity-90 transition text-[12px] md:text-[16px]"
                  >
                    Save
                  </button>
                </div>
              ) : (
                // <ul className="list-disc list-inside space-y-2">
                //   {userServices.map((serviceID) => {
                //     const service = services.find(
                //       (service) => service.id === serviceID
                //     );
                //     return service ? (
                //       <li key={serviceID} className="text-gray-700">
                //         {service.name}
                //       </li>
                //     ) : null;
                //   })}
                // </ul>

                <ul className="space-y-6 font-Merriweather ">
                  {userServices.map((serviceID) => {
                    const service = services.find((s) => s.id === serviceID);
                    return service ? (
                      <li
                        key={serviceID}
                        className="flex items-center gap-3 px-4 py-4 rounded-lg bg-gradient-to-r from-pink-700  text-[#FFC200] shadow-md border border-yellow-500 bg-[#BE005C]  text-[12px] md:text-[16px]"
                      >
                        <span className="w-4 h-4 bg-white rounded-full"></span>

                        <span className="font-semibold">
                          {service?.name || "Unnamed Service"}
                        </span>

                        <div className="flex-1 h-[1px] bg-gradient-to-r from-[#BE7318] via-[#EED68A] to-[#BE7318]"></div>
                      </li>
                    ) : null;
                  })}
                </ul>
              )}
            </div>
          )}

          {activeSection === "pricing" && (
            <div className="font-Merriweather">
              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-[24px] font-bold mb-4 text-[#9B1B52] font-Merriweather">
                    Edit Photographer Details
                  </h2>

                  <div className="md:grid md:grid-cols-3 gap-6 space-y-4 md:space-y-0">
                    <div className="mb-4">
                      <label
                        htmlFor="pricePreWeddingPerDay"
                        className="block text-[#9B1B52] font-medium"
                      >
                        Starting price Pre-Wedding (photo + video) per day
                      </label>
                      <input
                        type="number"
                        id="pricePreWeddingPerDay"
                        name="pricePreWeddingPerDay"
                        value={formData.pricePreWeddingPerDay}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3  py-3 border border-gray-300 rounded shadow-sm"
                        placeholder="Enter amount of price Per Day"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="priceWeddingDayPerDay"
                        className="block text-[#9B1B52] font-medium"
                      >
                        Price for Wedding (photo + video) per Day{" "}
                      </label>
                      <input
                        type="number"
                        id="priceWeddingDayPerDay"
                        name="priceWeddingDayPerDay"
                        value={formData.priceWeddingDayPerDay}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded shadow-sm"
                        placeholder="Enter amount of photo Package"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="priceSpecialEventPerDay"
                        className="block text-[#9B1B52] font-medium"
                      >
                        Price for Special Events (photo + video) per Day{" "}
                      </label>
                      <input
                        type="number"
                        id="priceSpecialEventPerDay"
                        name="priceSpecialEventPerDay"
                        value={formData.priceSpecialEventPerDay}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded shadow-sm"
                        placeholder="Enter amount of photo Video Package"
                      />
                    </div>

                    <div className="my-4">
                      <label
                        htmlFor="outstationTravelCovered"
                        className="block text-[#9B1B52] font-medium mb-2"
                      >
                        Outstation Travel Covered
                      </label>
                      <select
                        id="outstationTravelCovered"
                        name="outstationTravelCovered"
                        value={formData.outstationTravelCovered}
                        onChange={handleChange}
                        className="block w-full p-3 border border-gray-300 bg-white"
                      >
                        <option value="" className="bg-white">Select an option</option>
                        <option value="true" className="bg-white">Yes</option>
                        <option value="false" className="bg-white">No</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="practicingSince"
                        className="block text-[#9B1B52] font-medium"
                      >
                        Practicing Since
                      </label>
                      <input
                        type="number"
                        id="practicingSince"
                        name="practicingSince"
                        value={formData.practicingSince}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded shadow-sm"
                        placeholder="practicing Since"
                      />
                    </div>
                    <div className="my-4">
                      <label
                        htmlFor="travelsToVenue"
                        className="block text-[#9B1B52] font-medium mb-2"
                      >
                        Travels to Venue
                      </label>
                      <select
                        id="travelsToVenue"
                        name="travelsToVenue"
                        value={formData.travelsToVenue}
                        onChange={handleChange}
                        className="block w-full p-3 border border-gray-300 bg-white"
                      >
                        <option value="" className="bg-white">Select an option</option>
                        <option value="true" className="bg-white">Yes</option>
                        <option value="false" className="bg-white">No</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="advancePayment"
                        className="block text-[#9B1B52] font-medium"
                      >
                        Advance Payment
                      </label>
                      <input
                        type="number"
                        id="advancePayment"
                        name="advancePayment"
                        value={formData.advancePayment}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded shadow-sm"
                        placeholder="Enter amount of advance Payment"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="px-6 py-3 rounded-lg text-[#A11C5C] font-semibold mt-4 border border-[#A11C5C] "
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg text-white font-semibold mt-4 shadow-md 
                      bg-[radial-gradient(50%_50%_at_50%_50%,_#DD0D63_0%,_#A11C5C_100%)] 
                      hover:opacity-90 transition text-[12px] md:text-[16px]"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="md:grid md:grid-cols-3 gap-6 space-y-4 md:space-y-0 font-Merriweather">
                  <div className="mb-4">
                    <label
                      htmlFor="pricePreWeddingPerDay"
                      className="block text-gray-700 font-medium"
                    >
                      Starting price per day
                    </label>
                    <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                      {formData.pricePreWeddingPerDay ? (
                        formData.pricePreWeddingPerDay
                      ) : (
                        <p className="text-gray-400">
                          Enter amount of price of pre-wedding Per Day
                        </p>
                      )}
                    </span>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="priceWeddingDayPerDay"
                      className="block text-gray-700 font-medium"
                    >
                      Photo Package
                    </label>
                    <span className="block p-3 bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                      {formData.priceWeddingDayPerDay ? (
                        formData.priceWeddingDayPerDay
                      ) : (
                        <p className="text-gray-400">
                          Enter amount of Wedding Day photo + vid Package
                        </p>
                      )}
                    </span>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="priceSpecialEventPerDay"
                      className="block text-gray-700 font-medium"
                    >
                      Photo Video Package
                    </label>
                    <span className="block p-3 bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                      {formData.priceSpecialEventPerDay ? (
                        formData.priceSpecialEventPerDay
                      ) : (
                        <p className="text-gray-400">
                          Enter amount of photo Video Package
                        </p>
                      )}
                    </span>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="outstationTravelCovered"
                      className="block text-gray-700 font-medium"
                    >
                      Outstation Travel Covered
                    </label>
                    <span className="block p-3 bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                      {formData.outstationTravelCovered ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="practicingSince"
                      className="block text-gray-700 font-medium"
                    >
                      Practicing Since
                    </label>
                    <span className="block p-3 bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                      {formData.practicingSince ? (
                        formData.practicingSince
                      ) : (
                        <p className="text-gray-400">
                          Practicing Since which year ?
                        </p>
                      )}
                    </span>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="travelsToVenue"
                      className="block text-gray-700 font-medium"
                    >
                      Travels to Venue
                    </label>
                    <span className="block p-3 bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                      {formData.travelsToVenue ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="advancePayment"
                      className="block text-gray-700 font-medium"
                    >
                      Advance Payment
                    </label>
                    <span className="block p-3 bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                      {formData.advancePayment ? (
                        formData.advancePayment
                      ) : (
                        <p className="text-gray-400">
                          Enter amount of advance Payment
                        </p>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-end p-2">
                    <button
                      onClick={() => setEditMode(true)}
                      className="px-6 py-3 rounded-lg text-[#A11C5C] font-semibold mt-4 border border-[#A11C5C] "
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              )}
            </div>

           
          )}
        </div>
      </div>
      <Space50px />
    </div>
  );
};

export default PhotographerVendorPage;
