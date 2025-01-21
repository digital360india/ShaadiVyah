import React from "react";
import Image from "next/image";

const SocialLinksCard = ({ user, handleEditSocials }) => {
  return (
    <div className="w-full max-w-lg  pt-6 rounded-lg  text-lg space-y-1 font-Merriweather-Sans overflow-hidden">
      <div className="flex space-x-10 items-center">
        <div
          className="font-bold text-2xl bg-gradient2 bg-clip-text text-transparent"
         
        >
          SOCIAL MEDIA LINKS
        </div>

        <button
          onClick={handleEditSocials}
          className="border border-[#A11C5C] text-[#A11C5C] text-[14px] rounded-xl w-[49px] pt-[2px] h-[30px] mt-1 cursor-pointer   "
        >
          Edit
        </button>
      </div>
      <div
        className="w-[325px] h-[3px] bg-gradient-border"
        
      ></div>
      <div className="space-y-5 pt-14  text-[14px] text-[#4A4A4A]">
        {/* Facebook */}
        <div className="flex items-center gap-12">
          <Image
            src="/icons/fb.svg"
            alt="icon"
            width={1000}
            height={1000}
            className="w-[20px] h-[20px]"
          />

          <span className="truncate ">{user?.facebook || "Not provided"}</span>
        </div>

        {/* Instagram */}
        <div className="flex items-center gap-12">
          <Image
            src="/icons/instagram.svg"
            alt="icon"
            width={1000}
            height={1000}
            className="w-[20px] h-[20px]"
          />

          <span className="truncate ">{user?.instagram || "Not provided"}</span>
        </div>

        {/* Twitter */}
        <div className="flex items-center gap-12">
          <Image
            src="/icons/twitter.svg"
            alt="icon"
            width={1000}
            height={1000}
            className="w-[20px] h-[20px]"
          />

          <span className="truncate ">{user?.twitter || "Not provided"}</span>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksCard;
