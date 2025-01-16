import Link from 'next/link';
import { MdOutlineStar } from 'react-icons/md';

const MendhiVendorCard = ({ arr, index }) => {
  const truncateText = (text, length) => {
    if (!text) return '';
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  return (
    <Link
      href={`/mehandivendors/${arr.uid}`}
      key={arr.uid}
      className="py-4 md:px-1 px-2"
    >
      <div
        className="bg-white rounded shadow-md lg:h-[488px] lg:w-[398px] h-[450px]"
        style={{
          borderWidth: "3px",
          borderStyle: "solid",
          borderImage: "linear-gradient(180deg, #BE7318, #EED68A, #BE7217) 1",
        }}
      >
        <img
          src={arr.bannerImageUrl || "/logo.png"}
          alt={arr.businessName}
          className="w-full h-60 object-cover rounded-t-[4px]"
        />
        <div className="px-6 py-4">
          <div className="flex justify-between items-center h-[30px]">
            <h3 className="lg:text-xl text-blue font-semibold mb-2">
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
          <div className="flex justify-start gap-2">
            <img
              src="/icons/locationred.svg"
              alt="Location Icon"
            />
            <p className="text-[14px] text-[#666666]">
              {arr.location ? arr.location : "Not Specified"}
            </p>
          </div>
          <p className="text-sm py-4 h-[120px]">
            {truncateText(arr.about, 30)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MendhiVendorCard;
