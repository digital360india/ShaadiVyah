"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { parseCookies } from "nookies";

const MakeUpVendorPage = ({ vendorId }) => {
  const [formData, setFormData] = useState({
    pricePerDay: "",
    pricePerFunction: "",
    practicingSince: "",
    travelsToVenue: false,
    advancePayment: "",
    outstationTravelCovered: false,
    engagementMakeupCharge: "",
    makeupPerFamilyMember: "",
  });
  const [editMode, setEditMode] = useState(false); 

  const cookies = parseCookies();
  const uid = cookies.token;
  useEffect(() => {
    const fetchVendorData = async () => {
      if (uid) {
        const vendorRef = doc(db, "users", uid);
        const vendorSnap = await getDoc(vendorRef);
        if (vendorSnap.exists) {
          setFormData(vendorSnap.data());
        } else {
          console.error("Vendor data not found:", uid);
        }
      }
    };

    fetchVendorData();
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
      const vendorRef = doc(db, "users", vendorId);
      await updateDoc(vendorRef, formData); 
      alert("Vendor details updated successfully!");
      setEditMode(false); 
    } catch (error) {
      console.error("Error updating vendor:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">

  
      {editMode ? <form ref={formData} onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Artist Details</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium" htmlFor="pricePerDay">Starting price per day</label>
          <input
            type="number"
            id="pricePerDay"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3  py-3 border border-gray-300 rounded shadow-sm"
            placeholder="Enter amount of price Per Day"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium" htmlFor="pricePerFunction">Price per function</label>
          <input
            type="number"
            id="pricePerFunction"
            name="pricePerFunction"
            value={formData.pricePerFunction}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3  py-3 border border-gray-300 rounded shadow-sm"
            placeholder="Enter amount of price Per Function"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium" htmlFor="practicingSince">Practicing makeup since</label>
          <input
            type="number"
            id="practicingSince"
            name="practicingSince"
            value={formData.practicingSince}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3  py-3 border border-gray-300 rounded shadow-sm"
            placeholder="practicingSince"
          />
        </div>
        <div className="flex gap-3 my-4">
          <input
            type="checkbox"
            id="travelsToVenue"
            name="travelsToVenue"
            checked={formData.travelsToVenue}
            onChange={handleChange}
            className="mt-1"

          />
          <label className="block text-gray-700 font-medium" htmlFor="travelsToVenue">Travels to venue</label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium" htmlFor="advancePayment">Advance payment (%)</label>
          <input
            type="number"
            id="advancePayment"
            name="advancePayment"
            value={formData.advancePayment}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3  py-3 border border-gray-300 rounded shadow-sm"
            placeholder="Enter amount of  advance Payment"
          />
        </div>
        <div className="flex gap-3 my-4">
          
          <input
            type="checkbox"
            id="outstationTravelCovered"
            name="outstationTravelCovered"
            checked={formData.outstationTravelCovered}
            onChange={handleChange}
            className="mt-1"

          />
          <label className="block text-gray-700 font-medium" htmlFor="outstationTravelCovered">
            Outstation travel and stay covered by client
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium" htmlFor="engagementMakeupCharge">
            Engagement makeup charge
          </label>
          <input
            type="number"
            id="engagementMakeupCharge"
            name="engagementMakeupCharge"
            value={formData.engagementMakeupCharge}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3  py-3 border border-gray-300 rounded shadow-sm"
            placeholder="engagement Makeup Charge"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium" htmlFor="makeupPerFamilyMember">
          Makeup Per Family Member
          </label>
          <input
            type="number"
            id="makeupPerFamilyMember"
            name="makeupPerFamilyMember"
            value={formData.makeupPerFamilyMember}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3  py-3 border border-gray-300 rounded shadow-sm"
            placeholder="makeup Per Family Member"
          />
            <div className="flex justify-end mt-4">
              <button type="button" onClick={() => setEditMode(false)} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded shadow">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded shadow">
                Save Changes
              </button>
            </div>
        </div>
      </form> : (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Artist Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="pricePerDay">Starting price per day</label>
            <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">{formData.pricePerDay ? formData.pricePerDay : "Enter amount of Price  Per Day"}</span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="pricePerFunction" >Price per function</label>
            <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">{formData.pricePerFunction ? formData.pricePerFunction : " Enter amount of Price  Per Function"}</span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="practicingSince"> Practicing Since</label>
            <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">{formData.practicingSince ? formData.practicingSince : "practicing Since"}</span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="travelsToVenue">Travels To Venue</label>
            <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">{formData.travelsToVenue ? formData.travelsToVenue : " travels To Venue"}</span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="advancePayment">Advance Payment</label>
            <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">{formData.pricePerFunction ? formData.pricePerFunction : "price Per Function"}</span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="outstationTravelCovered">Outstation Travel Covered</label>
            <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">{formData.outstationTravelCovered ? formData.outstationTravelCovered : "outstation Travel Covered"}</span>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="engagementMakeupCharge">Engagement Makeup Charge</label>
            <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">{formData.engagementMakeupCharge ? formData.engagementMakeupCharge : "engagement Makeup Charge"}</span>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium" htmlFor="makeupPerFamilyMember">Makeup Per Family Member</label>
            <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm">{formData.makeupPerFamilyMember ? formData.makeupPerFamilyMember : "makeup Per Family Member"}</span>
          </div>
<div className="flex justify-end">
<button className="px-4 py-2 bg-gradient-to-r  from-[#FF1053] to-[#F7ACCF] text-white rounded shadow" onClick={() => setEditMode(true)}>Edit Details</button>

  </div> 
         </div>
      ) }
    </div>
    </div>
  );
};
export default MakeUpVendorPage;
