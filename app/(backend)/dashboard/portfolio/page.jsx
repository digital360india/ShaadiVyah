"use client";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { db, storage } from "@/firebase/firebase";
import Image from "next/image";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaUserEdit } from "react-icons/fa";
import Space25px from "@/components/Space25px";
import Space50px from "@/components/Space50px";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { BsTwitterX } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

const Page = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [aadhaarImageUrl, setAadhaarImageUrl] = useState("");
  const [editing2, setEditing2] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    streetAddress: "",
    landmark: "",
    postCode: "",
    city: "",
    country: "",
    about: "",
    phoneNumber: "",
    alternateNumber: "",
    adharCardPhoto: "",
    adharCardNumber: "",
    panCardNumber: "",
    GSTIN: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });

  useEffect(() => {
    const cookies = parseCookies();
    const uid = cookies.token;

    const fetchUser = async () => {
      if (uid) {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUser(userData);
          setFormData(userData);
          setAadhaarImageUrl(userData.adharCardPhoto || "");
        }
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleEditSocials = () => {
    setEditing2(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAadhaarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `aadharcardphotos/${user.uid}/aadhaar.jpg`);
    const uploadTask = uploadBytes(storageRef, file);

    uploadTask
      .then(async () => {
        const downloadURL = await getDownloadURL(storageRef);
        setAadhaarImageUrl(downloadURL);
        setFormData((prev) => ({ ...prev, adharCardPhoto: downloadURL }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        const cookies = parseCookies();
        const uid = cookies.token;
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, formData);
        setUser(formData);
        setEditing(false);
        setEditing2(false);
        toast.success("Data saved successfully!");
      }
    } catch (error) {
      toast.error("Error saving data. Please try again.");
    }
  };

  return (
    <div className="m-10">
      <ToastContainer />
      <div className="flex flex-row w-full gap-10 items-start justify-start">
        {user && (
          <div className="mt-4">
            {editing ? (
              <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
                <div className="col-span-2 text-xl font-medium">
                  YOUR VENUE DETAILS
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream  border-2"
                />
                <Space50px />
                <Space25px />
                <div className="col-span-2 text-xl font-medium">
                  YOUR VENUE ADDRESS
                </div>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="Street Address*"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="Landmark (Optional)"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />
                <input
                  type="text"
                  name="postCode"
                  value={formData.postCode}
                  onChange={handleChange}
                  placeholder="Post Code*"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City*"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country*"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />
                <Space50px />
                <Space25px />
                <div className="col-span-2 text-xl font-medium">ABOUT</div>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="About"
                  className="w-full h-28 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />
                <Space50px />
                <Space25px />

                <div className="col-span-2 text-xl font-medium">
                  CONTACT DETAILS
                </div>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number*"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />
                <input
                  type="text"
                  name="alternateNumber"
                  value={formData.alternateNumber}
                  onChange={handleChange}
                  placeholder="Alternate Number (Optional)"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />
                <Space50px />
                <div className="col-span-2 text-xl font-medium">
                  VERIFICATION DETAILS
                </div>
                <input
                  type="text"
                  name="adharCardNumber"
                  value={formData.adharCardNumber}
                  onChange={handleChange}
                  placeholder="Adhar Card Number*"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />
                <div className="col-span-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-4"
                    htmlFor="aadhaarPhoto"
                  >
                    Aadhaar Card Photo
                  </label>
                  <input
                    type="file"
                    name="aadhaarPhoto"
                    onChange={handleAadhaarUpload}
                    className="w-full h-10 p-2 rounded-md placeholder:text-gray-600 mb-4"
                  />
                  {aadhaarImageUrl && (
                    <div className="mt-2">
                      <Image
                        src={aadhaarImageUrl}
                        alt="Aadhaar Card"
                        width={200}
                        height={200}
                      />
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  name="panCardNumber"
                  value={formData.panCardNumber}
                  onChange={handleChange}
                  placeholder="Pan Card Number (optional)"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />
                <input
                  type="text"
                  name="GSTIN"
                  value={formData.GSTIN}
                  onChange={handleChange}
                  placeholder="GSTIN (Optional)"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />
                <button
                  type="submit"
                  className="col-span-2 w-full bg-gradient-to-r  from-[#FF1053] to-[#F7ACCF] h-10 bg-pink-500  rounded-lg text-white  border-cream  border-2"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-md  text-lg space-x-2 space-y-3 font- mb-2">
                <div className="flex flex-row justify-between ">
                  {" "}
                  <div className="font-bold text-xl">My Details</div>{" "}
                  <button onClick={handleEdit} className="">
                    <FaUserEdit />
                  </button>
                </div>
                <p className="">
                  Name: <span className="font-normal">{user.name}</span>
                </p>
                <p className="">
                  Street Address:{" "}
                  <span className="font-normal">{user.streetAddress}</span>
                </p>
                <p className="">
                  Landmark: <span className="font-normal">{user.landmark}</span>
                </p>
                <p className="">
                  Post Code:{" "}
                  <span className="font-normal">{user.postCode}</span>
                </p>
                <p className="">
                  City: <span className="font-normal">{user.city}</span>
                </p>
                <p className="">
                  Country: <span className="font-normal">{user.country}</span>
                </p>
                <p className="">
                  About: <span className="font-normal">{user.about}</span>
                </p>
                <p className="">
                  Phone Number:{" "}
                  <span className="font-normal">{user.phone}</span>
                </p>
                <p className="">
                  Alternate Number:{" "}
                  <span className="font-normal">{user.alternateNumber}</span>
                </p>
                <p className="">
                  Aadhaar Card Number:{" "}
                  <span className="font-normal">{user.adharCardNumber}</span>
                </p>
                {user.adharCardPhoto && (
                  <div className="flex flex-col">
                    <p className="">Aadhar Card Photo</p>
                    <div className="mt-2">
                      <img
                        src={user.adharCardPhoto}
                        alt="Aadhaar Card"
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                )}
                <p className="">
                  Pan Card Number:{" "}
                  <span className="font-normal">{user.panCardNumber}</span>
                </p>
                <p className="">
                  GSTIN: <span className="font-normal">{user.GSTIN}</span>
                </p>
              </div>
            )}
          </div>
        )}
        {user && (
          <div className="mt-4">
            {editing2 ? (
              <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
                <div className="col-span-2 text-xl font-medium">
                  YOUR SOCIAL LINKS
                </div>
                <input
                  type="text"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="Facebook"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />{" "}
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="Instagram"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="twitter"
                  className="w-full h-10 p-4 rounded-md placeholder:text-gray-600  border-cream  border-2"
                />
                <button
                  type="submit"
                  className="col-span-2 w-full bg-gradient-to-r  from-[#FF1053] to-[#F7ACCF] h-10 bg-pink-500  rounded-lg text-white  border-cream  border-2"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-md  text-lg space-x-2 space-y-3 font- mb-2">
                <div className="flex flex-row justify-between gap-5 ">
                  {" "}
                  <div className="font-bold text-xl">My Social Links </div>{" "}
                  <button onClick={handleEditSocials} className="">
                  <MdEdit />

                  </button>
                </div>
                <p className="flex items-center justify-start gap-2 ">
                  <CiFacebook /> :<span className="">{user.facebook}</span>
                </p>
                <p className="flex items-center justify-start gap-2 ">
                  <CiInstagram /> :<span className="">{user.instagram}</span>
                </p>
                <p className="flex items-center justify-start gap-2 ">
                  <BsTwitterX /> :<span className="">{user.twitter}</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
