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
  const [amenities, setAmenities] = useState([]);
  const [formData, setFormData] = useState({ amenityName: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingID, setEditingID] = useState(null);

  const [spacesTypes, setSpacesTypes] = useState([]);
  const [spacesFormData, setSpacesFormData] = useState({ name: "" });
  const [isEditingSpaces, setIsEditingSpaces] = useState(false);
  const [editingIDSpaces, setEditingIDSpaces] = useState(null);

  const [facilities, setfacilities] = useState([]);
  const [formDatafacilities, setFormDatafacilities] = useState({ name: "" });
  const [isEditingfacilities, setIsEditingfacilities] = useState(false);
  const [editingIDfacilities, setEditingIDfacilities] = useState(null);

  const [additionalServices, setAdditionalServices] = useState([]);
  const [formDataAdditionalServices, setFormDataAdditionalServices] = useState({
    name: "",
  });
  const [isEditingAdditionalServices, setIsEditingAdditionalServices] =
    useState(false);
  const [editingIDAdditionalServices, setEditingIDAdditionalServices] =
    useState(null);

  const [saftey, setSaftey] = useState([]);
  const [safteyFormData, setsafteyFormData] = useState({ name: "" });
  const [isEditingsaftey, setIsEditingsaftey] = useState(false);
  const [editingIDsaftey, setEditingIDsaftey] = useState(null);

  const [accessibility, setAccessibility] = useState([]);
  const [accessibilityFormData, setAccessibilityFormData] = useState({
    name: "",
  });
  const [isEditingAccessibility, setIsEditingsAccessibility] = useState(false);
  const [editingIDAccessibility, setEditingIDAccessibility] = useState(null);

  const [attractions, setAttractions] = useState([]);
  const [attractionsFormData, setattractionsFormData] = useState({ name: "" });
  const [isEditingattractions, setIsEditingattractions] = useState(false);
  const [editingIDattractions, setEditingIDattractions] = useState(null);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "hotelamenities"));
        const amenitiesList = querySnapshot.docs.map((doc) => ({
          amenityName: doc.data().amenityName,
          amenityUID: doc.id,
        }));
        setAmenities(amenitiesList);
      } catch (error) {
        console.error("Error fetching amenities: ", error);
      }
    };
    const fetchfacilites = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "hotelfacilities"));
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setfacilities(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const fetchSpaces = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "spacesTypes"));
        const spacesList = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setSpacesTypes(spacesList);
      } catch (error) {
        console.error("Error fetching spaces: ", error);
      }
    };
    const fetchAdditionalServices = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "additionalServices")
        );
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setAdditionalServices(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const fetchSaftey = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "safteyAndSecurity")
        );
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setSaftey(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const fetchAttractions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "attractions"));
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setAttractions(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const fetchAccessibility = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "accessibility"));
        const data = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
        setAccessibility(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchAmenities();
    fetchAttractions();
    fetchSpaces();
    fetchfacilites();
    fetchAdditionalServices();
    fetchSaftey();
    fetchAccessibility();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChangeSpaces = (e) => {
    const { name, value } = e.target;
    setSpacesFormData({ ...spacesFormData, [name]: value });
  };
  const handleChangeFacilities = (e) => {
    const { name, value } = e.target;
    setFormDatafacilities({ ...formData, [name]: value });
  };
  const handleChangeAdditionalServices = (e) => {
    const { name, value } = e.target;
    setFormDataAdditionalServices({ ...formData, [name]: value });
  };
  const handleChangeSaftey = (e) => {
    const { name, value } = e.target;
    setsafteyFormData({ ...spacesFormData, [name]: value });
  };
  const handleChangeAccessibility = (e) => {
    const { name, value } = e.target;
    setAccessibilityFormData({ ...spacesFormData, [name]: value });
  };
  const handleChangeAttractions = (e) => {
    const { name, value } = e.target;
    setattractionsFormData({ ...spacesFormData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await handleEditAmenity(editingID, formData.amenityName);
    } else {
      await handleAddAmenity(formData.amenityName);
    }
    setFormData({ amenityName: "" });
    setIsEditing(false);
    setEditingID(null);
  };
  const handleSubmitfacilities = async (e) => {
    e.preventDefault();
    if (isEditingfacilities) {
      await handleEditFacility(editingIDfacilities, formDatafacilities.name);
    } else {
      await handleAddFacility(formDatafacilities.name);
    }
    setFormDatafacilities({ name: "" });
    setIsEditingfacilities(false);
    setEditingIDfacilities(null);
  };
  const handleSubmitSpaces = async (e) => {
    e.preventDefault();
    if (isEditingSpaces) {
      await handleEditSpace(editingIDSpaces, spacesFormData.name);
    } else {
      await handleAddSpace(spacesFormData.name);
    }
    setSpacesFormData({ name: "" });
    setIsEditingSpaces(false);
    setEditingIDSpaces(null);
  };
  const handleSubmitAdditionalServices = async (e) => {
    e.preventDefault();
    if (isEditingAdditionalServices) {
      await handleEditAdditionalServices(
        editingIDAdditionalServices,
        formDataAdditionalServices.name
      );
    } else {
      await handleAdditionalServices(formDataAdditionalServices.name);
    }
    setFormDataAdditionalServices({ name: "" });
    setIsEditingAdditionalServices(false);
    setEditingIDAdditionalServices(null);
  };
  const handleSubmitSaftey = async (e) => {
    e.preventDefault();
    if (isEditingsaftey) {
      await handleEditSaftey(editingIDsaftey, safteyFormData.name);
    } else {
      await handleAddSaftey(safteyFormData.name);
    }
    setsafteyFormData({ name: "" });
    setIsEditingsaftey(false);
    setEditingIDsaftey(null);
  };
  const handleSubmitAccessibility = async (e) => {
    e.preventDefault();
    if (isEditingAccessibility) {
      await handleEditAccessibility(
        editingIDAccessibility,
        accessibilityFormData.name
      );
    } else {
      await handleAddAccessibility(accessibilityFormData.name);
    }
    setAccessibilityFormData({ name: "" });
    setIsEditingsAccessibility(false);
    setEditingIDAccessibility(null);
  };
  const handleSubmitAttractions = async (e) => {
    e.preventDefault();
    if (isEditingattractions) {
      await handleEditAttractions(
        editingIDattractions,
        attractionsFormData.name
      );
    } else {
      await handleAddAttractions(attractionsFormData.name);
    }
    setattractionsFormData({ name: "" });
    setIsEditingattractions(false);
    setEditingIDattractions(null);
  };
  const handleAddFacility = async (name) => {
    try {
      const docRef = await addDoc(collection(db, "hotelfacilities"), {
        name,
      });
      await updateDoc(docRef, { id: docRef.id });

      setAmenities([...facilities, { name, id: docRef.id }]);
      toast.success("Facility added successfully!");
    } catch (error) {
      console.error("Error adding Facility: ", error);
      toast.error("Error adding Facility.");
    }
  };
  const handleAddAmenity = async (amenityName) => {
    try {
      const docRef = await addDoc(collection(db, "hotelamenities"), {
        amenityName,
      });
      await updateDoc(docRef, { id: docRef.id });
      setAmenities([...amenities, { amenityName, amenityUID: docRef.id }]);
      toast.success("Amenity added successfully!");
    } catch (error) {
      console.error("Error adding amenity: ", error);
      toast.error("Error adding amenity.");
    }
  };
  const handleAddSpace = async (name) => {
    try {
      const docRef = await addDoc(collection(db, "spacesTypes"), { name });
      await updateDoc(docRef, { id: docRef.id });

      setSpacesTypes([...spacesTypes, { name, id: docRef.id }]);
      toast.success("Space type added successfully!");
    } catch (error) {
      console.error("Error adding space type: ", error);
      toast.error("Error adding space type.");
    }
  };
  const handleAddSaftey = async (name) => {
    try {
      const docRef = await addDoc(collection(db, "safteyAndSecurity"), {
        name,
      });
      await updateDoc(docRef, { id: docRef.id });

      setSaftey([...saftey, { name, id: docRef.id }]);
      toast.success("Added successfully!");
    } catch (error) {
      console.error("Error adding ", error);
      toast.error("Error adding ");
    }
  };
  const handleAddAccessibility = async (name) => {
    try {
      const docRef = await addDoc(collection(db, "accessibility"), { name });
      await updateDoc(docRef, { id: docRef.id });

      setAccessibility([...accessibility, { name, id: docRef.id }]);
      toast.success("Added successfully!");
    } catch (error) {
      console.error("Error adding ", error);
      toast.error("Error adding ");
    }
  };
  const handleAdditionalServices = async (name) => {
    try {
      const docRef = await addDoc(collection(db, "additionalServices"), {
        name,
      });
      await updateDoc(docRef, { id: docRef.id });
      setAdditionalServices([...additionalServices, { name, id: docRef.id }]);
      toast.success("Additional Services added successfully!");
    } catch (error) {
      console.error("Error : ", error);
      toast.error("Error .");
    }
  };
  const handleEditFacility = async (id, name) => {
    try {
      const facilityRef = doc(db, "hotelfacilities", id);
      await updateDoc(facilityRef, { name });

      setfacilities(
        facilities.map((facility) =>
          facility.id === id ? { name, id } : facility
        )
      );
      toast.success("Facility updated successfully!");
    } catch (error) {
      console.error("Error updating Facility: ", error);
      toast.error("Error updating Facility.");
    }
  };

  const handleAddAttractions = async (name) => {
    console.log(name);
    try {
      const docRef = await addDoc(collection(db, "attractions"), {
        name,
      });
      console.log(name);
      await updateDoc(docRef, { id: docRef.id });

      setAdditionalServices([...additionalServices, { name, id: docRef.id }]);
      toast.success("Additional Services added successfully!");
    } catch (error) {
      console.error("Error : ", error);
      toast.error("Error .");
    }
  };
  const handleEditAdditionalServices = async (id, name) => {
    try {
      const docRef = doc(db, "additionalServices", id);
      await updateDoc(docRef, { name });

      setAdditionalServices(
        additionalServices.map((service) =>
          service.id === id ? { name, id } : service
        )
      );
      toast.success("Additional Service updated successfully!");
    } catch (error) {
      console.error("Error updating AdditionalService ", error);
      toast.error("Error updating AdditionalService");
    }
  };
  const handleEditAmenity = async (id, amenityName) => {
    try {
      const amenityRef = doc(db, "hotelamenities", id);
      await updateDoc(amenityRef, { amenityName });
      setAmenities(
        amenities.map((amenity) =>
          amenity.amenityUID === id ? { amenityName, amenityUID: id } : amenity
        )
      );
      toast.success("Amenity updated successfully!");
    } catch (error) {
      console.error("Error updating amenity: ", error);
      toast.error("Error updating amenity.");
    }
  };
  const handleEditSpace = async (id, name) => {
    try {
      const spaceRef = doc(db, "spacesTypes", id);
      await updateDoc(spaceRef, { name });
      setSpacesTypes(
        spacesTypes.map((space) => (space.id === id ? { name, id } : space))
      );
      toast.success("Space type updated successfully!");
    } catch (error) {
      console.error("Error updating space type: ", error);
      toast.error("Error updating space type.");
    }
  };
  const handleEditAccessibility = async (id, name) => {
    try {
      const spaceRef = doc(db, "accessibility", id);
      await updateDoc(spaceRef, { name });
      setAccessibility(
        accessibility.map((data) => (data.id === id ? { name, id } : data))
      );
      toast.success("Accessibility type updated successfully!");
    } catch (error) {
      console.error("Error updating accessibility type: ", error);
      toast.error("Error updating accessibility type.");
    }
  };
  const handleEditSaftey = async (id, name) => {
    try {
      const spaceRef = doc(db, "safteyAndSecurity", id);
      await updateDoc(spaceRef, { name });
      setSaftey(saftey.map((data) => (data.id === id ? { name, id } : data)));
      toast.success("Saftey and Security updated successfully!");
    } catch (error) {
      console.error("Error updating  : ", error);
      toast.error("Error updating .");
    }
  };
  const handleEditAttractions = async (id, name) => {
    try {
      const spaceRef = doc(db, "attractions", id);
      await updateDoc(spaceRef, { name });
      setAttractions(
        attractions.map((data) => (data.id === id ? { name, id } : data))
      );
      toast.success("attractions updated successfully!");
    } catch (error) {
      console.error("Error updating  : ", error);
      toast.error("Error updating .");
    }
  };

  const handleDeleteAmenity = async (id) => {
    try {
      await deleteDoc(doc(db, "hotelamenities", id));
      setAmenities(amenities.filter((amenity) => amenity.amenityUID !== id));
      toast.success("Amenity deleted successfully!");
    } catch (error) {
      console.error("Error deleting amenity: ", error);
      toast.error("Error deleting amenity.");
    }
  };
  const handleDeleteFacility = async (id) => {
    try {
      await deleteDoc(doc(db, "hotelfacilites", id));
      setfacilities(facilities.filter((f) => f.id !== id));
      toast.success("facility deleted successfully!");
    } catch (error) {
      console.error("Error deleting facility: ", error);
      toast.error("Error deleting facility.");
    }
  };
  const handleDeleteSaftey = async (id) => {
    try {
      await deleteDoc(doc(db, "safteyAndSecurity", id));
      setSaftey(saftey.filter((f) => f.id !== id));
      toast.success("safteyAndSecurity deleted successfully!");
    } catch (error) {
      console.error("Error deleting safteyAndSecurity: ", error);
      toast.error("Error deleting safteyAndSecurity.");
    }
  };
  const handleDeleteAccessibility = async (id) => {
    try {
      await deleteDoc(doc(db, "accessibility", id));
      setSaftey(saftey.filter((f) => f.id !== id));
      toast.success("accessibility deleted successfully!");
    } catch (error) {
      console.error("Error deleting accessibility: ", error);
      toast.error("Error deleting accessibility.");
    }
  };
  const handleDeleteAdditionalServices = async (id) => {
    try {
      await deleteDoc(doc(db, "additionalServices", id));
      setAdditionalServices(additionalServices.filter((f) => f.id !== id));
      toast.success("additionalServices deleted successfully!");
    } catch (error) {
      console.error("Error deleting additionalServices: ", error);
      toast.error("Error deleting additionalServices.");
    }
  };
  const handleDeleteSpace = async (id) => {
    try {
      await deleteDoc(doc(db, "spacesTypes", id));
      setSpacesTypes(spacesTypes.filter((space) => space.id !== id));
      toast.success("Space type deleted successfully!");
    } catch (error) {
      console.error("Error deleting space type: ", error);
      toast.error("Error deleting space type.");
    }
  };
  const handleDeleteAttractions = async (id) => {
    try {
      await deleteDoc(doc(db, "attractions", id));
      setAttractions(attractions.filter((space) => space.id !== id));
      toast.success("Attractions type deleted successfully!");
    } catch (error) {
      console.error("Error deleting Attractions type: ", error);
      toast.error("Error deleting Attractions type.");
    }
  };
  const startEditing = (id, name) => {
    setIsEditing(true);
    setEditingID(id);
    setFormData({ amenityName: name });
  };
  const startEditingFacilities = (id, name) => {
    setIsEditingfacilities(true);
    setEditingIDfacilities(id);
    setFormDatafacilities({ name });
  };
  const startEditingSpaces = (id, name) => {
    setIsEditingSpaces(true);
    setEditingIDSpaces(id);
    setSpacesFormData({ name });
  };
  const startEditingAdditionalServices = (id, name) => {
    setIsEditingAdditionalServices(true);
    setEditingIDAdditionalServices(id);
    setFormDataAdditionalServices({ name });
  };
  const startEditingSaftey = (id, name) => {
    setIsEditingsaftey(true);
    setEditingIDsaftey(id);
    setsafteyFormData({ name });
  };
  const startEditingAccessibilty = (id, name) => {
    setIsEditingsAccessibility(true);
    setEditingIDAccessibility(id);
    setAccessibilityFormData({ name });
  };
  const startEditingAttractions = (id, name) => {
    setIsEditingattractions(true);
    setEditingIDattractions(id);
    setattractionsFormData({ name });
  };
  return (
    <div className="p-4 bg-[url('/images/dashbg1.svg')] w-full h-full">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather   ">
        Amenities
        <hr className="w-[170px] h-[2px] bg-gradient-border border-0 font-thin space-x-6 mt-2" />
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mb-4 mt-5 backdrop-blur-sm z-10 bg-[#FFF4E8]"
      >
        <input
          type="text"
          name="amenityName"
          value={formData.amenityName}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded mr-2"
          placeholder="Amenity Name"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white bg-pink rounded"
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </form>
      {amenities.length > 0 ? (
        <div className="h-56 overflow-y-scroll bg-[#FFF4E8]">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="mb-2 p-2 border border-gray-300 rounded flex justify-between items-center"
            >
              <div>
                <p className="text-lg">
                  <strong>Name:</strong> {amenity.amenityName}
                </p>
              </div>
              <div>
                <button
                  onClick={() =>
                    startEditing(amenity.amenityUID, amenity.amenityName)
                  }
                  className="text-green-500 text-xl"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDeleteAmenity(amenity.amenityUID)}
                  className=" text-red-500 text-xl "
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No amenities available</p>
      )}

      <h1 className="text-2xl font-bold mb-4 mt-8 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather ">
        Space Types
      </h1>
      <form onSubmit={handleSubmitSpaces} className="mb-4 bg-[#FFF4E8]">
        <input
          type="text"
          name="name"
          value={spacesFormData.name}
          onChange={handleChangeSpaces}
          className="p-2 border border-gray-300 rounded mr-2"
          placeholder="Space Type Name"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white bg-pink rounded"
        >
          {isEditingSpaces ? "Update" : "Add"}
        </button>
      </form>
      {spacesTypes.length > 0 ? (
        <div className="h-56 overflow-y-scroll bg-[#FFF4E8]">
          {spacesTypes.map((space, index) => (
            <div
              key={index}
              className="mb-2 p-2 border border-gray-300 rounded flex justify-between items-center"
            >
              <div>
                <p className="text-lg">
                  <strong>Name:</strong> {space.name}
                </p>
              </div>
              <div>
                <button
                  onClick={() => startEditingSpaces(space.id, space.name)}
                  className="text-green-500 text-xl"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDeleteSpace(space.id)}
                  className=" text-red-500 text-xl "
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No space types available</p>
      )}

      <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather ">
        Facilities
      </h1>
      <form onSubmit={handleSubmitfacilities} className="mb-4 bg-[#FFF4E8]">
        <input
          type="text"
          name="name"
          value={formDatafacilities.name}
          onChange={handleChangeFacilities}
          className="p-2 border border-gray-300 rounded mr-2"
          placeholder="Facility Name"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white bg-pink rounded"
        >
          {isEditingfacilities ? "Update" : "Add"}
        </button>
      </form>
      {facilities.length > 0 ? (
        <div className="h-56 overflow-y-scroll bg-[#FFF4E8]">
          {facilities.map((data, index) => (
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
                  onClick={() => startEditingFacilities(data.id, data.name)}
                  className="text-green-500 text-xl"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDeleteFacility(data.id)}
                  className=" text-red-500 text-xl "
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Facility available</p>
      )}

      <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather ">
        Additional Services
      </h1>
      <form
        onSubmit={handleSubmitAdditionalServices}
        className="mb-4 bg-[#FFF4E8]"
      >
        <input
          type="text"
          name="name"
          value={formDataAdditionalServices.name}
          onChange={handleChangeAdditionalServices}
          className="p-2 border border-gray-300 rounded mr-2"
          placeholder="Additional Service Name"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white bg-pink rounded"
        >
          {isEditingAdditionalServices ? "Update" : "Add"}
        </button>
      </form>
      {additionalServices.length > 0 ? (
        <div className="h-56 overflow-y-scroll bg-[#FFF4E8]">
          {additionalServices.map((data, index) => (
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
                  onClick={() =>
                    startEditingAdditionalServices(data.id, data.name)
                  }
                  className="text-green-500 text-xl"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDeleteAdditionalServices(data.id)}
                  className=" text-red-500 text-xl "
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No AdditionalServices available</p>
      )}

      <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather ">
        Saftey and Security Services
      </h1>
      <form onSubmit={handleSubmitSaftey} className="mb-4 bg-[#FFF4E8]">
        <input
          type="text"
          name="name"
          value={safteyFormData.name}
          onChange={handleChangeSaftey}
          className="p-2 border border-gray-300 rounded mr-2"
          placeholder="Additional Service Name"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white bg-pink rounded"
        >
          {isEditingsaftey ? "Update" : "Add"}
        </button>
      </form>
      {saftey.length > 0 ? (
        <div className="h-56 overflow-y-scroll bg-[#FFF4E8]">
          {saftey.map((data, index) => (
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
                  onClick={() => startEditingSaftey(data.id, data.name)}
                  className="text-green-500 text-xl"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDeleteSaftey(data.id)}
                  className=" text-red-500 text-xl "
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Safety and Security keywords available</p>
      )}

      <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather ">
        Accessibility
      </h1>
      <form onSubmit={handleSubmitAccessibility} className="mb-4 bg-[#FFF4E8]">
        <input
          type="text"
          name="name"
          value={accessibilityFormData.name}
          onChange={handleChangeAccessibility}
          className="p-2 border border-gray-300 rounded mr-2"
          placeholder="Additional Service Name"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white bg-pink rounded"
        >
          {isEditingsaftey ? "Update" : "Add"}
        </button>
      </form>
      {accessibility.length > 0 ? (
        <div className="h-56 overflow-y-scroll bg-[#FFF4E8]">
          {accessibility.map((data, index) => (
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
                  onClick={() => startEditingAccessibilty(data.id, data.name)}
                  className="text-green-500 text-xl"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDeleteAccessibility(data.id)}
                  className=" text-red-500 text-xl "
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Accessibility available</p>
      )}

      <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather ">
        Near by Attractions
      </h1>
      <form onSubmit={handleSubmitAttractions} className="mb-4 bg-[#FFF4E8]">
        <input
          type="text"
          name="name"
          value={attractionsFormData.name}
          onChange={handleChangeAttractions}
          className="p-2 border border-gray-300 rounded mr-2"
          placeholder="Service Name"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white bg-pink rounded"
        >
          {isEditingattractions ? "Update" : "Add"}
        </button>
      </form>
      {attractions.length > 0 ? (
        <div className="h-56 overflow-y-scroll bg-[#FFF4E8]">
          {attractions.map((data, index) => (
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
                  onClick={() => startEditingAttractions(data.id, data.name)}
                  className="text-green-500 text-xl"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDeleteAttractions(data.id)}
                  className=" text-red-500 text-xl "
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Attractions available</p>
      )}
    </div>
  );
};

export default AmenitiesPage;
