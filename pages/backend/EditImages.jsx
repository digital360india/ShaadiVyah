"use client";
import React, { useEffect, useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/firebase/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "nookies";
import { generatePassword } from "@/utils/generatePassword";
import { FiGift, FiHome, FiImage, FiTag } from "react-icons/fi";

const EditImages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [venueLinks, setVenueLinks] = useState([]);
  const [user, setUser] = useState(null);

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
          setVenueLinks(userData.venueLinks || []);
          setBannerImageUrl(userData.bannerImageUrl || "");
        }
      }
    };

    fetchUser();
  }, []);

  const handleBannerImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsLoading(true);

    try {
      const bannerRef = ref(storage, `bannerImages/${user.uid}/banner.jpg`);
      await uploadBytes(bannerRef, file);
      const downloadURL = await getDownloadURL(bannerRef);
      setBannerImageUrl(downloadURL);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { bannerImageUrl: downloadURL });

      toast.success("Banner image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading banner image: ", error);
      toast.error("Error uploading banner image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBannerImage = async () => {
    try {
      const bannerRef = ref(storage, `bannerImages/${user.uid}/banner.jpg`);
      await deleteObject(bannerRef);
      setBannerImageUrl("");

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { bannerImageUrl: "" });

      toast.success("Banner image deleted successfully!");
    } catch (error) {
      console.error("Error deleting banner image: ", error);
      toast.error("Error deleting banner image.");
    }
  };

  const handleVenueFilesChange = async () => {
    if (selectedFiles.length === 0) return;
    setIsLoading2(true);

    try {
      const userRef = doc(db, "users", user.uid);
      const venueUrls = [];
      for (const file of selectedFiles) {
        const venueRef = ref(
          storage,
          `bannerImages/${user.uid}/portfolio/${generatePassword()}`
        );
        await uploadBytes(venueRef, file);
        const downloadURL = await getDownloadURL(venueRef);
        venueUrls.push(downloadURL);
        await updateDoc(userRef, { venueLinks: arrayUnion(downloadURL) });
      }

      setVenueLinks((prevLinks) => [...prevLinks, ...venueUrls]);

      toast.success("Venue images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading venue images: ", error);
      toast.error("Error uploading venue images.");
    } finally {
      setIsLoading2(false);
      setSelectedFiles([]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
  };

  const handleDeleteVenueImage = async (index) => {
    try {
      const imageURL = venueLinks[index];
      const venueRef = ref(storage, imageURL);

      await deleteObject(venueRef);
      const updatedLinks = venueLinks.filter((_, i) => i !== index);
      setVenueLinks(updatedLinks);

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { venueLinks: arrayRemove(imageURL) });

      toast.success("Venue image deleted successfully!");
    } catch (error) {
      console.error("Error deleting venue image: ", error);
      toast.error("Error deleting venue image.");
    }
  };

  return (
    <>
      <div className="m-8">
        <ToastContainer />
        <div className="flex flex-col gap-8">
          {/* Banner Image Section */}
          <div className="text-2xl font-medium text-gray-800">Banner Image</div>
          <div className="flex gap-6 pl-[20px] lg:w-[46vw] md:w-[56vw] w-[80vw] py-[16px] border border-[#E7E7E7] rounded-xl shadow-md hover:shadow-xl transition-all">
            <input
              type="file"
              name="bannerImage"
              id="image-upload"
              style={{ display: "none" }}
              onChange={handleBannerImageChange}
            />
            <label
              htmlFor="image-upload"
              className="px-6 py-2 rounded-xl bg-[#A11C5C] text-white cursor-pointer shadow-md hover:bg-[#9a125c] transition-all"
            >
              {isLoading ? "Uploading..." : "Upload"}
            </label>
          </div>

          {/* Banner Image Preview */}
          {isLoading && (
            <div className="text-center mt-4 text-gray-500">Uploading banner image...</div>
          )}
          {bannerImageUrl && (
            <div className="relative w-[146px] h-[107px] mt-4 border-2 border-gray-300 rounded-lg overflow-hidden">
              <img
                src={bannerImageUrl}
                alt="Banner"
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full"
                onClick={handleDeleteBannerImage}
              >
                ✕
              </button>
            </div>
          )}

          {/* Portfolio Images Section */}
          <div className="text-2xl font-medium text-gray-800 mt-8">Portfolio Images</div>
          <div className="pl-[20px] lg:w-[46vw] md:w-[56vw] w-[80vw] py-[16px] border border-[#E7E7E7] rounded-xl shadow-md hover:shadow-xl transition-all">
            <input
              type="file"
              multiple
              onClick={(e) => (e.target.value = null)}
              onChange={handleFileSelect}
            />
            <button
              className="px-6 py-2 mt-2 rounded-xl bg-[#A11C5C] text-white cursor-pointer shadow-md hover:bg-[#9a125c] transition-all"
              onClick={handleVenueFilesChange}
            >
              {isLoading2 ? "Uploading..." : "Upload"}
            </button>
          </div>

          {/* Portfolio Image Preview */}
          {isLoading2 && (
            <div className="text-center mt-4 text-gray-500">Uploading venue images...</div>
          )}
          <div className="flex gap-4 flex-wrap mt-4">
            {venueLinks &&
              venueLinks.map((link, index) => (
                <div
                  key={index}
                  className="relative w-[146px] h-[107px] mt-4 border-2 border-gray-300 rounded-lg overflow-hidden"
                >
                  <img
                    src={link}
                    alt={`Venue Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full"
                    onClick={() => handleDeleteVenueImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditImages;
