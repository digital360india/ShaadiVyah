import React from "react";

const VenueDetailsForm = ({
  formData,
  handleChange,
  handleSave,
  handleAadhaarUpload,
  aadhaarImageUrl,
  handleDeleteAadhaarImage,
}) => {
  return (
    <form
      onSubmit={handleSave}
      className="space-y-8 pb-24 md:pb-0   rounded-lg pt-8 md:pt-2  font-Merriweather-Sans px-5 md:px-0 "
    >
      {/* Venue Details Section */}
      <div
        className="text-md md:text-2xl font-medium bg-gradient2 bg-clip-text text-transparent"
        
      >
        YOUR VENUE DETAILS
        <div
          className="w-[167px] md:w-[330px] h-[2px] bg-gradient-border"
          
        ></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData?.name}
          onChange={handleChange}
          placeholder="Owner"
          className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="businessName"
          value={formData?.businessName}
          onChange={handleChange}
          placeholder="Your business name*"
          className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Venue Address Section */}
      <div className="text-md md:text-xl font-medium text-gray-800">
        YOUR VENUE ADDRESS
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="streetAddress"
          value={formData?.streetAddress}
          onChange={handleChange}
          placeholder="Street Address*"
          className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {/* <input
          type="text"
          name="landmark"
          value={formData?.landmark}
          onChange={handleChange}
          placeholder="Landmark (Optional)"
          className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        /> */}
        {/* <input
          type="text"
          name="postCode"
          value={formData?.postCode}
          onChange={handleChange}
          placeholder="Post Code*"
          className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        /> */}
        <input
          type="text"
          name="city"
          value={formData?.city}
          onChange={handleChange}
          placeholder="City*"
          className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {/* <input
          type="text"
          name="country"
          value={formData?.country}
          onChange={handleChange}
          placeholder="Country*"
          className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        /> */}
        {/* <input
          type="text"
          name="googleLocation"
          value={formData?.googleLocation}
          onChange={handleChange}
          placeholder="Google Location*"
          className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        /> */}
      </div>

      {/* About Section */}
      <div className="text-md md:text-xl font-medium text-gray-800">ABOUT</div>
      <textarea
        name="about"
        value={formData?.about}
        onChange={handleChange}
        placeholder="About"
        className="w-full h-28 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      {/* Contact Details Section */}
      <div className="text-md md:text-xl font-medium text-gray-800">CONTACT DETAILS</div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="phone"
          value={formData?.phone}
          onChange={handleChange}
          placeholder="Phone Number*"
          className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="text"
          name="alternateNumber"
          value={formData?.alternateNumber}
          onChange={handleChange}
          placeholder="Alternate Number (Optional)"
          className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Verification Details Section */}
      <div className="text-md md:text-xl font-medium text-gray-800">
        VERIFICATION DETAILS
      </div>
      <input
        type="text"
        name="adharCardNumber"
        value={formData?.adharCardNumber}
        onChange={handleChange}
        placeholder="Aadhaar Card Number*"
        className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
          className="w-full h-12 p-2 rounded-md placeholder:text-gray-600 mb-4 border-2 border-gray-300"
        />
        {aadhaarImageUrl && (
          <div className="mt-2 flex items-center justify-between">
            <img
              src={aadhaarImageUrl}
              alt="Aadhaar Card"
              width={200}
              height={200}
              className="rounded-lg"
            />
            <button
              type="button"
              className="text-red-600 text-sm"
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
        value={formData?.panCardNumber}
        onChange={handleChange}
        placeholder="Pan Card Number (Optional)"
        className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <input
        type="text"
        name="GSTIN"
        value={formData?.GSTIN}
        onChange={handleChange}
        placeholder="GSTIN (Optional)"
        className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full h-12 rounded-lg text-white bg-gradient-border" 
       
      >
        Save
      </button>
    </form>
  );
};

export default VenueDetailsForm;
