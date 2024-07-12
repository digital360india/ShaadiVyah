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

const PhotographerVendorPage = () => {
  const [formData, setFormData] = useState({
    pricePerDay: "",
    photoPackage: "",
    photoVideoPackage: "",
    albumPages: "",
    outstationTravelCovered: false,
    practicingSince: "",
    travelsToVenue: false,
    advancePayment: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [services, setServices] = useState([]);
  const [userServices, setUserServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

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
            pricePerDay: data.pricePerDay || "",
            photoPackage: data.photoPackage || "",
            photoVideoPackage: data.photoVideoPackage || "",
            albumPages: data.albumPages || "",
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
        console.error("Error fetching servcies:", error);
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
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Edit Photographer Details
            </h2>
            <div className="mb-4">
              <label
                htmlFor="pricePerDay"
                className="block text-gray-700 font-medium"
              >
                Starting price per day
              </label>
              <input
                type="number"
                id="pricePerDay"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                className="mt-1 block w-full px-3  py-3 border border-gray-300 rounded shadow-sm"
                placeholder="Enter amount of price Per Day"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="photoPackage"
                className="block text-gray-700 font-medium"
              >
                Photo Package
              </label>
              <input
                type="number"
                id="photoPackage"
                name="photoPackage"
                value={formData.photoPackage}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded shadow-sm"
                placeholder="Enter amount of photo Package"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="photoVideoPackage"
                className="block text-gray-700 font-medium"
              >
                Photo Video Package
              </label>
              <input
                type="number"
                id="photoVideoPackage"
                name="photoVideoPackage"
                value={formData.photoVideoPackage}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded shadow-sm"
                placeholder="Enter amount of photo Video Package"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="albumPages"
                className="block text-gray-700 font-medium"
              >
                Album Pages
              </label>
              <input
                type="number"
                id="albumPages"
                name="albumPages"
                value={formData.albumPages}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded shadow-sm"
                placeholder="Enter no. of album Pages"
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Photographer Details
            </h2>
            <div className="mb-4">
              <label
                htmlFor="pricePerDay"
                className="block text-gray-700 font-medium"
              >
                Starting price per day
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                {formData.pricePerDay
                  ? formData.pricePerDay
                  : <p className="text-gray-400">Enter amount of price Per Day</p>}
              </span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="photoPackage"
                className="block text-gray-700 font-medium"
              >
                Photo Package
              </label>
              <span className="block p-3 bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                {formData.photoPackage
                  ? formData.photoPackage
                  : <p className="text-gray-400">Enter amount of photo Package</p>}
              </span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="photoVideoPackage"
                className="block text-gray-700 font-medium"
              >
                Photo Video Package
              </label>
              <span className="block p-3 bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                {formData.photoVideoPackage
                  ? formData.photoVideoPackage
                  : <p className="text-gray-400">Enter amount of photo Video Package</p>}
              </span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="albumPages"
                className="block text-gray-700 font-medium"
              >
                Album Pages
              </label>
              <span className="block p-3 bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                {formData.albumPages
                  ? formData.albumPages
                  : <p className="text-gray-400">Enter no. of album Pages</p>}
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
                {formData.practicingSince
                  ? formData.practicingSince
                  :  <p className="text-gray-400">Practicing Since which year ?</p>}
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
                {formData.advancePayment
                  ? formData.advancePayment
                  :  <p className="text-gray-400">Enter amount of  advance Payment</p>}
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
        {isEditing ? (
          <div>
            <>
              {" "}
              <p className="text-xl font-semibold mb-4 text-gray-800">
                Edit Services
              </p>
            </>
            {services.map((data) => (
              <div key={data.id} className="flex  items-center mb-2 text-black">
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
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-row justify-between">
              {" "}
              <h2 className="md:text-2xl text-[28px] font-semibold mb-4 text-gray-800">
                My Services
              </h2>{" "}
              <div className="mb-4">
                <button
                  className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : <MdEdit />}
                </button>
              </div>
            </div>
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
          </div>
        )}
      </div>
      <Space50px/>
    </div>
  );
};

export default PhotographerVendorPage;
