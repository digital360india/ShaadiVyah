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
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";
import { MdEdit } from "react-icons/md";
const UserPage = () => {
  const [amenities, setAmenities] = useState([]);
  const [userAmenities, setUserAmenities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
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

  const cookies = parseCookies();
  const uid = cookies.token;

  useEffect(() => {
    if (uid) {
      fetchUser(uid);
      fetchAmenities();
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
    <div className="max-w-xl  p-10">
      <ToastContainer />
      {/* <h1 className="text-2xl font-bold mb-4 w-96 backdrop-blur-sm fixed ">My Services</h1> */}

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
                    <span className="font-medium text-lg">
                      {space.spaceName}
                    </span>
                    <span className="text-sm text-gray-600">
                      {" "}
                      ({spaceData.name})
                    </span>
                    <div className="text-sm text-gray-500 mt-1">
                      Floating:{" "}
                      <span className="font-medium">{space.floating}</span>,
                      Sitting:{" "}
                      <span className="font-medium">{space.sitting}</span>
                    </div>
                  </li>
                ) : null;
              })
            ) : (
              <div className="text-gray-700">
                <span className="font-medium text-lg">
                  {userSpaces.spaceName}
                </span>
                <span className="text-sm text-gray-600">
                  {" "}
                  ({spaces.find((s) => s.id === userSpaces.spaceType)?.name})
                </span>
                <div className="text-sm text-gray-500 mt-1">
                  Floating:{" "}
                  <span className="font-medium">{userSpaces.floating}</span>,
                  Sitting:{" "}
                  <span className="font-medium">{userSpaces.sitting}</span>
                </div>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserPage;
