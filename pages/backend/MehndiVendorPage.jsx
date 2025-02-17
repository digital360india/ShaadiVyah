"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { parseCookies } from "nookies";
import Space50px from "@/components/Space50px";

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
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "true" || value === "false" ? value === "true" : value,

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
    <div className="p-8 bg-gray-100 min-h-screen bg-[url('/images/dashbg1.svg')] w-full">
      <div
        className="  md:w-[950px] w-full mx-auto bg-[#FFF4E8] p-6 rounded-lg shadow-lg "
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
        <div className="p-6">
          {editMode ? (
            <form className="" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
                Edit Artist Details
              </h2>
              <div className="grid grid-cols-2 gap-10 justify-between font-Merriweather">
                <div className="mb-4">
                  <label
                    htmlFor="bridalMehendi"
                    className="block text-[#9B1B52] font-medium"
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
                    className="block text-[#9B1B52] font-medium"
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
                <div className="mb-4">
                  <label
                    htmlFor="outstationTravel"
                    className="block text-[#9B1B52] font-medium mb-2"
                  >
                    Outstation Travel and Stay charges covered by client
                  </label>
                  <select
                    id="outstationTravel"
                    name="outstationTravel"
                    value={formData.outstationTravel}
                    onChange={handleChange}
                    className=" w-full p-3 border border-gray-300 rounded-md bg-white "
                  >
                    <option value="true" className="bg-white">
                      Yes
                    </option>
                    <option value="false" className="bg-white">
                      No
                    </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="practicingSince"
                    className="block text-[#9B1B52] font-medium"
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
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Travels to Venue
                  </label>
                  <select
                    id="travelsToVenue"
                    name="travelsToVenue"
                    value={formData.travelsToVenue}
                    onChange={handleChange}
                    className="block w-full p-3 border border-gray-300 rounded-md bg-white "
                  >
                    <option value="true" className="bg-white">
                      Yes
                    </option>
                    <option value="false" className="bg-white">
                      No
                    </option>
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
              </div>
              <div className="flex justify-end gap-6">
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
              </div>{" "}
            </form>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-blue-600 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
                Artist Details
              </h2>
              <div className="grid grid-cols-2 gap-10 justify-between font-Merriweather ">
                <div className="mb-4">
                  <label
                    htmlFor="bridalMehendi"
                    className="block font-medium text-[#9B1B52]"
                  >
                    Bridal Mehendi
                  </label>
                  <span className="block p-3 bg-gray-100 border border-gray-300 mt-1 rounded shadow-sm"> 
                    {formData.bridalMehendi || "Bridal Mehendi price"}
                  </span>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="familyMehendi"
                    className="block font-medium text-[#9B1B52]"
                  >
                    Family Mehendi (per person)
                  </label>
                  <span className="block p-3 bg-gray-100 border border-gray-300 mt-1 rounded shadow-sm">
                    {formData.familyMehendi || "Family Mehendi price"}
                  </span>
                </div>
                <div className="mb-4">
                  <label className="block text-[#9B1B52] font-medium">
                    Outstation Travel and Stay charges covered by client
                  </label>
                  <span className="block p-3 bg-gray-100 border border-gray-300 mt-1 rounded shadow-sm">
                    {formData.outstationTravel ? "Yes" : "No"}
                  </span>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="practicingSince"
                    className="block text-[#9B1B52] font-medium"
                  >
                    Practicing Mehendi since
                  </label>
                  <span className="block p-3 bg-gray-100 border border-gray-300 mt-1 rounded shadow-sm">
                    {formData.practicingSince || "Practicing Since"}
                  </span>
                </div>
                <div className="mb-4">
                  <label className="block text-[#9B1B52] font-medium">
                    Travels to Venue
                  </label>
                  <span className="block p-3 bg-gray-100 border border-gray-300 mt-1 rounded shadow-sm">
                    {formData.travelsToVenue ? "Yes" : "No"}
                  </span>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="advancePayment"
                    className="block text-[#9B1B52] font-medium"
                  >
                    Advance Payment
                  </label>
                  <span className="block p-3 bg-gray-100 border border-gray-300 mt-1 rounded shadow-sm">
                    {formData.advancePayment ||
                      "Enter amount of advance Payment"}
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-6 py-3 rounded-lg text-[#A11C5C] font-semibold mt-4 border border-[#A11C5C] text-[12px] md:text-[16px] "
                  onClick={() => setEditMode(true)}
                >
                  Edit Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Space50px />
    </div>
  );
};

export default MehndiVendorPage;
