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
  const [activeSection, setActiveSection] = useState("services"); // State to manage active section

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
      [name]: type === "checkbox" ? event.target.checked : value,
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
    <div className="p-8 bg-gray-100 min-h-screen bg-[url('/images/dashbg.svg')]">
      <div
        className=" w-[955px] mx-auto bg-cream rounded-lg shadow-lg shadow-[#D2730040]"
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
          className="w[960px] h-[52px]"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] ">
            VENDOR BUSINESS DETAILS
          </h2>
          <div className="relative w-full mt-10 mb-10">
            <div className="h-[2px] bg-gradient-border"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-32">
              <button
                className="relative w-[170px] h-[60px] flex items-center justify-center cursor-pointer"
                onClick={() => setActiveSection("services")}
              >
                <Image
                  src="/icons/servicbg.svg"
                  alt="left icon"
                  width={1000}
                  height={1000}
                  className="w-full h-full"
                />
                <span className="absolute  text-[16px] font-semibold text-[#A11C5C] bg-cream">
                  Services
                </span>
              </button>

              <button
                className="relative w-[170px] h-[60px] flex items-center justify-center cursor-pointer"
                onClick={() => setActiveSection("pricing")}
              >
                <Image
                  src="/icons/servicbg.svg"
                  alt="center icon"
                  width={1000}
                  height={1000}
                  className="w-full h-full"
                />
                <span className="absolute  text-[16px] font-semibold text-[#A11C5C] bg-cream">
                  Vendor Pricing
                </span>
              </button>
              <button className="relative w-[170px] h-[60px] flex items-center justify-center">
                <Image
                  src="/icons/servicbg.svg"
                  alt="right icon"
                  width={1000}
                  height={1000}
                  className="w-full h-full"
                />
                <span className="absolute text-[16px] font-semibold text-[#A11C5C] bg-cream">
                  lorem
                </span>
              </button>
            </div>
          </div>

          {activeSection === "services" && (
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex flex-row justify-between">
                <h2 className="md:text-2xl text-[28px] font-semibold mb-4 text-[#A11C5C]">
                  My Services
                </h2>
                <div className="mb-4">
                  <button
                    className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel" : <MdEdit />}
                  </button>
                </div>
              </div>
              {isEditing ? (
                <div>
                  <p className="text-xl font-semibold mb-4 text-gray-800">
                    Edit Services
                  </p>
                  {services.map((data) => (
                    <div
                      key={data.id}
                      className="flex  items-center mb-2 text-black"
                    >
                      <input
                        type="checkbox"
                        id={data.id}
                        value={data.id}
                        checked={userServices.includes(data.id)}
                        onChange={handleServicesChange}
                        className="mr-2"
                      />
                      <label htmlFor={data.id}>{data.name}</label>
                    </div>
                  ))}
                  <button
                    onClick={handleSaveServices}
                    className="px-4 py-2 rounded bg-green-500 text-white mt-4"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <ul className="list-disc list-inside space-y-2">
                  {userServices.map((serviceID) => {
                    const service = services.find(
                      (service) => service.id === serviceID
                    );
                    return service ? (
                      <li key={serviceID} className="text-gray-700">
                        {service.name}
                      </li>
                    ) : null;
                  })}
                </ul>
              )}
            </div>
          )}

          {activeSection === "pricing" && (
            <div>
              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-bold mb-4 text-blue-600">
                    Edit Photographer Details
                  </h2>
                  <div className="mb-4">
                    <label
                      htmlFor="pricePreWeddingPerDay"
                      className="block text-gray-700 font-medium"
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
                      className="block text-gray-700 font-medium"
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
                      className="block text-gray-700 font-medium"
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

                  <div className="mb-4 flex gap-3">
                    <input
                      type="checkbox"
                      id="outstationTravelCovered"
                      name="outstationTravelCovered"
                      checked={formData.outstationTravelCovered}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <label
                      htmlFor="outstationTravelCovered"
                      className="block text-gray-700 font-medium"
                    >
                      Outstation Travel Covered
                    </label>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="practicingSince"
                      className="block text-gray-700 font-medium"
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
                  <div className="mb-4 flex gap-3">
                    <input
                      type="checkbox"
                      id="travelsToVenue"
                      name="travelsToVenue"
                      checked={formData.travelsToVenue}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <label
                      htmlFor="travelsToVenue"
                      className="block text-gray-700 font-medium"
                    >
                      Travels to Venue
                    </label>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="advancePayment"
                      className="block text-gray-700 font-medium"
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
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="mr-2 px-4 py-2 bg-gray-500 text-white rounded shadow"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded shadow"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div>
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
                  <div className="flex justify-end">
                    <button
                      onClick={() => setEditMode(true)}
                      className="px-4 py-2 bg-gradient-to-r  from-[#FF1053] to-[#F7ACCF] text-white rounded shadow"
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