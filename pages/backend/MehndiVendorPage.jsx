"use client"
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { parseCookies } from "nookies";

const MehndiVendorPage = ({ artistId }) => {
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
      const artistRef = doc(db, "users", artistId);
      await updateDoc(artistRef, formData); 
      alert("Artist details updated successfully!");
      setEditMode(false); 
    } catch (error) {
      console.error("Error updating artist:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      {editMode ? (
        <form className="w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="bridalMehendi" className="block text-gray-700">Bridal Mehendi:</label>
            <input
              type="text"
              id="bridalMehendi"
              name="bridalMehendi"
              value={formData.bridalMehendi}
              onChange={handleChange}
              required
              className="form-input mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="familyMehendi" className="block text-gray-700">Family Mehendi (per person):</label>
            <input
              type="text"
              id="familyMehendi"
              name="familyMehendi"
              value={formData.familyMehendi}
              onChange={handleChange}
              required
              className="form-input mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="outstationTravel" className="flex items-center">
              <input
                type="checkbox"
                id="outstationTravel"
                name="outstationTravel"
                checked={formData.outstationTravel}
                onChange={handleChange}
                className="form-checkbox mr-2"
              />
              <span className="text-gray-700">Outstation Travel and Stay charges covered by client</span>
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="practicingSince" className="block text-gray-700">Practicing Mehendi since:</label>
            <input
              type="text"
              id="practicingSince"
              name="practicingSince"
              value={formData.practicingSince}
              onChange={handleChange}
              required
              className="form-input mt-1 block w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="travelsToVenue" className="flex items-center">
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
            <label htmlFor="advancePayment" className="block text-gray-700">Advance Payment:</label>
            <input
              type="text"
              id="advancePayment"
              name="advancePayment"
              value={formData.advancePayment}
              onChange={handleChange}
              required
              className="form-input mt-1 block w-full"
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Save</button>
        </form>
      ) : (
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">Artist Details</h2>
          <div className="mb-4">
            <label htmlFor="bridalMehendi" className="block text-gray-700">Bridal Mehendi:</label>
            <span className="block mt-2">{formData.bridalMehendi}</span>
          </div>
          <div className="mb-4">
            <label htmlFor="familyMehendi" className="block text-gray-700">Family Mehendi (per person):</label>
            <span className="block mt-2">{formData.familyMehendi}</span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Outstation Travel and Stay charges covered by client:</label>
            <span className="block mt-2">{formData.outstationTravel ? "Yes" : "No"}</span>
          </div>
          <div className="mb-4">
            <label htmlFor="practicingSince" className="block text-gray-700">Practicing Mehendi since:</label>
            <span className="block mt-2">{formData.practicingSince}</span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Travels to Venue:</label>
            <span className="block mt-2">{formData.travelsToVenue ? "Yes" : "No"}</span>
          </div>
          <div className="mb-4">
            <label htmlFor="advancePayment" className="block text-gray-700">Advance Payment:</label>
            <span className="block mt-2">{formData.advancePayment}</span>
          </div>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default MehndiVendorPage;
