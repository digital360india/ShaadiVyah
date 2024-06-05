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
    <div>
  
      {editMode ? <form ref={formData} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pricePerDay">Starting price per day:</label>
          <input
            type="number"
            id="pricePerDay"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pricePerFunction">Price per function:</label>
          <input
            type="number"
            id="pricePerFunction"
            name="pricePerFunction"
            value={formData.pricePerFunction}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="practicingSince">Practicing makeup since:</label>
          <input
            type="number"
            id="practicingSince"
            name="practicingSince"
            value={formData.practicingSince}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="travelsToVenue">Travels to venue:</label>
          <input
            type="checkbox"
            id="travelsToVenue"
            name="travelsToVenue"
            checked={formData.travelsToVenue}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="advancePayment">Advance payment (%):</label>
          <input
            type="number"
            id="advancePayment"
            name="advancePayment"
            value={formData.advancePayment}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="outstationTravelCovered">
            Outstation travel and stay covered by client:
          </label>
          <input
            type="checkbox"
            id="outstationTravelCovered"
            name="outstationTravelCovered"
            checked={formData.outstationTravelCovered}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="engagementMakeupCharge">
            Engagement makeup charge:
          </label>
          <input
            type="number"
            id="engagementMakeupCharge"
            name="engagementMakeupCharge"
            value={formData.engagementMakeupCharge}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="makeupPerFamilyMember">
          Makeup Per Family Member:
          </label>
          <input
            type="number"
            id="makeupPerFamilyMember"
            name="makeupPerFamilyMember"
            value={formData.makeupPerFamilyMember}
            onChange={handleChange}
            required
          />
        </div>
      </form> : (
        <div>
          <h2>Vendor Details</h2>
          <div>
            <label htmlFor="pricePerDay">Starting price per day:</label>
            <span>{formData.pricePerDay}</span>
          </div>
          <div>
            <label htmlFor="pricePerFunction">Price per function:</label>
            <span>{formData.pricePerFunction}</span>
          </div>
          <div>
            <label htmlFor="practicingSince">Practicing Since:</label>
            <span>{formData.practicingSince}</span>
          </div>
          <div>
            <label htmlFor="travelsToVenue">Travels To Venue:</label>
            <span>{formData.travelsToVenue}</span>
          </div>
          <div>
            <label htmlFor="advancePayment">Advance Payment:</label>
            <span>{formData.pricePerFunction}</span>
          </div>
          <div>
            <label htmlFor="outstationTravelCovered">Outstation Travel Covered:</label>
            <span>{formData.outstationTravelCovered}</span>
          </div>
          
          <div>
            <label htmlFor="engagementMakeupCharge">Engagement Makeup Charge:</label>
            <span>{formData.engagementMakeupCharge}</span>
          </div>
          
          <div>
            <label htmlFor="makeupPerFamilyMember">Makeup Per Family Member:</label>
            <span>{formData.makeupPerFamilyMember}</span>
          </div>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      ) }
    </div>
  );
};
export default MakeUpVendorPage;
