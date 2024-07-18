"use client";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { db, storage } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { FaUserEdit } from "react-icons/fa";
import Space25px from "@/components/Space25px";
import Space50px from "@/components/Space50px";
import { CiFacebook, CiInstagram } from "react-icons/ci";
import { BsTwitterX } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

const PortfolioPage = () => {
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
    phone: "",
    alternateNumber: "",
    adharCardPhoto: "",
    adharCardNumber: "",
    panCardNumber: "",
    GSTIN: "",
    instagram: "",
    facebook: "",
    twitter: "",
    businessName: "",
    googleLocation: "",
  });
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [hasSentRequest, setHasSentRequest] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionTimestamp, setRejectionTimestamp] = useState(null);

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
          checkButtonActivity(userData);
          checkApprovalRequest(uid);
        }
      }
    };

    fetchUser();
  }, []);

  const checkButtonActivity = (userData) => {
    const requiredFields = ["adharCardPhoto", "adharCardNumber"];
    const isFilled = requiredFields.every((field) => userData[field]);
    setIsButtonActive(isFilled);
  };

  const checkApprovalRequest = async (uid) => {
    try {
      const docRef = doc(db, "approvalrequests", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHasSentRequest(true);
      }
    } catch (error) {
      console.error("Error checking approval request: ", error);
    }
  };

  const handleSendApproval = async () => {
    try {
      const cookies = parseCookies();
      const uid = cookies.token;

      if (!uid) {
        toast.error("User ID not found.");
        return;
      }

      const approvalRequestRef = doc(db, "approvalrequests", uid);
      await setDoc(approvalRequestRef, { uid });

      toast.success("Profile approval request sent successfully!");
      setHasSentRequest(true);
    } catch (error) {
      console.error("Error sending approval request: ", error);
      toast.error("Error sending approval request. Please try again.");
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleEditSocials = () => {
    setEditing2(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    checkButtonActivity({ ...formData, [name]: value });
  };

  const handleAadhaarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const storageRef = ref(
        storage,
        `aadharcardphotos/${user.uid}/aadhaar.jpg`
      );
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setAadhaarImageUrl(downloadURL);
      setFormData((prev) => ({ ...prev, adharCardPhoto: downloadURL }));
      checkButtonActivity({ ...formData, adharCardPhoto: downloadURL });
    } catch (error) {
      console.error(error);
      toast.error("Error uploading Aadhaar image.");
    }
  };

  const handleDeleteAadhaarImage = async () => {
    try {
      const storageRef = ref(
        storage,
        `aadharcardphotos/${user.uid}/aadhaar.jpg`
      );
      await deleteObject(storageRef);
      setAadhaarImageUrl("");
      setFormData((prev) => ({ ...prev, adharCardPhoto: "" }));
      checkButtonActivity({ ...formData, adharCardPhoto: "" });
    } catch (error) {
      console.error("Error deleting Aadhaar image: ", error);
      toast.error("Error deleting Aadhaar image.");
    }
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

  const handleShowRejectionDialog = () => {
    if (user.rejectionReason) {
      setRejectionReason(user.rejectionReason);
      setRejectionTimestamp(user.rejectionTimestamp);
      setShowRejectionDialog(true);
    }
  };

  const handleCloseRejectionDialog = () => {
    setShowRejectionDialog(false);
    setRejectionReason("");
    setRejectionTimestamp(null);
  };

  return (
    <>
      <div className="md:m-10 m-4 ">
        <ToastContainer />
        <div className="flex flex-col md:flex-row gap-10 items-start justify-start">
          {user && (
            <div className="mt-4 w-full">
              {editing ? (
                <>
                  {" "}
                  <form
                    onSubmit={handleSave}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="col-span-2 text-xl font-medium">
                      YOUR VENUE DETAILS
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Owner"
                      className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                    />
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Your business name*"
                      className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
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
                      className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                    />
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      placeholder="Landmark (Optional)"
                      className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                    />
                    <input
                      type="text"
                      name="postCode"
                      value={formData.postCode}
                      onChange={handleChange}
                      placeholder="Post Code*"
                      className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                    />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City*"
                      className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                    />
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country*"
                      className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                    />
                    <input
                      type="text"
                      name="googleLocation"
                      value={formData.googleLocation}
                      onChange={handleChange}
                      placeholder="Google Location*"
                      className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                    />
                    <Space50px />
                    <Space25px />
                    <div className="col-span-2 text-xl font-medium">ABOUT</div>
                    <textarea
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      placeholder="About"
                      className="w-full h-28 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                    />
                    <Space50px />
                    <Space25px />
                    <div className="col-span-2 text-xl font-medium">
                      CONTACT DETAILS
                    </div>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number*"
                      className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                    />
                    <input
                      type="text"
                      name="alternateNumber"
                      value={formData.alternateNumber}
                      onChange={handleChange}
                      placeholder="Alternate Number (Optional)"
                      className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
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
                      placeholder="Aadhaar Card Number*"
                      className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
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
                          <img
                            src={aadhaarImageUrl}
                            alt="Aadhaar Card"
                            width={200}
                            height={200}
                          />
                          <button
                            type="button"
                            className="mt-2 text-red-600"
                            onClick={handleDeleteAadhaarImage}
                          >
                            Delete Image
                          </button>
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      name="panCardNumber"
                      value={formData.panCardNumber}
                      onChange={handleChange}
                      placeholder="Pan Card Number (optional)"
                      className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                    />
                    <input
                      type="text"
                      name="GSTIN"
                      value={formData.GSTIN}
                      onChange={handleChange}
                      placeholder="GSTIN (Optional)"
                      className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                    />
                    <button
                      type="submit"
                      className="col-span-2 w-full bg-gradient-to-r from-[#FF1053] to-[#F7ACCF] h-10 bg-pink-500 rounded-lg text-white border-cream border-2"
                    >
                      Save
                    </button>
                  </form>
                </>
              ) : (
                <div className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-md text-lg space-x-2 space-y-3 font- mb-2">
                  <div className="flex flex-row justify-between">
                    <div className="font-bold text-xl">My Details</div>
                    <button onClick={handleEdit} className="">
                      <FaUserEdit />
                    </button>
                  </div>
                  <p>
                  <span className="font-semibold text-gray-700">    Name:</span>  <span className="font-normal">{user.name}</span>
                  </p>
                  <p>
                  <span className="font-semibold text-gray-700">  Business Name:{" "}</span> 
                    <span className="font-normal">{user.businessName}</span>
                  </p>
                  <p>
                  <span className="font-semibold text-gray-700">  Street Address:{" "}</span> 
                    <span className="font-normal">{user.streetAddress}</span>
                  </p>
                  <p>
                  <span className="font-semibold text-gray-700">     Landmark:{" "}</span> 
                    <span className="font-normal">{user.landmark}</span>
                  </p>
                  <p>
                  <span className="font-semibold text-gray-700">     Post Code:{" "}</span> 
                    <span className="font-normal">{user.postCode}</span>
                  </p>
                  <p>
                  <span className="font-semibold text-gray-700">   City:</span>  <span className="font-normal">{user.city}</span>
                  </p>
                  <p>
                  <span className="font-semibold text-gray-700">  Country:</span>  <span className="font-normal">{user.country}</span>
                  </p>
                  <p>
                  <span className="font-semibold text-gray-700">About:</span> <span className="font-normal text-gray-600">{user.about}</span>
                  </p>
                  <p>
                  <span className="font-semibold text-gray-700">   Phone Number:{" "}</span> 
                    <span className="font-normal">{user.phone}</span>
                  </p>
                  <p>
                  <span className="font-semibold text-gray-700">    Alternate Number:{" "}</span> 
                    <span className="font-normal">{user.alternateNumber}</span>
                  </p>
                  <p>
                  <span className="font-semibold text-gray-700">   Aadhaar Card Number:{" "}</span> 
                    <span className="font-normal">{user.adharCardNumber}</span>
                  </p>
                  {user.adharCardPhoto && (
                    <div className="flex flex-col">
                      <p>  <span className="font-semibold text-gray-700">  Aadhaar Card Photo</span> </p>
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
                  <p>
                  <span className="font-semibold text-gray-700">   Pan Card Number:{" "}</span> 
                    <span className="font-normal">{user.panCardNumber}</span>
                  </p>
                  <p>
                  <span className="font-semibold text-gray-700">   GSTIN:</span>  <span className="font-normal">{user.GSTIN}</span>
                  </p>
                  {!user.approval ? (
                    <>
                      {" "}
                      <button
                        onClick={handleSendApproval}
                        className={`col-span-2 w-full h-10 bg-gradient-to-r from-[#FF1053] to-[#F7ACCF] rounded-lg text-white border-cream border-2 ${
                          isButtonActive && !hasSentRequest
                            ? ""
                            : "cursor-not-allowed opacity-50"
                        }`}
                        disabled={!isButtonActive || hasSentRequest}
                      >
                        {hasSentRequest
                          ? "Approval Request Sent"
                          : "Send Profile Approval"}
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                  {user.rejectionReason && (
                    <button
                      onClick={handleShowRejectionDialog}
                      className="col-span-2 w-full h-10 mt-2 bg-red-500 text-white rounded-lg"
                    >
                      Show Rejection Reason
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
          {user && (
            <div className="mt-4 w-full">
              {editing2 ? (
                <form onSubmit={handleSave} className="grid grid-cols-2 gap-4 ">
                  <div className="col-span-2 text-xl font-medium">
                    YOUR SOCIAL LINKS
                  </div>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="Facebook"
                    className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                  />
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="Instagram"
                    className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                  />
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="Twitter"
                    className="w-full h-10 p-4 rounded-md placeholder:text-gray-600 border-cream border-2"
                  />
                  <button
                    type="submit"
                    className="col-span-2 w-full bg-gradient-to-r from-[#FF1053] to-[#F7ACCF] h-10 bg-pink-500 rounded-lg text-white border-cream border-2"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <div className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-md text-lg space-y-3 font-poppins mb-2 overflow-hidden">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-xl">My Social Links</div>
                  <button onClick={handleEditSocials} className="text-blue-500 hover:text-blue-700 transition duration-300">
                    <MdEdit size={24} />
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center justify-start gap-2 break-words ml-1">
                    <CiFacebook size={50} /> <span className="truncate">{user.facebook}</span>
                  </p>
                  <p className="flex items-center justify-start gap-2 break-words ml-1">
                    <CiInstagram size={50} /> <span className="truncate">{user.instagram}</span>
                  </p>
                  <p className="flex items-center justify-start gap-2 break-words ml-1">
                    <BsTwitterX size={50} /> <span className="truncate">{user.twitter}</span>
                  </p>
                </div>
              </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showRejectionDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-4">Rejection Reason</h2>
            <p className="mb-4">{rejectionReason}</p>
            {rejectionTimestamp && (
              <p className="text-sm text-gray-500">
                Rejection Timestamp:{" "}
                {new Date(rejectionTimestamp.seconds * 1000).toLocaleString()}
              </p>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseRejectionDialog}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioPage;
