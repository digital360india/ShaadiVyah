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
import { toast, ToastContainer } from "react-toastify";
import { FiGift, FiHome, FiImage, FiTag } from "react-icons/fi";

import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";
import { MdEdit } from "react-icons/md";
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
  const [spaceForm, setSpaceForm] = useState({
    spaceName: "",
    spaceType: "",
    floating: "",
    sitting: "",
  });

  const fetchUser = async (uid) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUser(userData);
        setUserAmenities(userData.amenitiesUID || []);
        setUserSpaces(userData.spaces || []);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  const [additionalServices, setAdditionalServices] = useState([]);
  const [userAdditionalServices, setUserAdditionalServices] = useState([]);
  const [isEditingAdditionalServices, setIsEditingAdditionalServices] =
    useState(false);

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
  }, []);
  const [safetyAndSecurityOptions, setSafetyAndSecurityOptions] = useState([]);
  const [userSafetyAndSecurityOptions, setUserSafetyAndSecurityOptions] = useState([]);
  const [isEditingSafetyAndSecurity, setIsEditingSafetyAndSecurity] = useState(false);

  const fetchSafetyAndSecurityOptions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "safetyAndSecurity"));
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
      toast.success("Safety and security options updated successfully!");
      fetchUser(user.uid);
    } catch (error) {
      console.error("Error updating safety and security options: ", error);
      toast.error("Error updating safety and security options.");
    }
  };
  const handleSaveAdditionalServices = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        additionalServicesUID: userAdditionalServices,
      });
      setIsEditingAdditionalServices(false);
      toast.success("Additional services updated successfully!");
      fetchUser(user.uid);
    } catch (error) {
      console.error("Error updating additional services: ", error);
      toast.error("Error updating additional services.");
    }
  };
  const handleDeleteSpace = async (index) => {
    try {
      const spaceToDelete = userSpaces[index];
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        spaces: userSpaces.filter((_, i) => i !== index)
      });
      toast.success("Space deleted successfully!");
      fetchUser(user.uid); // Fetch updated user data
    } catch (error) {
      console.error("Error deleting space:", error);
      toast.error("Error deleting space.");
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

  useEffect(() => {
    if (uid) {

      fetchUser(uid);
      fetchAmenities();
      fetchFacilities();
      fetchSpaces();
    }
  }, []);

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setUserAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((amenity) => amenity !== value)
    );
  };

  const handleSaveAmenities = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { amenitiesUID: userAmenities });
      setIsEditing(false);
      toast.success("Amenities updated successfully!");
      fetchUser(user.uid);
    } catch (error) {
      console.error("Error updating amenities: ", error);
      toast.error("Error updating amenities.");
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
      toast.success("Facilities updated successfully!");
      fetchUser(user.uid); // Fetch updated user data
    } catch (error) {
      console.error("Error updating facilities: ", error);
      toast.error("Error updating facilities.");
    }
  };
  
  const handleSpaceFormChange = (e) => {
    const { name, value } = e.target;
    setSpaceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSpaces = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        spaces: arrayUnion(spaceForm),
      });
      setIsEditingSpaces(false);
      toast.success("Spaces updated successfully!");
      fetchUser(user.uid);
    } catch (error) {
      console.error("Error updating spaces: ", error);
      toast.error("Error updating spaces.");
    }
  };

  const handleAddSpace = () => {
    setUserSpaces((prev) => [...prev, spaceForm]);
    setSpaceForm({ spaceName: "", spaceType: "", floating: "", sitting: "" });
  };

  return (
    <div>
    <div className="max-w-xl  md:p-10 p-4 ">
      <ToastContainer />

      {isEditing ? (
        <div>
          {amenities.map((amenity) => (
            <div key={amenity.id} className="flex items-center mb-2 text-black">
              <input
                type="checkbox"
                id={amenity.id}
                value={amenity.id}
                checked={userAmenities.includes(amenity.id)}
                onChange={handleAmenityChange}
                className="mr-2"
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
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-row justify-between">
            {" "}
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Current Amenities
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
            {userAmenities.map((amenityId) => {
              const amenity = amenities.find((a) => a.id === amenityId);
              return amenity ? (
                <li key={amenityId} className="text-gray-700">
                  {amenity.amenityName}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      )}

      <div className="mb-4 mt-4"></div>
      {isEditingSpaces ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Add New Space</h2>
          <div className="mb-2">
            <input
              type="text"
              name="spaceName"
              value={spaceForm.spaceName}
              onChange={handleSpaceFormChange}
              placeholder="Space Name"
              className="border p-2 rounded w-full mb-2"
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
            />
            <input
              type="number"
              name="sitting"
              value={spaceForm.sitting}
              onChange={handleSpaceFormChange}
              placeholder="Sitting Capacity"
              className="border p-2 rounded w-full mb-2"
            />
            <button
              onClick={handleAddSpace}
              className="px-4 py-2 rounded bg-blue-500 text-white"
            >
              Add Space
            </button>
          </div>
          <button
            onClick={handleSaveSpaces}
            className="px-4 py-2 rounded bg-green-500 text-white mt-4"
          >
            Save Spaces
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 mt-4">
          <div className="flex flex-row  justify-between">
            {" "}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Current Spaces
            </h2>{" "}
            <button
              className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
              onClick={() => setIsEditingSpaces(!isEditingSpaces)}
            >
              {isEditingSpaces ? "Cancel" : <MdEdit />}
            </button>{" "}
          </div>{" "}
          <ul className="list-disc list-inside space-y-2">
  {userSpaces.length > 1 ? (
    userSpaces.map((space, index) => {
      const spaceData = spaces.find((s) => s.id === space.spaceType);
      return spaceData ? (
        <li key={index} className="text-gray-700">
          <span className="font-medium text-lg">{space.spaceName}</span>
          <span className="text-sm text-gray-600"> ({spaceData.name})</span>
          <div className="text-sm text-gray-500 mt-1">
            Floating: <span className="font-medium">{space.floating}</span>,
            Sitting: <span className="font-medium">{space.sitting}</span>
          </div>
          <button
          onClick={() => handleDeleteSpace(index)}
          className="text-red-500 mt-2 focus:outline-none"
        >
          Delete
        </button>
        </li>
      ) : null;
    })
  ) : userSpaces.length === 1 ? (
    <li className="text-gray-700">
      <span className="font-medium text-lg">{userSpaces[0].spaceName}</span>
      <span className="text-sm text-gray-600">
        {" "}
        ({spaces.find((s) => s.id === userSpaces[0].spaceType)?.name})
      </span>
      <div className="text-sm text-gray-500 mt-1">
        Floating: <span className="font-medium">{userSpaces[0].floating}</span>,
        Sitting: <span className="font-medium">{userSpaces[0].sitting}</span>
      </div>
    </li>
  ) : null}
</ul>

        </div>
      )}
    </div>
    {isEditingFacilities ? (
  <div>
    {facilities.map((facility) => (
      <div key={facility.id} className="flex items-center mb-2 text-black">
        <input
          type="checkbox"
          id={facility.id}
          value={facility.id}
          checked={userFacilities.includes(facility.id)}
          onChange={handleFacilityChange}
          className="mr-2"
        />
        <label htmlFor={facility.id}>{facility.facilityName}</label>
      </div>
    ))}
    <button
      onClick={handleSaveFacilities}
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
        Current Facilities
      </h2>{" "}
      <div className="mb-4">
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
            {facility.facilityName}
          </li>
        ) : null;
      })}
    </ul>
  </div>
)}
 <div>
      <ToastContainer />

      {isEditingAdditionalServices ? (
        <div>
          {additionalServices.map((service) => (
            <div
              key={service.id}
              className="flex items-center mb-2 text-black"
            >
              <input
                type="checkbox"
                id={service.id}
                value={service.id}
                checked={userAdditionalServices.includes(service.id)}
                onChange={handleAdditionalServiceChange}
                className="mr-2"
              />
              <label htmlFor={service.id}>{service.serviceName}</label>
            </div>
          ))}
          <button
            onClick={handleSaveAdditionalServices}
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
              Additional Services
            </h2>{" "}
            <div className="mb-4">
              <button
                className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
                onClick={() =>
                  setIsEditingAdditionalServices(
                    !isEditingAdditionalServices
                  )
                }
              >
                {isEditingAdditionalServices ? "Cancel" : <MdEdit />}
              </button>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {userAdditionalServices.map((serviceId) => {
              const service = additionalServices.find((s) => s.id === serviceId);
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
    {isEditingSafetyAndSecurity ? (
        <div>
          {safetyAndSecurityOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-center mb-2 text-black"
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
              Safety and Security Options
            </h2>{" "}
            <div className="mb-4">
              <button
                className="px-4 py-2 rounded bg-blue-500 text-black mb-4"
                onClick={() =>
                  setIsEditingSafetyAndSecurity(
                    !isEditingSafetyAndSecurity
                  )
                }
              >
                {isEditingSafetyAndSecurity ? "Cancel" : <MdEdit />}
              </button>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {userSafetyAndSecurityOptions.map((optionId) => {
              const option = safetyAndSecurityOptions.find((o) => o.id === optionId);
              return option ? (
                <li key={optionId} className="text-gray-700">
                  {option.name}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      )}
    <div className="w-screen  bg-gradient-to-r from-[#FF1053] to-[#F7ACCF] text-white flex justify-between fixed bottom-0 lg:hidden px-4">
            
            <div className="py-[20px]"><FiHome className=" w-[40px] h-[40px] " /></div>
            <div className="py-[20px]"><FiTag className=" w-[40px] h-[40px]" /></div>
            <div className="py-[20px]"><FiImage className=" w-[40px] h-[40px]" /></div>
            <div className="py-[20px]"><FiGift className=" w-[40px] h-[40px]" /></div>
    
    
    
          </div> 
          </div>
  );
};

export default VenueVendorPage;
