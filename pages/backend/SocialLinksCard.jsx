import React from "react";
import { MdEdit } from "react-icons/md";
import { CiFacebook, CiInstagram } from "react-icons/ci";
import { BsTwitterX } from "react-icons/bs";

const SocialLinksCard = ({ user, handleEditSocials }) => {
  return (
    <div className="w-full max-w-lg  p-6 rounded-lg shadow-lg text-lg space-y-4 font-poppins overflow-hidden">
      <div className="flex justify-between items-center">
        <div className="font-bold text-2xl text-black">My Social Links</div>
        <button
          onClick={handleEditSocials}
          className="text-blue-200 hover:text-blue-400 transition duration-300"
        >
          <MdEdit size={24} />
        </button>
      </div>
      <div className="space-y-3">
        {/* Facebook */}
        <div className="flex items-center gap-3">
          <CiFacebook size={40} className="text-blue-600" />
          <span className="truncate text-black">
            {user?.facebook || "Not provided"}
          </span>
        </div>

        {/* Instagram */}
        <div className="flex items-center gap-3">
          <CiInstagram size={40} className="text-pink-500" />
          <span className="truncate text-black">
            {user?.instagram || "Not provided"}
          </span>
        </div>

        {/* Twitter */}
        <div className="flex items-center gap-3">
          <BsTwitterX size={40} className="text-blue-400" />
          <span className="truncate text-black">
            {user?.twitter || "Not provided"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksCard;
