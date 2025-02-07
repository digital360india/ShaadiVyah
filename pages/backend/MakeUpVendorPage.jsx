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
    <div className="p-8 bg-gray-100 min-h-screen bg-[url('/images/dashbg1.svg')] w-full">
      <div
        className="md:w-[850px] w-full mx-auto bg-[#FFF4E8]  rounded-lg shadow-lg"
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
        <div className="p-8">
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
                Edit Artist Details
              </h2>
              <div className="grid grid-cols-2 gap-10 justify-between font-Merriweather">
                <div className="mb-4">
                  <label
                    className="block text-[#9B1B52] font-medium"
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
                    className="block text-[#9B1B52] font-medium"
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
                    className="block text-[#9B1B52] font-medium"
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
                <div className="">
                  <label
                    htmlFor="travelsToVenue"
                    className="block text-[#9B1B52] font-medium mb-2 "
                  >
                    Travels to Venue
                  </label>
                  <select
                    id="travelsToVenue"
                    name="travelsToVenue"
                    value={formData.travelsToVenue}
                    onChange={handleChange}
                    className="block w-full p-3 border border-gray-300 bg-white "
                  >
                    <option value="yes" className="bg-white">
                      Yes
                    </option>
                    <option value="no" className="bg-white">
                      No
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-[#9B1B52] font-medium"
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
                <div className="">
                  <label
                    htmlFor="outstationTravelCovered"
                    className="block text-[#9B1B52] font-medium mb-2"
                  >
                    Outstation travel and stay covered by client
                  </label>
                  <select
                    id="outstationTravelCovered"
                    name="outstationTravelCovered"
                    value={formData.outstationTravelCovered}
                    onChange={handleChange}
                    className="block w-full p-3 border border-gray-300 bg-white"
                  >
                    <option value="yes" className="bg-white">
                      Yes
                    </option>
                    <option value="no" className="bg-white">
                      No
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-[#9B1B52] font-medium"
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
                    className="block text-[#9B1B52] font-medium"
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
                    className="block text-[#9B1B52] font-medium"
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
                </div>
              </div>
              <div className="mb-10">
                <div className="flex justify-end mt-4 gap-8">
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
                      hover:opacity-90 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="">
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
                Artist Details
              </h2>
              <div className="grid grid-cols-2 gap-10 justify-between font-Merriweather">
                <div className="mb-4">
                  <label
                    className="block text-[#9B1B52] font-medium"
                    htmlFor="pricePerDay"
                  >
                    Starting price per day
                  </label>
                  <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                    {formData.pricePerDay ? (
                      formData.pricePerDay
                    ) : (
                      <span className="text-gray-300">
                        Enter amount per day
                      </span>
                    )}
                  </span>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-[#9B1B52] font-medium"
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
                    className="block text-[#9B1B52] font-medium"
                    htmlFor="practicingSince"
                  >
                    {" "}
                    Practicing Since
                  </label>
                  <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                    {formData.practicingSince ? (
                      formData.practicingSince
                    ) : (
                      <span className="text-gray-300">Practicing Since</span>
                    )}
                  </span>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-[#9B1B52] font-medium"
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
                      <span className="text-gray-300">Travels to venue</span>
                    )}
                  </span>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-[#9B1B52] font-medium"
                    htmlFor="advancePayment"
                  >
                    Advance Payment
                  </label>
                  <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                    {formData.pricePerFunction ? (
                      formData.pricePerFunction
                    ) : (
                      <span className="text-gray-300"> Price Per Function</span>
                    )}
                  </span>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-[#9B1B52] font-medium"
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
                      <span className="text-gray-300">
                        {" "}
                        Outstation Travel Covered
                      </span>
                    )}
                  </span>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-[#9B1B52] font-medium"
                    htmlFor="preweddingMakeupCharge"
                  >
                    Pre-Wedding Makeup Charge
                  </label>
                  <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                    {formData.preweddingMakeupCharge ? (
                      formData.preweddingMakeupCharge
                    ) : (
                      <span className="text-gray-300">
                        Engagement Makeup Charge{" "}
                      </span>
                    )}
                  </span>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-[#9B1B52] font-medium"
                    htmlFor="makeupPerFamilyMember"
                  >
                    Makeup Per Family Member
                  </label>
                  <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                    {formData.makeupPerFamilyMember ? (
                      formData.makeupPerFamilyMember
                    ) : (
                      <span className="text-gray-300">
                        Makeup Per Family Member
                      </span>
                    )}
                  </span>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-[#9B1B52] font-medium"
                    htmlFor="makeupPerFamilyMember"
                  >
                    Makeup Per Family Member
                  </label>
                  <span className="block p-3  bg-gray-100 border border-gray-300 mt-1  rounded shadow-sm text-gray-700">
                    {formData.makeupPerFamilyMember ? (
                      formData.makeupPerFamilyMember
                    ) : (
                      <span className="text-gray-300">
                        Makeup Per Family Member
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-6 py-3 rounded-lg text-[#A11C5C] font-semibold mt-4 border border-[#A11C5C] mb-10 "
                  onClick={() => setEditMode(true)}
                >
                  Edit Details
                </button>
              </div>
            </div>
          )}
          {isEditing ? (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
                Edit My Services
              </h2>

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
                    className="mr-2"
                  />
                  <label htmlFor={data.id}>{data.name}</label>
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
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex flex-row items-center justify-between w-full">
                <h2 className="md:text-[32px] text-[28px] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
                  My Services
                </h2>
                <hr className="border-t-2 border-[#A11C5C] flex-grow mx-4" />
                <button
                  className="px-4 py-2 rounded bg-blue-500 text-black"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : <MdEdit />}
                </button>
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
      </div>
      <Space50px />
    </div>
  );
};
export default MakeUpVendorPage;
