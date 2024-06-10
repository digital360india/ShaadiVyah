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
  const [mendi, setMendi] = useState([]);
  const [mendiFormData, setmendiFormData] = useState({ name: "" });
  const [isEditingmendi, setIsEditingmendi] = useState(false);
  const [editingIDmendi, setEditingIDmendi] = useState(null);

  useEffect(() => {
    const fetchMendi = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "mendiServices"));
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setMendi(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchMendi();
  }, []);

  const handleChangeMendi = (e) => {
    const { name, value } = e.target;
    setmendiFormData({ ...spacesFormData, [name]: value });
  };

  const handleSubmitMendi = async (e) => {
    e.preventDefault();
    if (isEditingmendi) {
      await handleEditMendi(editingIDmendi, mendiFormData.name);
    } else {
      await handleAddMendi(mendiFormData.name);
    }
    setmendiFormData({ name: "" });
    setIsEditingmendi(false);
    setEditingIDmendi(null);
  };

  const handleAddMendi = async (name) => {
    try {
      const docRef = await addDoc(collection(db, "mendiServices"), { name });
      setMendi([...mendi, { name, id: docRef.id }]);
      toast.success("Added successfully!");
    } catch (error) {
      console.error("Error adding ", error);
      toast.error("Error adding ");
    }
  };

  const handleEditMendi = async (id, name) => {
    try {
      const spaceRef = doc(db, "mendiServices", id);
      await updateDoc(spaceRef, { name });
      setMendi(mendi.map((data) => (data.id === id ? { name, id } : data)));
      toast.success("Mendi  updated successfully!");
    } catch (error) {
      console.error("Error updating  : ", error);
      toast.error("Error updating .");
    }
  };

  const handleDeleteMendi = async (id) => {
    try {
      await deleteDoc(doc(db, "mendiAndSecurity", id));
      setMendi(mendi.filter((f) => f.id !== id));
      toast.success("Mendi Services deleted successfully!");
    } catch (error) {
      console.error("Error deleting mendiAndSecurity: ", error);
      toast.error("Error deleting mendiAndSecurity.");
    }
  };

  const startEditingMendi = (id, name) => {
    setIsEditingmendi(true);
    setEditingIDmendi(id);
    setmendiFormData({ name });
  };

  return (
    <div className="p-4">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-4 backdrop-blur-sm fixed">
        Mendi Services
      </h1>
      <form onSubmit={handleSubmitMendi} className="mb-4 mt-20">
        <input
          type="text"
          name="name"
          value={mendiFormData.name}
          onChange={handleChangeMendi}
          className="p-2 border border-gray-300 rounded mr-2"
          placeholder="Additional Service Name"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white bg-pink rounded"
        >
          {isEditingmendi ? "Update" : "Add"}
        </button>
      </form>
      {mendi.length > 0 ? (
        <div className="h-56 overflow-y-scroll">
          {mendi.map((data, index) => (
            <div
              key={index}
              className="mb-2 p-2 border border-gray-300 rounded flex justify-between items-center"
            >
              <div>
                <p className="text-lg">
                  <strong>Name:</strong> {data.name}
                </p>
              </div>
              <div>
                <button
                  onClick={() => startEditingMendi(data.id, data.name)}
                  className="text-green-500 text-xl"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDeleteMendi(data.id)}
                  className=" text-red-500 text-xl "
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Mendi keywords available</p>
      )}
    </div>
  );
};

export default AmenitiesPage;
