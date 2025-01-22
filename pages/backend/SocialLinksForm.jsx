import React from "react";

const SocialLinksForm = ({ formData, handleChange, handleSave }) => {
  return (
    <form
      onSubmit={handleSave}
      className="w-full max-w-lg px-5 pt-4 md:pt-0  md:p-6  space-y-1"
    >
      <div className="text-md md:text-2xl font-medium bg-gradient2 bg-clip-text text-transparent ">
        YOUR SOCIAL LINKS
      </div>
      <div className="w-[150px] md:w-[300px] h-[2px] bg-gradient-border"></div>
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
        className="w-full h-12  text-white rounded-lg text-[16px] bg-gradient-border "
      >
        Save
      </button>
    </form>
  );
};

export default SocialLinksForm;
