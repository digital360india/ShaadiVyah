"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [teammembers, setTeamMembers] = useState([]);

  const addLead = async (formData) => {
    try {
      const response = await axios.post("/api/add-lead", formData);
      if (response.status === 200) {
        setLeads((prevLeads) => [
          ...prevLeads,
          { id: response.data.id, ...formData },
        ]);
        return {
          success: true,
          message: "Form submitted successfully!",
          id: response.data.id,
        };
      } else {
        return { success: false, message: "Something went wrong" };
      }
    } catch (error) {
      console.error("Error adding lead:", error);
      return { success: false, message: error.message };
    }
  };

  const fetchAllLeads = async () => {
    try {
      const response = await axios.get("/api/show-lead");

      setLeads((prevLeads) => {
        return JSON.stringify(prevLeads) === JSON.stringify(response.data.data)
          ? prevLeads
          : response.data.data;
      });
    } catch (error) {
      console.error("Error fetching leads:", error);
      return [];
    }
  };

  const deleteLead = async (leadId) => {
    try {
      await axios.delete("/api/delete-lead", {
        data: { leadId },
      });

      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const updateLead = async (leadId, updateData) => {
    try {
      await axios.put("/api/update-lead", { leadId, ...updateData });
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId ? { ...lead, ...updateData } : lead
        )
      );
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };


  // email otp verification
  const emailOTPVerification = async (email) => {
    try {
      const response = await axios.post("/api/send-email", { email });
  
      if (response.status === 200) {
        return {
          success: true,
          message: "OTP sent successfully!",
          otp: response.data.otp,
        };
      } else {
        return { success: false, message: "Something went wrong" };
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      return { success: false, message: error.message };
    }
  };

  
  // Team Members

  const addTeamMember = async (formData) => {
    try {
      const response = await axios.post("/api/add-team-member", formData);
      if (response.status === 200) {
        setTeamMembers((prevMembers) => [
          ...prevMembers,
          { id: response.data.id, ...formData },
        ]);
        return {
          success: true,
          message: "Team Member created successfully!",
          id: response.data.id,
        };
      } else {
        return { success: false, message: "Something went wrong" };
      }
    } catch (error) {
      console.error("Error adding team member:", error);
      return { success: false, message: error.message };
    }
  };

  const fetchAllTeamMembers = async () => {
    try {
      const response = await axios.get("/api/show-team-member");

      setTeamMembers((prevMembers) => {
        return JSON.stringify(prevMembers) ===
          JSON.stringify(response.data.data)
          ? prevMembers
          : response.data.data;
      });
    } catch (error) {
      console.error("Error fetching team members:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchAllTeamMembers();
    // fetchAllLeads();
  }, []);

  return (
    <LeadContext.Provider
      value={{
        leads,
        teammembers,
        emailOTPVerification,
        addLead,
        fetchAllLeads,
        deleteLead,
        updateLead,
        addTeamMember,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLead = () => useContext(LeadContext);
