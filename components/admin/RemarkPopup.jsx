"use client";
import { useLead } from "@/Providers/LeadProviders";
import React, { useState } from "react";

const RemarkPopup = ({ isOpen, onClose, leadData }) => {
  const { updateLead } = useLead();
  const [remarks, setRemarks] = useState(leadData.remarks || []);
  const [newRemark, setNewRemark] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddRemark = async () => {
    if (!newRemark.title || !newRemark.description) return;

    setIsSubmitting(true);
    try {
      const remarkWithTimestamp = {
        ...newRemark,
        timestamp: new Date().toLocaleString(),
      };

      const updatedRemarks = [...remarks, remarkWithTimestamp];
      await updateLead(leadData.id, { remarks: updatedRemarks });

      alert("Remark added successfully!");
      setRemarks(updatedRemarks);
      setNewRemark({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding remark:", error);
      alert("Failed to add remark.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen || !leadData) return null;
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
          Remarks for {leadData.name}
        </h2>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-[#A11C5C] text-lg font-semibold">
              Lead Details
            </h3>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {leadData.name}
              </p>
              <p>
                <strong>Destination:</strong> {leadData.destination}
              </p>
              <p>
                <strong>Budget:</strong> {leadData.budget}
              </p>
              <p>
                <strong>Date:</strong> {leadData.date}
              </p>
              <p>
                <strong>Phone:</strong> {leadData.phone}
              </p>
              <p>
                <strong>Selected Fields:</strong>{" "}
                {Array.isArray(leadData.selectedFields)
                  ? leadData.selectedFields.join(", ")
                  : leadData.selectedFields}
              </p>
              <p>
                <strong>Status:</strong> {leadData.status || "Hot"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[#A11C5C] text-lg font-semibold">Remarks</h3>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Title"
                value={newRemark.title}
                onChange={(e) =>
                  setNewRemark({ ...newRemark, title: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={newRemark.description}
                onChange={(e) =>
                  setNewRemark({ ...newRemark, description: e.target.value })
                }
                className="w-full p-2 border rounded"
                rows={3}
              />
              <button
                disabled={
                  !newRemark.title || !newRemark.description || isSubmitting
                }
                onClick={handleAddRemark}
                className={`py-2 px-4 bg-[#A11C5C] text-white rounded disabled:cursor-not-allowed ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#800F45] "
                }`}
              >
                {isSubmitting ? "Adding..." : "Add Remark"}
              </button>
            </div>

            <div className="space-y-2">
              {remarks.map((remark, index) => (
                <div key={index} className="p-4 bg-white rounded shadow">
                  <p>
                    <strong>{remark.title}</strong>
                  </p>
                  <p>{remark.description}</p>
                  <p className="text-sm text-gray-500">{remark.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemarkPopup;
