"use client";
import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { parseCookies } from "nookies";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Space50px from "@/components/Space50px";
const MakeUpVendorPage = () => {
  const [formData, setFormData] = useState({
    pricePerDay: "",
    pricePerFunction: "",
    practicingSince: "",
    travelsToVenue: false,
    advancePayment: "",
    outstationTravelCovered: false,
    engagementMakeupCharge: "",
    makeupPerFamilyMember: "",
    preweddingMakeupCharge: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [services, setServices] = useState([]);
  const [userServices, setUserServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

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
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "makeupServices"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
    fetchVendorData();
  }, [uid]);

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
  const handleSaveServices = async () => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { servicesID: userServices });
      setIsEditing(false);
      toast.success("Service updated successfully!");
    } catch (error) {
      console.error("Error updating Service: ", error);
      toast.error("Error updating Service.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const vendorRef = doc(db, "users", uid);
      await updateDoc(vendorRef, formData);
      alert("Vendor details updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating artist:", error);
      alert("Error updating artist: " + error.message);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Edit Artist Details
            </h2>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium"
                htmlFor="pricePerDay"
              >
                Starting price per day
              </label>
              <input
                type="number"
                id="pricePerDay"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                className="mt-1 block w-full px-3 placeholder:text-gray-300   py-3 border border-gray-300 rounded shadow-sm"
                placeholder="Enter amount of price Per Day"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium"
                htmlFor="pricePerFunction"
              >
                Price per function
              </label>
              <input
                type="number"
                id="pricePerFunction"
                name="pricePerFunction"
                value={formData.pricePerFunction}
                onChange={handleChange}
                className="mt-1 block w-full px-3 placeholder:text-gray-300  py-3 border border-gray-300 rounded shadow-sm"
                placeholder="Enter amount of price per Function"
              />
            </div>
            <div>
              <label
                className="block text-gray-500 font-medium"
                htmlFor="practicingSince"
              >
                Practicing makeup since
              </label>
              <input
                type="number"
                id="practicingSince"
                name="practicingSince"
                value={formData.practicingSince}
                onChange={handleChange}
                className="mt-1 block w-full px-3 placeholder:text-gray-300  py-3 border border-gray-300 rounded shadow-sm"
                placeholder="Practicing Since"
              />
            </div>
            <div className="flex gap-3 my-4">
              <input
                type="checkbox"
                id="travelsToVenue"
                name="travelsToVenue"
                checked={formData.travelsToVenue}
                onChange={handleChange}
                className="mt-1 placeholder:text-gray-300 "
              />
              <label
                className="block text-gray-700 font-medium"
                htmlFor="travelsToVenue"
              >
                Travels to venue
              </label>
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium"
                htmlFor="advancePayment"
              >
                Advance payment (%)
              </label>
              <input
                type="number"
                id="advancePayment"
                name="advancePayment"
                value={formData.advancePayment}
                onChange={handleChange}
                className="mt-1 block w-full px-3  placeholder:text-gray-300  py-3 border border-gray-300 rounded shadow-sm"
                placeholder="Enter amount of advance Payment"
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
              <label
                className="block text-gray-700 font-medium"
                htmlFor="outstationTravelCovered"
              >
                Outstation travel and stay covered by client
              </label>
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium"
                htmlFor="engagementMakeupCharge"
              >
                Engagement makeup charge
              </label>
              <input
                type="number"
                id="engagementMakeupCharge"
                name="engagementMakeupCharge"
                value={formData.engagementMakeupCharge}
                onChange={handleChange}
                className="mt-1 block w-full px-3 placeholder:text-gray-300  py-3 border border-gray-300 rounded shadow-sm"
                placeholder="Engagement Makeup Charge"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium"
                htmlFor="preweddingMakeupCharge"
              >
                Pre-Wedding makeup charge
              </label>
              <input
                type="number"
                id="preweddingMakeupCharge"
                name="preweddingMakeupCharge"
                value={formData.preweddingMakeupCharge}
                onChange={handleChange}
                className="mt-1 block w-full px-3 placeholder:text-gray-300  py-3 border border-gray-300 rounded shadow-sm"
                placeholder="Pre Wedding Makeup Charge"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium"
                htmlFor="makeupPerFamilyMember"
              >
                Makeup Per Family Member
              </label>
              <input
                type="number"
                id="makeupPerFamilyMember"
                name="makeupPerFamilyMember"
                value={formData.makeupPerFamilyMember}
                onChange={handleChange}
                className="mt-1 block w-full px-3 placeholder:text-gray-300   py-3 border border-gray-300 rounded shadow-sm"
                placeholder="Makeup Per Family Member"
              />
              <div className="flex justify-end mt-4">
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
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Artist Details
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium"
                htmlFor="pricePerDay"
              >
                Starting price per day
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                {formData.pricePerDay ? (
                  formData.pricePerDay
                ) : (
                  <span className="text-gray-300">Enter amount per day</span>
                )}
              </span>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium"
                htmlFor="pricePerFunction"
              >
                Price per function
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                {formData.pricePerFunction ? (
                  formData.pricePerFunction
                ) : (
                  <span className="text-gray-300">
                    Enter amount per function
                  </span>
                )}
              </span>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium"
                htmlFor="practicingSince"
              >
                {" "}
                Practicing Since
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                {formData.practicingSince ? (
                  formData.practicingSince
                ) : (
                  <span className="text-gray-400">Practicing Since</span>
                )}
              </span>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium"
                htmlFor="travelsToVenue"
              >
                Travels To Venue
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                {formData.travelsToVenue !== undefined ? (
                  formData.travelsToVenue ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )
                ) : (
                  <span className="text-gray-400">Travels to venue</span>
                )}
              </span>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium"
                htmlFor="advancePayment"
              >
                Advance Payment
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                {formData.pricePerFunction ? (
                  formData.pricePerFunction
                ) : (
                  <span className="text-gray-400"> Price Per Function</span>
                )}
              </span>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium"
                htmlFor="outstationTravelCovered"
              >
                Outstation Travel Covered
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                {formData.outstationTravelCovered !== undefined ? (
                  formData.outstationTravelCovered ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )
                ) : (
                  <span className="text-gray-400">
                    {" "}
                    Outstation Travel Covered
                  </span>
                )}
              </span>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium"
                htmlFor="preweddingMakeupCharge"
              >
                Pre-Wedding Makeup Charge
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                {formData.preweddingMakeupCharge ? (
                  formData.preweddingMakeupCharge
                ) : (
                  <span className="text-gray-400">
                    Engagement Makeup Charge{" "}
                  </span>
                )}
              </span>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium"
                htmlFor="makeupPerFamilyMember"
              >
                Makeup Per Family Member
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                {formData.makeupPerFamilyMember ? (
                  formData.makeupPerFamilyMember
                ) : (
                  <span className="text-gray-400">
                    Makeup Per Family Member
                  </span>
                )}
              </span>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium"
                htmlFor="makeupPerFamilyMember"
              >
                Makeup Per Family Member
              </label>
              <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                {formData.makeupPerFamilyMember ? (
                  formData.makeupPerFamilyMember
                ) : (
                  <span className="text-gray-400">
                    Makeup Per Family Member
                  </span>
                )}
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
        {isEditing ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Edit My Services
            </h2>
            {services.map((data) => (
              <div key={data.id} className="flex items-center mb-2 text-black">
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
      </div><Space50px/>
    </div>
  );
};
export default MakeUpVendorPage;
