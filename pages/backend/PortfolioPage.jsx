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
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import SocialLinksCard from "./SocialLinksCard";
import SocialLinksForm from "./SocialLinksForm";
import UserProfileDetails from "./UserProfileDetails";
import VenueDetailsForm from "./VenueDetailsForm";
import LandingPage from "./LandingPage";
import Image from "next/image";

const PortfolioPage = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [aadhaarImageUrl, setAadhaarImageUrl] = useState("");
  const [editing2, setEditing2] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
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

  // console.log(formData?.name);

  return (
    <>
      <div className="md:p-10  bg-[url('/icons/background.svg')] bg-cover bg-center object-cover bg-[#FFF5E8]">
        <ToastContainer />
        <div className="md:h-[52vh] object-cover bg-cover bg-center">
          <LandingPage />
        </div>

        <div className="md:hidden font-Merriweather-Sans">
          <div className="flex px-[22px] pt-10 justify-between">
            <p
              onClick={() => setActiveTab("about")}
              className={`cursor-pointer ${
                activeTab === "about"
                  ? "font-bold text-[#A11C5C] bg-gradient-to-b from-transparent to-[rgba(190,115,24,0.4)] px-2"
                  : "text-[#9C9C9C]"
              }`}
            >
              About Me
            </p>
            {/* <p
              onClick={() => setActiveTab("social")}
              className={`cursor-pointer ${
                activeTab === "social"
                  ? "font-bold text-[#A11C5C] bg-gradient-to-b from-transparent to-[rgba(190,115,24,0.4)] px-2"
                  : "text-[#9C9C9C]"
              }`}
            >
              My Social Media
            </p> */}
            <p
              onClick={() => setActiveTab("documents")}
              className={`cursor-pointer ${
                activeTab === "documents"
                  ? "font-bold text-[#A11C5C] bg-gradient-to-b from-transparent to-[rgba(190,115,24,0.4)] px-2"
                  : "text-[#9C9C9C]"
              }`}
            >
              My Documents
            </p>
          </div>
          <div className="w-[90%] bg-gradient-border h-[2px] mx-5"></div>

          <div className="flex flex-col md:flex-row gap-10 items-start justify-start">
            {activeTab === "about" && (
              <div className="md:mt-4 w-full">
                {editing ? (
                  <VenueDetailsForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    handleAadhaarUpload={handleAadhaarUpload}
                    aadhaarImageUrl={aadhaarImageUrl}
                    handleDeleteAadhaarImage={handleDeleteAadhaarImage}
                  />
                ) : (
                  <UserProfileDetails
                    user={user}
                    handleEdit={handleEdit}
                    handleSendApproval={handleSendApproval}
                    handleShowRejectionDialog={handleShowRejectionDialog}
                    isButtonActive={isButtonActive}
                    hasSentRequest={hasSentRequest}
                  />
                )}
              </div>
            )}
            {/* {activeTab === "social" && (
              <div className="mt-4 w-full mb-40">
                {editing2 ? (
                  <SocialLinksForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSave={handleSave}
                  />
                ) : (
                  <SocialLinksCard
                    user={user}
                    handleEditSocials={handleEditSocials}
                  />
                )}
              </div>
            )} */}

            {activeTab === "documents" && (
              <div>
                {editing ? (
                  <VenueDetailsForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    handleAadhaarUpload={handleAadhaarUpload}
                    aadhaarImageUrl={aadhaarImageUrl}
                    handleDeleteAadhaarImage={handleDeleteAadhaarImage}
                  />
                ) : (
                  <div className="font-Merriweather-Sans text-[14px] md:hidden p-5">
                    <div className="flex  items-center space-x-8">
                      <div className="font-bold text-md lg:text-[31.5px] bg-gradient2 bg-clip-text text-transparent ">
                        PERSONAL DOCUMENTS
                        <div className=" md:w-[375px] h-[2px] bg-gradient-border"></div>
                      </div>
                      <button
                        onClick={handleEdit}
                        className="border border-[#A11C5C] text-[#A11C5C] text-[14px] rounded-xl w-[49px] pt-[2px] h-[30px] mt-1 cursor-pointer   "
                      >
                        Edit
                      </button>
                    </div>
                    {user?.adharCardPhoto ? (
                      <div className="flex flex-col mt-4">
                        <p className="text-[#159500]">
                          Aadhaar Card (Verified)
                        </p>
                        <img
                          src={user?.adharCardPhoto}
                          alt="Aadhaar Card"
                          className="mt-2 max-w-xs rounded-lg shadow-sm"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col mt-4">
                        <p className="text-[#FF0000]">Aadhaar Card (Pending)</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="flex flex-col md:flex-row gap-10 items-start justify-start ">
            {user && (
              <div className="md:mt-4 w-full">
                {editing ? (
                  <VenueDetailsForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSave={handleSave}
                    handleAadhaarUpload={handleAadhaarUpload}
                    aadhaarImageUrl={aadhaarImageUrl}
                    handleDeleteAadhaarImage={handleDeleteAadhaarImage}
                  />
                ) : (
                  <UserProfileDetails
                    user={user}
                    handleEdit={handleEdit}
                    handleSendApproval={handleSendApproval}
                    handleShowRejectionDialog={handleShowRejectionDialog}
                    isButtonActive={isButtonActive}
                    hasSentRequest={hasSentRequest}
                  />
                )}
              </div>
            )}
            {/* {user && (
              <div className="mt-4 w-full mb-40">
                {editing2 ? (
                  <SocialLinksForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSave={handleSave}
                  />
                ) : (
                  <SocialLinksCard
                    user={user}
                    handleEditSocials={handleEditSocials}
                  />
                )} 
              </div>
            )} */}
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="w-full h-[6px] bg-gradient-border "></div>
        <div className="bg-[#A11C5C] h-[100px] flex justify-center items-center space-x-4  ">
          <Image
            src="/icons/flower.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="w-[45px] h-[45px]"
          />
          <p className=" text-[18px] text-[#FFFFFF] font-normal font-Merriweather">
            Please wait till we verify your Profile. Once{" "}
            <strong>Verified</strong> your profile will be ready make impact on
            clients.
          </p>
          <Image
            src="/icons/flower.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="w-[45px] h-[45px]"
          />
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
