import React from "react";

const SocialLinksForm = ({ formData, handleChange, handleSave }) => {
  return (
    <form onSubmit={handleSave} className="w-full max-w-lg  p-6  space-y-1">
      <div
        className="text-2xl font-medium  "
        style={{
          backgroundImage:
            "linear-gradient(180deg, #BE7318 0%, #EED68A 50%, #BE7318 100%)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        YOUR SOCIAL LINKS
      </div>
      <div
        className="w-[300px] h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, #BE7318 0%, #EED68A 50%, #BE7318 100%)",
        }}
      ></div>
      <div className="space-y-6 py-8">
        {/* Facebook */}
        <div className="relative">
          <input
            type="text"
            name="facebook"
            value={formData?.facebook}
            onChange={handleChange}
            placeholder="Facebook"
            className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:ring-2 focus:ring-pink-400 transition-all"
          />
        </div>

        {/* Instagram */}
        <div className="relative">
          <input
            type="text"
            name="instagram"
            value={formData?.instagram}
            onChange={handleChange}
            placeholder="Instagram"
            className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:ring-2 focus:ring-pink-400 transition-all"
          />
        </div>

        {/* Twitter */}
        <div className="relative">
          <input
            type="text"
            name="twitter"
            value={formData?.twitter}
            onChange={handleChange}
            placeholder="Twitter"
            className="w-full h-12 p-4 rounded-md placeholder:text-gray-600 border-2 border-gray-300 focus:ring-2 focus:ring-pink-400 transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #DD0D63 0%, #A11C5C 100%)",
        }}
        className="w-full h-12  text-white rounded-lg text-[16px]  "
      >
        Save
      </button>
    </form>
  );
};

export default SocialLinksForm;
