"use client";
import React, { useState, useEffect } from "react";
import { useLead } from "@/Providers/LeadProviders";

const ReminderPop = ({ isOpen, onClose, leadData }) => {
  const { updateLead } = useLead();
  const [reminder, setReminder] = useState({
    date: "",
    time: "",
    description: "",
  });
  const [hasExistingReminder, setHasExistingReminder] = useState(false);
  const [isReminderSaved, setIsReminderSaved] = useState(false); 

  useEffect(() => {
    if (leadData?.reminder) {
      setReminder(leadData.reminder);
      setHasExistingReminder(true);
      setIsReminderSaved(true); 
    } else {
      setReminder({ date: "", time: "", description: "" });
      setHasExistingReminder(false);
      setIsReminderSaved(false); 
    }
  }, [leadData]);

  if (!isOpen || !leadData) return null;

  const handleInputChange = (field, value) => {
    setReminder((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (closeAfter = false) => {
    if (!reminder.date || !reminder.time || !reminder.description) return;
    
    try {
      await updateLead(leadData.id, { reminder });
      setIsReminderSaved(true); 
      alert("Saved reminder successfully!");
      if (closeAfter) onClose();
    } catch (error) {
      console.error("Error saving reminder:", error);
      alert("Error saving reminder!");
    }
   
  };

  const isFormValid = reminder.date && reminder.time && reminder.description;

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
          Reminder for {leadData.name}
        </h2>

        <div className="flex justify-center items-center gap-10">
          <div className="w-[50%]">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={reminder.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="w-full p-2 border rounded"
                
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Time</label>
              <input
                type="time"
                value={reminder.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className="w-full p-2 border rounded"
                
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Reminder</label>
              <textarea
                value={reminder.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Enter reminder description..."
               
              />
            </div>
          </div>

          <div className="w-[50%]">
            {isReminderSaved && (
              <div className="mt-6 p-4 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Saved Reminder Details</h3>
                <p><strong>Date:</strong> {reminder.date}</p>
                <p><strong>Time:</strong> {reminder.time}</p>
                <p><strong>Description:</strong> {reminder.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 text-white mt-6">
          <button
            onClick={() => handleSave()}
            disabled={!isFormValid}
            className={`px-4 py-2 rounded ${
              !isFormValid
                ? "bg-[#a11c5c8e] cursor-not-allowed"
                : "bg-[#A11C5C] hover:bg-[#a11c5ce1]"
            }`}
          >
            {hasExistingReminder || isReminderSaved ? "Update" : "Save"}
          </button>
          
          <button
            onClick={() => handleSave(true)}
            disabled={!isFormValid}
            className={`px-4 py-2 rounded ${
              !isFormValid
                ? "bg-[#a11c5c8e] cursor-not-allowed"
                : "bg-[#A11C5C] hover:bg-[#a11c5ce1]"
            }`}
          >
            {hasExistingReminder || isReminderSaved ? "Update & Close" : "Save & Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderPop;
