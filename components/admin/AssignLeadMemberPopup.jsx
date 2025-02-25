"use client";
import React, { useState } from "react";

import { useLead } from "@/Providers/LeadProviders";

const AssignLeadMemberPopup = ({ isOpen, onClose, leadData }) => {
  const { fetchAllTeamMembers, teammembers, updateLead } = useLead();

  const [assignedmember, setAssignedMember] = useState([]);

  const [selectedMember, setSelectedMember] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMembers = async () => {
    try {
      await fetchAllTeamMembers();
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember) {
      alert("Please select a member");
      return;
    }
    setIsSubmitting(true);

    try {
      const assignedmemberWithTimestamp = {
        uid: selectedMember,
        name: teammembers.find((member) => member.id === selectedMember)?.name,
        timestamp: new Date().toLocaleString(),
      };

      const updatedassignedmember = [
        ...(leadData.assignedmember || []),
        assignedmemberWithTimestamp,
      ];

      await updateLead(leadData.id, {
        assignedmember: updatedassignedmember,
      });
      alert("Lead assigned successfully!");
      setAssignedMember(updatedassignedmember);
      onClose();
    } catch (error) {
      console.error("Error assigning lead:", error);
      alert("Failed to assign lead");
    }
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-[#FFF4E8] shadow-lg p-10 w-full max-w-4xl relative font-Merriweather font-thin">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl text-gray-600 hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-center text-[#A11C5C] text-2xl font-bold mb-6">
          Assign Lead for <strong>{leadData?.name}</strong>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#A11C5C] mb-2">Select Member</label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">-- Select Member --</option>
              {teammembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-6 text-white rounded-md bg-gradient-to-r from-[#DD0D63] to-[#800F45]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Assigning..." : "Assign Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignLeadMemberPopup;
