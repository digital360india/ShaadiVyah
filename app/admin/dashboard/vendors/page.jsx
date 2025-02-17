"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Modal from "react-modal";
import "@/styles/admin.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdCloseCircle } from "react-icons/io";

const UserInfoPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          uid: doc.id,
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);
  const handleDeleteUser = async () => {
    try {
      await deleteDoc(doc(db, "users", selectedUser.uid));
      toast.success("User deleted successfully!");
      setUsers(users.filter((user) => user.uid !== selectedUser.uid));
      closeModal();
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("Error deleting user.");
    }
  };
  const handleunSuspendUser = async () => {
    try {
      await updateDoc(doc(db, "users", selectedUser.uid), { suspended: false });
      toast.success("User unsuspended successfully!");
      setUsers(
        users.map((user) =>
          user.uid === selectedUser.uid ? { ...user, suspended: false } : user
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error unsuspending user: ", error);
      toast.error("Error unsuspending user.");
    }
  };

  const handleSuspendUser = async () => {
    try {
      await updateDoc(doc(db, "users", selectedUser.uid), { suspended: true });
      toast.success("User suspended successfully!");
      setUsers(
        users.map((user) =>
          user.uid === selectedUser.uid ? { ...user, suspended: true } : user
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error suspending user: ", error);
      toast.error("Error suspending user.");
    }
  };
  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (!users.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4  bg-[url('/images/dashbg1.svg')] w-full h-full">
      <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
        Users
        <hr className="w-[90px] h-[2px] bg-gradient-border border-0 font-thin space-x-6" />
      </h1>

      {users.map((user) => (
        // <div
        //   key={user.uid}
        //   className={`mb-2 p-2   bg-gradient-border border  ${
        //     user.suspended == true ? "bg-red-200" : ""
        //   } rounded flex justify-between items-center`}
        // >
        //   <p className="text-lg">{user.name}</p>
        //   <button
        //     onClick={() => openModal(user)}
        //     className="px-4 py-2 bg-blue-500 text-[#A11C5C] rounded"
        //   >
        //     View Details
        //     <hr className="w-24 h-[1px] bg-[#A11C5C] border-0 " />
        //   </button>
        // </div>

        <div
          key={user.uid}
          className={`pb-3  border-b border-[#BE7318] ${
            user.suspended ? "bg-red-200 " : "bg-[#FDF3E6] mb-3"
          } flex justify-between items-center`}
        >
          <p className="text-lg  text-[#333] font-Merriweather font-thin">{user.name}</p>
          <button
            onClick={() => openModal(user)}
            className="text-[#A11C5C] font-semibold"
          >
            <span className="border-b border-[#A11C5C]">View Details</span>
          </button>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="User Information"
        ariaHideApp={false}
        className="modal"
        overlayClassName="overlay"
      >
        {selectedUser && (
          <div className="p-4">
            <div className="flex justify-between items-center">
              {" "}
              <h2 className="text-xl text-black font-bold font-Merriweather ">
                User Information
              </h2>
              <button
                onClick={closeModal}
                className="text-xl text-red-500  rounded"
              >
                <IoMdCloseCircle />
              </button>
            </div>
            <div
              className={` ${
                selectedUser.suspended ? "visible" : "hidden"
              } flex justify-center items-center text-xl text-red-600 `}
            >
              {" "}
              User Suspended
            </div>
            <p>
              <strong>GSTIN:</strong> {selectedUser.GSTIN}
            </p>
            <p>
              <strong>About:</strong> {selectedUser.about}
            </p>
            <p>
              <strong>Aadhar Card Number:</strong>{" "}
              {selectedUser.adharCardNumber}
            </p>
            <img
              src={selectedUser.adharCardPhoto}
              alt="Aadhar Card"
              className="w-32 h-32 mb-4"
            />
            <p>
              <strong>Alternate Number:</strong> {selectedUser.alternateNumber}
            </p>
            <p>
              <strong>Approved:</strong> {selectedUser.approved ? "Yes" : "No"}
            </p>
            <img
              src={selectedUser.bannerImageUrl}
              alt="Banner"
              className="w-full mb-4"
            />
            <p>
              <strong>Business Name:</strong> {selectedUser.businessName}
            </p>
            <p>
              <strong>City:</strong> {selectedUser.city}
            </p>
            <p>
              <strong>Country:</strong> {selectedUser.country}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Facebook:</strong>{" "}
              <a
                href={selectedUser.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedUser.facebook}
              </a>
            </p>
            <p>
              <strong>Google Location:</strong>{" "}
              <a
                href={selectedUser.googleLocation}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedUser.googleLocation}
              </a>
            </p>
            <p>
              <strong>Instagram:</strong>{" "}
              <a
                href={selectedUser.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedUser.instagram}
              </a>
            </p>
            <p>
              <strong>Landmark:</strong> {selectedUser.landmark}
            </p>
            <p>
              <strong>Location:</strong> {selectedUser.location}
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Pan Card Number:</strong> {selectedUser.panCardNumber}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedUser.phoneNumber}
            </p>
            <p>
              <strong>Post Code:</strong> {selectedUser.postCode}
            </p>
            <p>
              <strong>SEO Rating:</strong> {selectedUser.seoRating}
            </p>
            <p>
              <strong>Street Address:</strong> {selectedUser.streetAddress}
            </p>
            <p>
              <strong>Timestamp:</strong>{" "}
              {new Date(selectedUser.timestamp.seconds * 1000).toLocaleString()}
            </p>
            <p>
              <strong>Twitter:</strong>{" "}
              <a
                href={selectedUser.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedUser.twitter}
              </a>
            </p>
            <p>
              <strong>Vendor Type:</strong> {selectedUser.vendorType}
            </p>
            <p>
              <strong>Vendor Type UID:</strong> {selectedUser.vendorTypeUID}
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete User
              </button>

              <button
                onClick={
                  selectedUser.suspended
                    ? handleunSuspendUser
                    : handleSuspendUser
                }
                className={`px-4 py-2 ${
                  selectedUser.suspended ? "bg-green-500" : "bg-yellow-500"
                } text-white rounded`}
              >
                {selectedUser.suspended ? "Unsuspend User" : "Suspend User"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserInfoPage;
