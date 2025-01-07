import React from 'react';
import { FaUserEdit } from 'react-icons/fa';

const UserProfileDetails = ({ user, handleEdit, handleSendApproval, handleShowRejectionDialog, isButtonActive, hasSentRequest }) => {
  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg space-y-6 font-poppins">
      {/* Header with Edit button */}
      <div className="flex justify-between items-center">
        <div className="font-bold text-2xl text-gray-800">My Details</div>
        <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700 transition duration-300">
          <FaUserEdit size={24} />
        </button>
      </div>

      {/* User Information */}
      <div className="space-y-4">
        <p>
          <span className="font-semibold text-gray-700">Name:</span> <span className="font-normal">{user?.name}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Business Name:</span> <span className="font-normal">{user?.businessName}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Street Address:</span> <span className="font-normal">{user?.streetAddress}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Landmark:</span> <span className="font-normal">{user?.landmark}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Post Code:</span> <span className="font-normal">{user?.postCode}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">City:</span> <span className="font-normal">{user?.city}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Country:</span> <span className="font-normal">{user?.country}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">About:</span> <span className="font-normal text-gray-600">{user?.about}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Phone Number:</span> <span className="font-normal">{user?.phone}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Alternate Number:</span> <span className="font-normal">{user?.alternateNumber}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">Aadhaar Card Number:</span> <span className="font-normal">{user?.adharCardNumber}</span>
        </p>

        {/* Aadhaar Card Photo */}
        {user?.adharCardPhoto && (
          <div className="flex flex-col mt-4">
            <p className="font-semibold text-gray-700">Aadhaar Card Photo:</p>
            <img
              src={user?.adharCardPhoto}
              alt="Aadhaar Card"
              className="mt-2 max-w-xs rounded-lg shadow-sm"
            />
          </div>
        )}

        <p>
          <span className="font-semibold text-gray-700">Pan Card Number:</span> <span className="font-normal">{user?.panCardNumber}</span>
        </p>
        <p>
          <span className="font-semibold text-gray-700">GSTIN:</span> <span className="font-normal">{user?.GSTIN}</span>
        </p>

        {/* Approval Button or Status */}
        {!user?.approval ? (
          <button
            onClick={handleSendApproval}
            className={`w-full h-12 bg-gradient-to-r from-pink to-pink border border-pink text-white rounded-lg mt-4 ${isButtonActive && !hasSentRequest ? '' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!isButtonActive || hasSentRequest}
          >
            {hasSentRequest ? 'Approval Request Sent' : 'Send Profile Approval'}
          </button>
        ) : (
          <div className="w-full h-12 bg-green-600 rounded-md text-white flex items-center justify-center mt-4">
            Profile Approved
          </div>
        )}

        {/* Rejection Reason Button */}
        {user?.rejectionReason && (
          <button
            onClick={handleShowRejectionDialog}
            className="w-full h-12 bg-red-500 text-white rounded-lg mt-4"
          >
            Show Rejection Reason
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfileDetails;
