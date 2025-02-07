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
import Image from "next/image";

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
  
    const img = new window.Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      if (
        img.height < 400 || 
        img.height > 600 || 
        img.width < 1200 || 
        img.width > 1440
      ) {
        toast.error(
          "Banner image must have a height between 500px to 550px, and a width between 1300px to 1440px."
        );
        setIsLoading(false);
        return;
      }
  
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

    if (venueLinks.length + selectedFiles.length > 20) {
      toast.error("You can only upload a maximum of 20 images.");
      return;
    }

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
      <div className="p-14">
        <ToastContainer />
        <div className="flex flex-col gap-8">
          {/* Banner Image Section */}
          <div className="font-bold text-2xl bg-gradient2 bg-clip-text text-transparent ">
            Banner Image <span className="text-md">(max 1 Image)</span>
            <div className="w-[210px] h-[2px] bg-gradient-border"></div>
          </div>

          <div className="flex gap-6 pl-[20px] lg:w-[30vw] md:w-[56vw] w-[80vw] py-[16px] rounded-xl shadow-md hover:shadow-xl transition-all">
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
            <div className="text-center mt-4 text-gray-500">
              Uploading banner image...
            </div>
          )}
          {bannerImageUrl && (
            <div className="relative  mt-4  rounded-lg overflow-hidden w-full h-[550px]">
              <Image
                src={bannerImageUrl}
                alt="Banner"
                width={1000}
                height={1000}
                className="w-full h-full object-cover bg-cover bg-center"
              />
              <button
                className="absolute top-0 right-0 bg-[#FF0000] w-8 h-8 text-black  rounded-full"
                onClick={handleDeleteBannerImage}
              >
                ✕
              </button>
            </div>
          )}

          {/* Portfolio Images Section */}
          <div className="font-bold text-2xl bg-gradient2 bg-clip-text text-transparent ">
            Portfolio Images <span className="text-md">(max 20 Images)</span>
            <div className="w-[250px] h-[3px] bg-gradient-border"></div>
          </div>
          <div className="pl-[20px] lg:w-[30vw] md:w-[56vw] w-[80vw] py-[16px] border  rounded-xl shadow-md hover:shadow-xl transition-all">
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
            <div className="text-center mt-4 text-gray-500">
              Uploading venue images...
            </div>
          )}
          <div className="flex gap-4 flex-wrap mt-4">
            {venueLinks &&
              venueLinks.map((link, index) => (
                <div
                  key={index}
                  className="relative xl:w-[450px] lg:w-[320px] lg:h-[450px] md:w-[350px] md:h-[300px] flex justify-center items-center"
                >
                  <Image
                    src="/icons/imgframe.svg"
                    alt={`Venue Image ${index + 1}`}
                    width={450}
                    height={450}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                  <img
                    className="relative  w-[67.5%] h-[67.5%] object-cover "
                    src={link}
                    alt={`Venue Image ${index + 1}`}
                  />

                  <button
                    className="absolute top-0 right-0 bg-[#FF0000] w-8 h-8 text-black font-bold rounded-full"
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
