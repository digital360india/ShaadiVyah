"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { parseCookies } from "nookies";
import "tailwindcss/tailwind.css"; // Assuming Tailwind CSS is installed

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
        } else {
          console.error("Photographer data not found:", photographerId);
        }
      }
    };

    fetchPhotographerData();
  }, [photographerId]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? event.target.checked : value,
    }));
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

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Photographer Details</h2>
            <div className="mb-4">
              <label htmlFor="pricePerDay" className="block text-gray-700 font-medium">Starting price per day:</label>
              <input
                type="number"
                id="pricePerDay"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="photoPackage" className="block text-gray-700 font-medium">Photo Package:</label>
              <input
                type="number"
                id="photoPackage"
                name="photoPackage"
                value={formData.photoPackage}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="photoVideoPackage" className="block text-gray-700 font-medium">Photo Video Package:</label>
              <input
                type="number"
                id="photoVideoPackage"
                name="photoVideoPackage"
                value={formData.photoVideoPackage}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="albumPages" className="block text-gray-700 font-medium">Album Pages:</label>
              <input
                type="number"
                id="albumPages"
                name="albumPages"
                value={formData.albumPages}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="outstationTravelCovered" className="block text-gray-700 font-medium">Outstation Travel Covered:</label>
              <input
                type="checkbox"
                id="outstationTravelCovered"
                name="outstationTravelCovered"
                checked={formData.outstationTravelCovered}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="practicingSince" className="block text-gray-700 font-medium">Practicing Since:</label>
              <input
                type="number"
                id="practicingSince"
                name="practicingSince"
                value={formData.practicingSince}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="travelsToVenue" className="block text-gray-700 font-medium">Travels to Venue:</label>
              <input
                type="checkbox"
                id="travelsToVenue"
                name="travelsToVenue"
                checked={formData.travelsToVenue}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="advancePayment" className="block text-gray-700 font-medium">Advance Payment:</label>
              <input
                type="number"
                id="advancePayment"
                name="advancePayment"
                value={formData.advancePayment}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => setEditMode(false)} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded shadow">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded shadow">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Vendor Details</h2>
            <div className="mb-4">
              <label htmlFor="pricePerDay" className="block text-gray-700 font-medium">Starting price per day:</label>
              <span className="block p-2 bg-gray-100 border border-gray-300 rounded shadow-sm">{formData.pricePerDay}</span>
            </div>
            <div className="mb-4">
              <label htmlFor="photoPackage" className="block text-gray-700 font-medium">Photo Package:</label>
              <span className="block p-2 bg-gray-100 border border-gray-300 rounded shadow-sm">{formData.photoPackage}</span>
            </div>
            <div className="mb-4">
              <label htmlFor="photoVideoPackage" className="block text-gray-700 font-medium">Photo Video Package:</label>
              <span className="block p-2 bg-gray-100 border border-gray-300 rounded shadow-sm">{formData.photoVideoPackage}</span>
            </div>
            <div className="mb-4">
              <label htmlFor="albumPages" className="block text-gray-700 font-medium">Album Pages:</label>
              <span className="block p-2 bg-gray-100 border border-gray-300 rounded shadow-sm">{formData.albumPages}</span>
            </div>
            <div className="mb-4">
              <label htmlFor="outstationTravelCovered" className="block text-gray-700 font-medium">Outstation Travel Covered:</label>
              <span className="block p-2 bg-gray-100 border border-gray-300 rounded shadow-sm">{formData.outstationTravelCovered ? "Yes" : "No"}</span>
            </div>
            <div className="mb-4">
              <label htmlFor="practicingSince" className="block text-gray-700 font-medium">Practicing Since:</label>
              <span className="block p-2 bg-gray-100 border border-gray-300 rounded shadow-sm">{formData.practicingSince}</span>
            </div>
            <div className="mb-4">
              <label htmlFor="travelsToVenue" className="block text-gray-700 font-medium">Travels to Venue:</label>
              <span className="block p-2 bg-gray-100 border border-gray-300 rounded shadow-sm">{formData.travelsToVenue ? "Yes" : "No"}</span>
            </div>
            <div className="mb-4">
              <label htmlFor="advancePayment" className="block text-gray-700 font-medium">Advance Payment:</label>
              <span className="block p-2 bg-gray-100 border border-gray-300 rounded shadow-sm">{formData.advancePayment}</span>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-blue-500 text-white rounded shadow">
                Edit Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotographerVendorPage;
