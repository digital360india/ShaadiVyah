"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  arrayUnion,
} from "firebase/firestore";
// import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";
import { MdEdit } from "react-icons/md";
import Space50px from "@/components/Space50px";
const VenueVendorPage = () => {
  const [amenities, setAmenities] = useState([]);
  const [userAmenities, setUserAmenities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [userFacilities, setUserFacilities] = useState([]);
  const [isEditingFacilities, setIsEditingFacilities] = useState(false);
  const [user, setUser] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const [userSpaces, setUserSpaces] = useState([]);
  const [isEditingSpaces, setIsEditingSpaces] = useState(false);
  const [isEditingPricing, setIsEditingPricing] = useState(false);
  const [pricing, setPricing] = useState({
    vegPlatePricing: "",
    nonvegPlatePricing: "",
  });
  const [spaceForm, setSpaceForm] = useState({
    spaceName: "",
    spaceType: "",
    floating: "",
    sitting: "",
  });

  const [userNearByPlaces, setUserNearByPlaces] = useState([]);
  const [isEditinguserNearByPlaces, setIsEditinguserNearByPlaces] =
    useState(false);
  const [nearByPlaces, setNearByPlaces] = useState([]);
  const [nearByPlacesForm, setNearByPlacesForm] = useState({
    name: "",
    distance: "",
    locationType: "",
    time: "",
  });

  const [additionalServices, setAdditionalServices] = useState([]);
  const [userAdditionalServices, setUserAdditionalServices] = useState([]);
  const [isEditingAdditionalServices, setIsEditingAdditionalServices] =
    useState(false);
  const [safetyAndSecurityOptions, setSafetyAndSecurityOptions] = useState([]);
  const [userSafetyAndSecurityOptions, setUserSafetyAndSecurityOptions] =
    useState([]);
  const [isEditingSafetyAndSecurity, setIsEditingSafetyAndSecurity] =
    useState(false);

  const [accessibilityOptions, setAccessibilityOptions] = useState([]);
  const [userAccessibilityOptions, setUserAccessibilityOptions] = useState([]);
  const [isEditingAccessibility, setIsEditingAccessibility] = useState(false);
  const fetchUser = async (uid) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUser(userData);
        setUserAmenities(userData.amenitiesUID || []);
        setPricing(userData.pricing || []);
        console.log(userData);
        setUserSpaces(userData.spaces || []);
        setUserFacilities(userData.facilitiesUID || []);
        setUserAccessibilityOptions(userData.accessibilityOptionsUID || []);
        setUserAdditionalServices(userData.additionalServicesUID || []);
        setUserSafetyAndSecurityOptions(
          userData.safetyAndSecurityOptionsUID || []
        );
        setUserNearByPlaces(userData.attractions || []);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchAdditionalServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "additionalServices"));
      const additionalServicesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAdditionalServices(additionalServicesData);
    } catch (error) {
      console.error("Error fetching additional services:", error);
    }
  };

  useEffect(() => {
    fetchAdditionalServices();
    fetchUser(uid);
    fetchAmenities();
    fetchFacilities();
    fetchSpaces();
    fetchSafetyAndSecurityOptions();
    fetchAccessibilityOptions();
    fetchNearByPlaces();
  }, []);

  const fetchSafetyAndSecurityOptions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "safteyAndSecurity"));
      const safetyAndSecurityOptionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSafetyAndSecurityOptions(safetyAndSecurityOptionsData);
    } catch (error) {
      console.error("Error fetching safety and security options:", error);
    }
  };

  const handleAdditionalServiceChange = (e) => {
    const { value, checked } = e.target;
    setUserAdditionalServices((prev) =>
      checked ? [...prev, value] : prev.filter((service) => service !== value)
    );
  };
  const handleSafetyAndSecurityOptionChange = (e) => {
    const { value, checked } = e.target;
    setUserSafetyAndSecurityOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  const handleSaveSafetyAndSecurityOptions = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        safetyAndSecurityOptionsUID: userSafetyAndSecurityOptions,
      });
      setIsEditingSafetyAndSecurity(false);
      alert("Safety and security options updated successfully!");
      fetchUser(user.uid);
    } catch (error) {
      console.error("Error updating safety and security options: ", error);
      alert("Error updating safety and security options.");
    }
  };
  const handleSaveAdditionalServices = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        additionalServicesUID: userAdditionalServices,
      });
      setIsEditingAdditionalServices(false);
      alert("Additional services updated successfully!");
      fetchUser(user.uid);
    } catch (error) {
      console.error("Error updating additional services: ", error);
      alert("Error updating additional services.");
    }
  };
  const handleDeleteSpace = async (index) => {
    try {
      const spaceToDelete = userSpaces[index];
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        spaces: userSpaces.filter((_, i) => i !== index),
      });
      alert("Space deleted successfully!");
      fetchUser(user.uid);
    } catch (error) {
      console.error("Error deleting space:", error);
      alert("Error deleting space.");
    }
  };
  const handleDeleteNearByPlaces = async (index) => {
    try {
      const spaceToDelete = userNearByPlaces[index];
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        attractions: userNearByPlaces.filter((_, i) => i !== index),
      });
      alert("Near by Places deleted successfully!");
      fetchUser(user.uid);
    } catch (error) {
      console.error("Error deleting Near by Places:", error);
      alert("Error deleting Near by Places.");
    }
  };
  const fetchAmenities = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "hotelamenities"));
      const amenitiesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAmenities(amenitiesData);
    } catch (error) {
      console.error("Error fetching amenities:", error);
    }
  };

  const fetchSpaces = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "spacesTypes"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSpaces(data);
    } catch (error) {
      console.error("Error fetching spaces:", error);
    }
  };
  const fetchNearByPlaces = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "attractions"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNearByPlaces(data);
    } catch (error) {
      console.error("Error fetching Near By Places:", error);
    }
  };
  const fetchFacilities = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "hotelfacilities"));
      const facilitiesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFacilities(facilitiesData);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  const cookies = parseCookies();
  const uid = cookies.token;

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setUserAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((amenity) => amenity !== value)
    );
  };
  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setPricing((prevPricing) => ({
      ...prevPricing,
      [name]: value,
    }));
  };
  const handlePricingSave = async () => {
    try {
      const pricingDocRef = doc(db, "users", user.uid);
      await updateDoc(pricingDocRef, { pricing: pricing });
      alert("Pricing updated successfully!");
      setIsEditingPricing(false);
    } catch (error) {
      console.error("Error updating pricing:", error);
      alert("Error updating pricing.");
    }
  };
  const fetchAccessibilityOptions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "accessibility"));
      const accessibilityOptionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAccessibilityOptions(accessibilityOptionsData);
    } catch (error) {
      console.error("Error fetching accessibility options:", error);
    }
  };
  useEffect(() => {
    fetchAccessibilityOptions();
  }, []);
  const handleAccessibilityOptionChange = (e) => {
    const { value, checked } = e.target;
    setUserAccessibilityOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };
  const handleSaveAccessibilityOptions = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        accessibilityOptionsUID: userAccessibilityOptions,
      });
      setIsEditingAccessibility(false);
      alert("Accessibility options updated successfully!");
      fetchUser(user.uid);
    } catch (error) {
      console.error("Error updating accessibility options: ", error);
      alert("Error updating accessibility options.");
    }
  };

  const handleSaveAmenities = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { amenitiesUID: userAmenities });
      setIsEditing(false);
      alert("Amenities updated successfully!");
      fetchUser(user.uid);
    } catch (error) {
      console.error("Error updating amenities: ", error);
      alert("Error updating amenities.");
    }
  };
  const handleFacilityChange = (e) => {
    const { value, checked } = e.target;
    setUserFacilities((prev) =>
      checked ? [...prev, value] : prev.filter((facility) => facility !== value)
    );
  };

  const handleSaveFacilities = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { facilitiesUID: userFacilities });
      setIsEditingFacilities(false);
      alert("Facilities updated successfully!");
      fetchUser(user.uid); // Fetch updated user data
    } catch (error) {
      console.error("Error updating facilities: ", error);
      alert("Error updating facilities.");
    }
  };

  const handleSpaceFormChange = (e) => {
    const { name, value } = e.target;
    setSpaceForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleNearByPlacesFormChange = (e) => {
    const { name, value } = e.target;
    setNearByPlacesForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSaveNearByPlaces = async () => {
    if (
      !nearByPlacesForm.distance &&
      !nearByPlacesForm.locationType &&
      !nearByPlacesForm.time &&
      !nearByPlacesForm.name
    ) {
      alert("Please fill all fields before saving.");
      return;
    }
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        attractions: arrayUnion(nearByPlacesForm),
      });
      setIsEditinguserNearByPlaces(false);
      setNearByPlacesForm({
        distance: "",
        locationType: "",
        time: "",
        name: "",
      });
      alert("Near by places updated successfully!");
      fetchUser(user.uid);
    } catch (error) {
      console.error("Error updating Near by places: ", error);
      alert("Error updating Near by places.");
    }
  };
  const handleSaveSpaces = async () => {
    if (
      !spaceForm.spaceName ||
      !spaceForm.spaceType ||
      !spaceForm.floating ||
      !spaceForm.sitting
    ) {
      alert("Please fill all fields before saving.");
      return;
    }
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        spaces: arrayUnion(spaceForm),
      });
      // setIsEditingSpaces(false);
      setSpaceForm({
        spaceName: "",
        spaceType: "",
        floating: "",
        sitting: "",
      });
      fetchUser(user.uid);
    } catch (error) {
      console.error("Error updating spaces: ", error);
    } finally {
      setIsEditingSpaces(false);
    }
  };

  const handleAddSpace = () => {
    setUserSpaces((prev) => [...prev, spaceForm]);
    setSpaceForm({ spaceName: "", spaceType: "", floating: "", sitting: "" });
  };

  const handleAddNearByPlaces = () => {
    setUserNearByPlaces((prev) => [...prev, nearByPlacesForm]);
    setNearByPlacesForm({ name: "", time: "", distance: "", locationType: "" });
  };
  return (
    <div>
      <div className="  md:px-10 p-4   bg-[url('/images/dashbg1.svg')] w-full">
        {/* <ToastContainer /> */}

        {isEditing ? (
          <div className="bg-[#FFF4E8]">
            <p className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
              Edit New Amenities
            </p>
            {amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="flex items-center mb-2 text-[#9B1B52] font-Merriweather"
              >
                <input
                  type="checkbox"
                  id={amenity.id}
                  value={amenity.id}
                  checked={userAmenities.includes(amenity.id)}
                  onChange={handleAmenityChange}
                  className="mr-2 "
                />
                <label htmlFor={amenity.id}>{amenity.amenityName}</label>
              </div>
            ))}
            <button
              onClick={handleSaveAmenities}
              className="px-4 py-2 rounded bg-green-500 text-white mt-4"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="bg-[#FFF4E8] shadow-md rounded-lg p-4 text-[#9B1B52] font-Merriweather">
            <div className="flex flex-row justify-between">
              {" "}
              <h2 className="text-[24px] font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
                Current Amenities
              </h2>
              <hr className="w-[70%] border-0 h-[1px] bg-gradient-to-r from-[#BE7318] to-[#EED68A] mt-4" />
              <div className="mb-4">
                <button
                  className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : <MdEdit />}
                </button>
              </div>
            </div>
            <ul className="space-y-2">
              {userAmenities.map((amenityId) => {
                const amenity = amenities.find((a) => a.id === amenityId);
                return amenity ? (
                  <li
                    key={amenityId}
                    className="flex items-center space-x-4 text-[#9B1B52]"
                  >
                    <img
                      src="/images/mandlart.svg"
                      alt="icon"
                      className="w-6 h-6"
                    />
                    <span>{amenity.amenityName}</span>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}
        {isEditingPricing ? (
          <>
            <div className="bg-[#FFF4E8] shadow-md rounded-lg p-4">
              <div className="flex flex-row justify-between">
                <h2 className="text-[24px] font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
                  Edit Pricings
                </h2>
                <div className="mb-4">
                  <button
                    className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#9B1B52] font-Merriweather">
                    Veg Plate Pricing
                  </label>
                  <input
                    type="text"
                    name="vegPlatePricing"
                    value={pricing.vegPlatePricing}
                    onChange={handlePricingChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[#9B1B52] font-Merriweather">
                    Non-Veg Plate Pricing
                  </label>
                  <input
                    type="text"
                    name="nonvegPlatePricing"
                    value={pricing.nonvegPlatePricing}
                    onChange={handlePricingChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  onClick={handlePricingSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </div>{" "}
          </>
        ) : (
          <>
            <div className="bg-[#FFF4E8]  shadow-md rounded-lg p-4 mt-6 text-[#9B1B52] font-Merriweather">
              <div className="flex flex-row justify-between">
                <h2 className="text-[24px] font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
                  Current Pricings
                </h2>

                <hr className="w-[70%] border-0 h-[1px] bg-gradient-to-r from-[#BE7318] to-[#EED68A] mt-4" />

                <div className="mb-4">
                  <button
                    className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
                    onClick={() => setIsEditingPricing(!isEditingPricing)}
                  >
                    {isEditingPricing ? "Cancel" : <MdEdit />}
                  </button>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2">
                <li className="list-none flex space-x-4">
                  <img
                    src="/images/mandlart.svg"
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <strong>Veg Plate Pricing:</strong>{" "}
                  {pricing.vegPlatePricing || "Not Set"}
                </li>
                <li className="list-none flex space-x-4">
                  <img
                    src="/images/mandlart.svg"
                    alt="icon"
                    className="w-6 h-6"
                  />
                  <strong>Non-Veg Plate Pricing:</strong>{" "}
                  {pricing.nonvegPlatePricing || "Not Set"}
                </li>
              </ul>
            </div>
          </>
        )}

        {isEditingSpaces ? (
          <div className=" mt-10">
            <h2 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
              Edit New Space
            </h2>
            <div className="mb-2">
              <input
                type="text"
                name="spaceName"
                value={spaceForm.spaceName}
                onChange={handleSpaceFormChange}
                placeholder="Space Name"
                className="border p-2 rounded w-full mb-2"
                required
              />
              <select
                name="spaceType"
                value={spaceForm.spaceType}
                onChange={handleSpaceFormChange}
                className="border p-2 rounded w-full mb-2"
              >
                <option value="">Select Space Type</option>
                {spaces.map((space) => (
                  <option key={space.id} value={space.id}>
                    {space.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="floating"
                value={spaceForm.floating}
                onChange={handleSpaceFormChange}
                placeholder="Floating Capacity"
                className="border p-2 rounded w-full mb-2"
                required
              />
              <input
                type="number"
                name="sitting"
                value={spaceForm.sitting}
                onChange={handleSpaceFormChange}
                placeholder="Sitting Capacity"
                className="border p-2 rounded w-full mb-2"
                required
              />
              <button
                onClick={handleAddSpace}
                className="px-4 py-2 rounded bg-blue-500 text-black"
              >
                Edit Space
              </button>
            </div>
            <div className="space-x-7">
              <button
                onClick={handleSaveSpaces}
                className="px-6 py-3 rounded-lg text-white font-semibold mt-4 shadow-md 
              bg-[radial-gradient(50%_50%_at_50%_50%,_#DD0D63_0%,_#A11C5C_100%)] 
              hover:opacity-90 transition"
              >
                Save Spaces
              </button>
              <button
                onClick={() => setIsEditingSpaces(!isEditingSpaces)}
                className="px-6 py-3 rounded-lg text-[#A11C5C] font-semibold mt-4 border border-[#A11C5C] "
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#FFF4E8] shadow-md rounded-lg p-4 mt-8 text-[#9B1B52] font-Merriweather">
            <div className="flex flex-row justify-between font-Merriweather">
              <h2 className="text-[24px] font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
                Current Spaces
              </h2>
              <hr className="w-[70%] border-0 h-[1px] bg-gradient-to-r from-[#BE7318] to-[#EED68A] mt-4" />

              <button
                className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
                onClick={() => setIsEditingSpaces(!isEditingSpaces)}
              >
                {isEditingSpaces ? "Cancel" : <MdEdit />}
              </button>
            </div>
            <ul className="list-disc list-inside space-y-2 ">
              {userSpaces.length > 0 ? (
                userSpaces.map((space, index) => {
                  const spaceData = spaces.find(
                    (s) => s.id === space.spaceType
                  );
                  return spaceData ? (
                    <li
                      key={index}
                      className="text-[#9B1B52] space-x-8 list-none flex "
                    >
                      <div className="space-x-4">
                        <img
                          src="/images/mandlart.svg"
                          alt="icon"
                          className="w-6 h- pt-4"
                        />
                      </div>

                      <div>
                        <span className="font-medium text-lg">
                          {space.spaceName}
                        </span>
                        <span className="text-sm text-gray-600">
                          {" "}
                          ({spaceData.name})
                        </span>
                        <button
                          onClick={() => handleDeleteSpace(index)}
                          className="p-1 px-2 rounded-lg text-[#A11C5C] border border-[#A11C5C] text-[12px]"
                        >
                          Delete
                        </button>
                        <div className="text-sm text-gray-500 mt-1">
                          Floating:{" "}
                          <span className="font-medium">{space.floating}</span>,
                          Sitting:{" "}
                          <span className="font-medium">{space.sitting}</span>
                        </div>
                      </div>
                    </li>
                  ) : null;
                })
              ) : (
                <li className="text-gray-700">No spaces available</li>
              )}
            </ul>
          </div>
        )}

        <div className="mb-4 mt-4">
          {isEditinguserNearByPlaces ? (
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Edit New Nearby Attractions
              </h2>
              <div className="mb-2">
                <select
                  name="locationType"
                  value={nearByPlacesForm.locationType}
                  onChange={handleNearByPlacesFormChange}
                  className="border p-2 rounded w-full mb-2"
                >
                  <option value="">Select Space Type</option>
                  {nearByPlaces.map((space, index) => (
                    <option key={index} value={space.id}>
                      {space.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="distance"
                  value={nearByPlacesForm.distance}
                  onChange={handleNearByPlacesFormChange}
                  placeholder="Distance to the place of attraction"
                  className="border p-2 rounded w-full mb-2"
                  required
                />
                <input
                  type="string"
                  name="name"
                  value={nearByPlacesForm.name}
                  onChange={handleNearByPlacesFormChange}
                  placeholder="Name of the place"
                  className="border p-2 rounded w-full mb-2"
                  required
                />
                <input
                  type="number"
                  name="time"
                  value={nearByPlacesForm.time}
                  onChange={handleNearByPlacesFormChange}
                  placeholder="Time (min) to the place of attraction"
                  className="border p-2 rounded w-full mb-2"
                  required
                />
                <button
                  onClick={handleSaveNearByPlaces}
                  className="px-4 py-2 rounded bg-blue-500 text-white bg-green-400"
                >
                  Add Near By Places
                </button>
              </div>
              <button
                onClick={() => setIsEditinguserNearByPlaces(false)}
                className="px-4 py-2 rounded bg-red-500 text-white mt-4"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-4 mt-8">
              <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Current Nearby Places
                </h2>
                <button
                  className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
                  onClick={() => setIsEditinguserNearByPlaces(true)}
                >
                  <MdEdit />
                </button>
              </div>
              <ul className="list-disc list-inside space-y-2">
                {userNearByPlaces.length > 1 ? (
                  userNearByPlaces.map((place, index) => {
                    const placeData = nearByPlaces.find(
                      (s) => s.id === place.locationType
                    );
                    return placeData ? (
                      <li key={index} className="text-gray-700">
                        <span className="font-medium text-lg">
                          {place.name}{" "}
                        </span>
                        <span className="text-sm text-black ">
                          {" "}
                          {placeData.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {" "}
                          ({place.distance} km)
                        </span>
                        <div className="text-sm text-gray-500 mt-1">
                          Distance:{" "}
                          <span className="font-medium">
                            {place.distance} km
                          </span>
                          , Time:{" "}
                          <span className="font-medium">{place.time} mins</span>
                        </div>
                        <button
                          onClick={() => handleDeleteNearByPlaces(index)}
                          className="text-red-500 mt-2 focus:outline-none"
                        >
                          Delete
                        </button>
                      </li>
                    ) : null;
                  })
                ) : userNearByPlaces.length === 1 ? (
                  userNearByPlaces.map((place, index) => {
                    const placeData = nearByPlaces.find(
                      (s) => s.id === place.locationType
                    );
                    return placeData ? (
                      <li key={index} className="text-gray-700">
                        <span className="font-medium text-lg">
                          {placeData.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {" "}
                          ({place.distance} km)
                        </span>
                        <div className="text-sm text-gray-500 mt-1">
                          Distance:{" "}
                          <span className="font-medium">
                            {place.distance} km
                          </span>
                          , Time:{" "}
                          <span className="font-medium">{place.time} mins</span>
                        </div>
                        <button
                          onClick={() => handleDeleteNearByPlaces(index)}
                          className="text-red-500 mt-2 focus:outline-none"
                        >
                          Delete
                        </button>
                      </li>
                    ) : null;
                  })
                ) : (
                  <li className="text-gray-700">No nearby places added.</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className=" md:px-10 p-4 max-w-xl">
        {isEditingFacilities ? (
          <div className="px-10">
            <p className="text-xl font-semibold mb-4 text-gray-800 ">
              Edit New Facilities
            </p>

            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="flex items-center mb-4 text-black  "
              >
                <input
                  type="checkbox"
                  id={facility.id}
                  value={facility.id}
                  checked={userFacilities.includes(facility.id)}
                  onChange={handleFacilityChange}
                  className="mr-2"
                />
                <label htmlFor={facility.id}>{facility.name}</label>
              </div>
            ))}
            <button
              onClick={handleSaveFacilities}
              className="px-4 py-2 rounded bg-green-500 text-white mt-2 mb-10"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-row justify-between   ">
              {" "}
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 pt-1 px-1">
                Current Facilities
              </h2>{" "}
              <div className="mb-4 pt-4">
                <button
                  className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
                  onClick={() => setIsEditingFacilities(!isEditingFacilities)}
                >
                  {isEditingFacilities ? "Cancel" : <MdEdit />}
                </button>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-2">
              {userFacilities.map((facilityId) => {
                const facility = facilities.find((f) => f.id === facilityId);
                return facility ? (
                  <li key={facilityId} className="text-gray-700">
                    {facility.name}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}
      </div>

      <div className=" md:px-10 p-4 max-w-xl">
        {/* <ToastContainer /> */}

        {isEditingAdditionalServices ? (
          <div className="px-10">
            <p className="text-xl font-semibold mb-4 text-gray-800 ">
              Edit New Services
            </p>
            {additionalServices.map((service) => (
              <div
                key={service.id}
                className="flex items-center mb-4 text-black "
              >
                <input
                  type="checkbox"
                  id={service.id}
                  value={service.id}
                  checked={userAdditionalServices.includes(service.id)}
                  onChange={handleAdditionalServiceChange}
                  className="mr-2"
                />
                <label htmlFor={service.id}>{service.name}</label>
              </div>
            ))}
            <button
              onClick={handleSaveAdditionalServices}
              className="px-4 py-2 rounded bg-green-500 text-white mt-2 mb-10"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-4 ">
            <div className="flex flex-row justify-between">
              {" "}
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 pt-1 px-1">
                Additional Services
              </h2>{" "}
              <div className="mb-4 pt-4">
                <button
                  className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
                  onClick={() =>
                    setIsEditingAdditionalServices(!isEditingAdditionalServices)
                  }
                >
                  {isEditingAdditionalServices ? "Cancel" : <MdEdit />}
                </button>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-2">
              {userAdditionalServices.map((serviceId) => {
                const service = additionalServices.find(
                  (s) => s.id === serviceId
                );
                return service ? (
                  <li key={serviceId} className="text-gray-700">
                    {service.name}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}
      </div>

      <div className=" md:px-10 p-4 max-w-xl">
        {isEditingSafetyAndSecurity ? (
          <div className="px-10">
            <p className="text-xl font-semibold mb-4 text-gray-800 ">
              Edit New Options
            </p>
            {safetyAndSecurityOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center mb-4 text-black"
              >
                <input
                  type="checkbox"
                  id={option.id}
                  value={option.id}
                  checked={userSafetyAndSecurityOptions.includes(option.id)}
                  onChange={handleSafetyAndSecurityOptionChange}
                  className="mr-2"
                />
                <label htmlFor={option.id}>{option.name}</label>
              </div>
            ))}
            <button
              onClick={handleSaveSafetyAndSecurityOptions}
              className="px-4 py-2 rounded bg-green-500 text-white mt-2 mb-10"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-4 ">
            <div className="flex flex-row justify-between">
              {" "}
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 pt-1 px-1">
                Safety and Security Options
              </h2>{" "}
              <div className="mb-4 pt-4">
                <button
                  className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
                  onClick={() =>
                    setIsEditingSafetyAndSecurity(!isEditingSafetyAndSecurity)
                  }
                >
                  {isEditingSafetyAndSecurity ? "Cancel" : <MdEdit />}
                </button>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-2">
              {userSafetyAndSecurityOptions.map((optionId) => {
                const option = safetyAndSecurityOptions.find(
                  (o) => o.id === optionId
                );
                return option ? (
                  <li key={optionId} className="text-gray-700">
                    {option.name}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}

        <Space50px />

        {isEditingAccessibility ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Edit Accessibility Options
            </h2>{" "}
            {accessibilityOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center mb-10 text-black"
              >
                <input
                  type="checkbox"
                  id={option.id}
                  value={option.id}
                  checked={userAccessibilityOptions.includes(option.id)}
                  onChange={handleAccessibilityOptionChange}
                  className="mr-2"
                />
                <label htmlFor={option.id}>{option.name}</label>
              </div>
            ))}
            <button
              onClick={handleSaveAccessibilityOptions}
              className="px-4 py-2 rounded bg-green-500 text-white mt-4"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-row justify-between">
              {" "}
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Accessibility Options
              </h2>{" "}
              <div className="mb-4">
                <button
                  className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
                  onClick={() =>
                    setIsEditingAccessibility(!isEditingAccessibility)
                  }
                >
                  {isEditingAccessibility ? "Cancel" : <MdEdit />}
                </button>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-2">
              {userAccessibilityOptions.map((optionId) => {
                const option = accessibilityOptions.find(
                  (o) => o.id === optionId
                );
                return option ? (
                  <li key={optionId} className="text-gray-700">
                    {option.name}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}
      </div>

      <Space50px />
    </div>
  );
};

export default VenueVendorPage;
