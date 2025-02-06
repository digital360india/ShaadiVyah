import Image from "next/image";
import React from "react";

const Blink = () => {
  return (
    <div className="relative flex items-center justify-center w-[60px] h-[60px]">
      <div className="absolute inset-0 rounded-full bg-[#7C0B45] animate-ripple"></div>

      <Image
        src="/icons/aunty.svg"
        alt="aunty"
        width={1000}
        height={1000}
        className="w-[80px] h-[80px] relative cursor-pointer"
      />
    </div>
  );
};

export default Blink;
