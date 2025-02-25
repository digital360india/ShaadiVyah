"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase"; // Adjust the path to your Firebase configuration
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const AmenitiesPage = () => {
  const [photographers, setPhotographers] = useState([]);
  const [photographersFormData, setphotographersFormData] = useState({
    name: "",
  });
  const [isEditingphotographers, setIsEditingphotographers] = useState(false);
  const [editingIDphotographers, setEditingIDphotographers] = useState(null);

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "photographerServices")
        );
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setPhotographers(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPhotographers();
  }, []);

  const handleChangePhotographers = (e) => {
    const { name, value } = e.target;
    setphotographersFormData({ ...photographersFormData, [name]: value });
  };

  const handleSubmitPhotographers = async (e) => {
    e.preventDefault();
    if (isEditingphotographers) {
      await handleEditPhotographers(
        editingIDphotographers,
        photographersFormData.name
      );
    } else {
      await handleAddPhotographers(photographersFormData.name);
    }
    setphotographersFormData({ name: "" });
    setIsEditingphotographers(false);
    setEditingIDphotographers(null);
  };

  const handleAddPhotographers = async (name) => {
    try {
      const docRef = await addDoc(collection(db, "photographerServices"), {
        name,
      });
      setPhotographers([...photographers, { name, id: docRef.id }]);
      toast.success("Added successfully!");
    } catch (error) {
      console.error("Error adding ", error);
      toast.error("Error adding ");
    }
  };

  const handleEditPhotographers = async (id, name) => {
    try {
      const spaceRef = doc(db, "photographerServices", id);
      await updateDoc(spaceRef, { name });
      setPhotographers(
        photographers.map((data) => (data.id === id ? { name, id } : data))
      );
      toast.success("Photographers  updated successfully!");
    } catch (error) {
      console.error("Error updating  : ", error);
      toast.error("Error updating .");
    }
  };

  const handleDeletePhotographers = async (id) => {
    try {
      await deleteDoc(doc(db, "photographerServices", id));
      setPhotographers(photographers.filter((f) => f.id !== id));
      toast.success("Photographers Services deleted successfully!");
    } catch (error) {
      console.error("Error deleting photographersAndSecurity: ", error);
      toast.error("Error deleting photographersAndSecurity.");
    }
  };

  const startEditingPhotographers = (id, name) => {
    setIsEditingphotographers(true);
    setEditingIDphotographers(id);
    setphotographersFormData({ name });
  };

  return (
    <div className="p-4 bg-[url('/images/dashbg1.svg')] w-full h-full">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-4 mt-6  text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
        Photographers Services
        <hr className="w-[380px] h-[2px] bg-gradient-border border-0 font-thin space-x-6 mt-2" />

      </h1>
      <div
        className="bg-[#FFF4E8] p-4 rounded mt-10 border-gradient"
      
      >
        <form onSubmit={handleSubmitPhotographers} className="mb-4 mt-10">
          <input
            type="text"
            name="name"
            value={photographersFormData.name}
            onChange={handleChangePhotographers}
            className="p-2 border border-gray-300 rounded mr-2"
            placeholder="Additional Service Name"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white bg-pink rounded"
          >
            {isEditingphotographers ? "Update" : "Add"}
          </button>
        </form>
        {photographers.length > 0 ? (
          <div className="h-56 overflow-y-scroll">
            {photographers.map((data, index) => (
              <div
                key={index}
                className="mb-2 p-2 border border-gray-300 rounded flex justify-between items-center"
              >
                <div>
                  <p className="text-lg ">
                    <strong className="font-Merriweather text-[#9B1B52]">
                      Name:
                    </strong>{" "}
                    <span className="font-Merriweather font-light">
                      {data.name}
                    </span>
                  </p>
                </div>
                <div>
                  <button
                    onClick={() =>
                      startEditingPhotographers(data.id, data.name)
                    }
                    className="text-green-500 text-xl"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDeletePhotographers(data.id)}
                    className=" text-red-500 text-xl "
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Photographers keywords available</p>
        )}
      </div>
    </div>
  );
};

export default AmenitiesPage;
