"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { parseCookies } from "nookies";

const MehndiVendorPage = () => {
  const [formData, setFormData] = useState({
    bridalMehendi: "",
    familyMehendi: "",
    outstationTravel: false,
    practicingSince: "",
    travelsToVenue: false,
    advancePayment: "",
  });
  const [editMode, setEditMode] = useState(false);

  const cookies = parseCookies();
  const uid = cookies.token;
  useEffect(() => {
    const fetchArtistData = async () => {
      if (uid) {
        const artistRef = doc(db, "users", uid);
        const artistSnap = await getDoc(artistRef);
        if (artistSnap.exists) {
          setFormData(artistSnap.data());
        } else {
          console.error("Artist data not found:", uid);
        }
      }
    };

    fetchArtistData();
  }, [uid]);

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
      const artistRef = doc(db, "users", uid);
      await updateDoc(artistRef, formData);
      alert("Artist details updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating artist:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {editMode ? (
          <form className="" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Edit Artist Details
            </h2>
            <div className="mb-4">
              <label
                htmlFor="bridalMehendi"
                className="block text-gray-700 font-medium"
              >
                Bridal Mehendi
              </label>
              <input
                type="text"
                id="bridalMehendi"
                name="bridalMehendi"
                value={formData.bridalMehendi}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3  py-3 border border-gray-300 rounded shadow-sm"
                placeholder=" bridal Mehendi  price"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="familyMehendi"
                className="block text-gray-700 font-medium"
              >
                Family Mehendi (per person)
              </label>
              <input
                type="text"
                id="familyMehendi"
                name="familyMehendi"
                value={formData.familyMehendi}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3  py-3 border border-gray-300 rounded shadow-sm"
                placeholder=" family Mehendi  price"
              />
            </div>
            <div className="mb-4 flex">
              <label
                htmlFor="outstationTravel"
                className="block text-gray-700 font-medium"
              >
                <input
                  type="checkbox"
                  id="outstationTravel"
                  name="outstationTravel"
                  checked={formData.outstationTravel}
                  onChange={handleChange}
                  className="form-checkbox mr-2"
                />
              </label>
              <span className="block text-gray-700 font-medium">
                Outstation Travel and Stay charges covered by client
              </span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="practicingSince"
                className="block text-gray-700 font-medium"
              >
                Practicing Mehendi since
              </label>
              <input
                type="text"
                id="practicingSince"
                name="practicingSince"
                value={formData.practicingSince}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3  py-3 border border-gray-300 rounded shadow-sm"
                placeholder=" practicing Since"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="travelsToVenue"
                className="block text-gray-700 font-medium"
              >
                <input
                  type="checkbox"
                  id="travelsToVenue"
                  name="travelsToVenue"
                  checked={formData.travelsToVenue}
                  onChange={handleChange}
                  className="form-checkbox mr-2"
                />
                <span className="text-gray-700">Travels to Venue</span>
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
                type="text"
                id="advancePayment"
                name="advancePayment"
                value={formData.advancePayment}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3  py-3 border border-gray-300 rounded shadow-sm"
                placeholder=" Enter amount of advance Payment"
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
            </div>{" "}
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Artist Details
            </h2>
            <div className="mb-4">
              <label
                htmlFor="bridalMehendi"
                className="block text-gray-700 font-medium"
              >
                Bridal Mehendi
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                {formData.bridalMehendi
                  ? formData.bridalMehendi
                  : "bridal Mehendi price"}
              </span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="familyMehendi"
                className="block text-gray-700 font-medium"
              >
                Family Mehendi (per person)
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                {formData.familyMehendi
                  ? formData.familyMehendi
                  : "family Mehendi price"}
              </span>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Outstation Travel and Stay charges covered by client
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                {formData.outstationTravel ? "Yes" : "No"}
              </span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="practicingSince"
                className="block text-gray-700 font-medium"
              >
                Practicing Mehendi since
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                {formData.practicingSince
                  ? formData.practicingSince
                  : "practicingSince price"}
              </span>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Travels to Venue
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
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
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">
                {formData.advancePayment
                  ? formData.advancePayment
                  : "Enter amount advance Payment"}
              </span>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gradient-to-r  from-[#FF1053] to-[#F7ACCF] text-white rounded shadow"
                onClick={() => setEditMode(true)}
              >
                Edit Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MehndiVendorPage;
