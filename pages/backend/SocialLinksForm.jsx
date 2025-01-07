import React from 'react';

const SocialLinksForm = ({ formData, handleChange, handleSave }) => {
  return (
    <form
      onSubmit={handleSave}
      className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-2xl font-medium text-gray-800 mb-4">
        YOUR SOCIAL LINKS
      </div>

      <div className="space-y-4">
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
        className="w-full h-12  border border-pink bg-gradient-to-r from-pink to-white text-white rounded-lg hover:bg-pink-700 transition duration-300 focus:ring-2 focus:ring-pink-400"
      >
        Save
      </button>
    </form>
  );
};

export default SocialLinksForm;
