"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseApp, db } from "@/firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const auth = getAuth(firebaseApp);

const AuthPage = () => {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await getUserByEmail(data.email);

      if (!user) {
        toast.error("User not found.");
        return;
      }

      await signInWithEmailAndPassword(auth, data.email, data.password);

      document.cookie = `token=${user.uid}`;
      toast.success("Welcome ADMIN");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const getUserByEmail = async (email) => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );

    if (querySnapshot.docs.length > 0) {
      return querySnapshot.docs[0].data();
    }

    return null;
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center h-[90vh] relative top-10 overflow-hidden">
        <ToastContainer />
        <img
          src="/images/hero.png"
          alt="Hero"
          width={1200}
          height={1200}
          className="rounded-3xl h-[500px] w-[400px] md:w-[1500px] shadow-2xl shadow-gray-600 object-cover object-left md:object-center md:object-cover mt-20 md:mt-0"
        />
        <div className="absolute bg-opacity-20 rounded-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="font-normal text-center p-8">
            <p className="text-white text-4xl">Welcome Vendor</p>
            <p className="text-white text-xl">
              Login to Access Admin Dashboard
            </p>
            <div className="w-96 h-96 bg-opacity-80 bg-black text-black flex-col rounded-2xl mt-10 p-6">
              <div className="flex justify-center items-center">
                <img
                  src="/logo.png"
                  alt="Logo"
                  width={1200}
                  height={1200}
                  className="rounded-full h-[100px] w-[100px] shadow-2xl shadow-gray-600"
                />
              </div>
              <form className="m-auto text-black" onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="text-white justify-start flex text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    className="w-full px-3 py-2 placeholder-gray-300 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring focus:border-blue-300 text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-white justify-start flex text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={data.password}
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) =>
                      setData({ ...data, [e.target.name]: e.target.value })
                    }
                    className="w-full px-3 py-2 placeholder-gray-300 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring focus:border-blue-300 text-black"
                  />
                </div>
                <div className="mb-4">
                  <input type="checkbox" id="rememberMe" className="mr-2" />
                  <label
                    htmlFor="rememberMe"
                    className="text-white text-sm cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300 w-60"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthPage;
