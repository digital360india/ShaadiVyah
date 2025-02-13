import Link from "next/link";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";

const PhotographerVendorCard = ({ arr, index }) => {
  const truncateText = (text, length) => {
    if (!text) return "";
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  return (
   
    <Link
      href={`/photographersvendors/${arr.uid}`}
      key={arr.uid}
      className="py-4 md:px-1 px-2 "
    >
      <div
        className="bg-white roundedlg:h-[500px] lg:w-[398px] h-[480px] "
        style={{
          borderWidth: "3px",
          borderStyle: "solid",
          borderImage: "linear-gradient(180deg, #BE7318, #EED68A, #BE7217) 1",
        }}
      >
        <img
          src={arr.bannerImageUrl || "/logo.png"}
          alt={arr.businessName}
          className="w-full h-60 object-cover "
        />
        <div className="px-6 py-10">
          <div className="flex justify-between items-center h-[30px]">
            <h3 className="lg:text-[20px] text-blue font-semibold mb-2">
              {arr.businessName}
            </h3>
            <div className="flex justify-end items-center mb-2 gap-0">
              <p className="text-pink mt-1">
                {arr.averageRating?.toFixed(2) || 3}
              </p>
              <p>
                <MdOutlineStar className="text-pink text-xl" />
              </p>
            </div>
          </div>
          <div className="flex justify-start gap-2 py-3">
            <img src="/icons/locationred.svg" alt="Location Icon" />
            <p className="text-[14px] text-[#666666]">
              {arr.city ? arr.city : "Not Specified"}
            </p>
          </div>
          {/* <p className="text-sm py-4 h-[120px]">
            {truncateText(arr.about, 30)}
          </p> */}

          <div className="text-[16px]  mt-3 font-semibold ">
            <ul className="list-disc list-inside items-start flex flex-col  space-y-3">
              <li className="text-[#A11C5C] flex gap-1 justify-center items-center">
                <p>Price Per Day: </p>
                <FaRupeeSign className="text-sm" />
                <p>{arr?.pricePerDay}</p>
              </li>
              <li className="text-[#A11C5C] flex gap-1 justify-center items-center">
                <p>Photo Package: </p>
                <FaRupeeSign className="text-sm" />
                <p>{arr?.photoPackage}</p>
              </li>
              <li className="text-[#A11C5C] flex gap-1 justify-center items-center">
                <p>Photo Video Package : </p>
                <FaRupeeSign className="text-sm" />
                <p>{arr?.photoVideoPackage}</p>
              </li>
            </ul>
          </div>
        </div> 
      </div>
    </Link>
   
  );
};
export default PhotographerVendorCard;
 