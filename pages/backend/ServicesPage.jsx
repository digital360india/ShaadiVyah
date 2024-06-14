"use client";
import { db } from "@/firebase/firebase";
import MakeUpVendorPage from "@/pages/backend/MakeUpVendorPage";
import MehndiVendorPage from "@/pages/backend/MehndiVendorPage";
import PhotographerVendorPage from "@/pages/backend/PhotographerVendorPage";
import VenueVendorPage from "@/pages/backend/VenueVendorPage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
const ServicesPage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cookies = parseCookies();
  const uid = cookies.token;

  const fetchUser = async (uid) => {
    setIsLoading(true);
    setError(null);
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        console.log(userData);
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (uid) {
      fetchUser(uid);
    }
  }, [uid]);
  return (
    <div>
      {" "}
      {isLoading && <p>Loading user data...</p>}
      {error && <p>Error: {error}</p>}
      {user?.vendorTypeUID === "venuevendor" && <VenueVendorPage />}
      {user?.vendorTypeUID === "makeupvendor" && <MakeUpVendorPage />}
      {user?.vendorTypeUID === "photographervendor" && (
        <PhotographerVendorPage />
      )}
      {user?.vendorTypeUID === "mehndivendor" && <MehndiVendorPage />}
    </div>
  );
};

export default ServicesPage;
