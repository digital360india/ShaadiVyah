"use client";
import { auth } from "@/firebase/firebase";
import { useLead } from "@/Providers/LeadProviders";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";

const AddTeamMemberPopUp = ({ isOpen, onClose }) => {
  const { addTeamMember, emailOTPVerification } = useLead();
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState("");
  const [verifyotp, setVerifyOTP] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    retypePassword: "",
  });

  const allFieldsFilled =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.role &&
    formData.password &&
    formData.retypePassword;

  useEffect(() => {
    let interval;
    if (showOtpScreen && isResendDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 60;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpScreen, isResendDisabled]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const sendOTP = async (email) => {
    try {
      const response = await emailOTPVerification(email);
      if (response.success) {
        setVerifyOTP(response.otp);
        return response.otp;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw new Error("Failed to send OTP. Try again.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.retypePassword) {
      alert("Passwords do not match");
      setIsSubmitting(false);
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      setIsSubmitting(false);
      return;
    }
    try {
      await sendOTP(formData.email);
      alert("OTP sent successfully!");
      setShowOtpScreen(true);
      setIsResendDisabled(true);
    } catch (error) {
      alert("Failed to send OTP. Try again.");
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otp != verifyotp) {
      alert("Invalid OTP");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const formDatanew = {
        ...formData,
        uid: userCredential.user.uid,
      };
      await addTeamMember({ ...formDatanew });

      alert("Team Member added successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        retypePassword: "",
      });
      setShowOtpScreen(false);
      onClose();
    } catch (error) {
      console.error("Error adding team member:", error);
      alert("Failed to add team member");
    }
  };

  const handleResendOtp = async () => {
    setIsResendDisabled(true);
    setTimer(60);
    await sendOTP(formData.email);
    alert("OTP resent successfully");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#FFF4E8] shadow-lg p-10 w-full max-w-4xl relative font-Merriweather font-thin border-gradient">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl text-gray-600 hover:text-red-500"
        >
          &times;
        </button>
        <div className="text-center pb-10">
          <p className="text-[#A11C5C] text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
            Add New Team Member
          </p>
        </div>
        {!showOtpScreen ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-2 grid grid-cols-2 gap-5"
          >
            <div>
              <label className="block text-[#A11C5C] ">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-[#A11C5C] ">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-[#A11C5C] ">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your Phone"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-[#A11C5C]">Role</label>
              <div
                className="w-full p-3 border rounded cursor-pointer flex items-center justify-between bg-gray-100"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{formData.role || "Select Role..."}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              {isDropdownOpen && (
                <ul className="absolute w-full bg-white border mt-2 rounded shadow-lg z-10">
                  {["Admin", "Staff"].map((option) => (
                    <li
                      key={option}
                      className="p-3 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, role: option }));
                        setIsDropdownOpen(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-[#A11C5C] ">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Your Password"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-[#A11C5C] ">Re-Type Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="retypePassword"
                value={formData.retypePassword}
                onChange={handleInputChange}
                placeholder="Re-Type Password"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                Show Password
              </label>
            </div>
            <div className="col-span-2 flex justify-center">
              <button
                type="submit"
                className={`py-2 px-6 text-white rounded-md ${
                  allFieldsFilled
                    ? "bg-gradient-to-r from-[#DD0D63] to-[#800F45]"
                    : "bg-gradient-to-r from-[#DD0D63] to-[#800F45] cursor-not-allowed opacity-50"
                }`}
                disabled={!allFieldsFilled || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <h2 className="text-xl text-[#A11C5C] font-semibold mb-4">
              Verify OTP
            </h2>
            <div className="mb-4">
              <label className="block text-[#A11C5C]">OTP:</label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="py-2 px-6 text-white rounded-md mt-4 bg-gradient-to-r from-[#DD0D63] to-[#800F45]"
            >
              Verify OTP
            </button>
            <button
              type="button"
              onClick={handleResendOtp}
              className="py-2 px-6 text-white rounded-md mt-4 bg-gradient-to-r from-[#DD0D63] to-[#800F45]"
              disabled={isResendDisabled}
            >
              Resend OTP {isResendDisabled && `(${timer}s)`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddTeamMemberPopUp;
