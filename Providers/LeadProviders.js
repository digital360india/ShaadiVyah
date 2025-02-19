"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const LeadContext = createContext();

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);

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
      setLeads(prevLeads =>
        prevLeads.map(lead =>
          lead.id === leadId ? { ...lead, ...updateData } : lead
        )
      );
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  useEffect(() => {
    fetchAllLeads();
  }, []);
  return (
    <LeadContext.Provider
      value={{
        leads,
        addLead,
        fetchAllLeads,
        deleteLead,
        updateLead,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLead = () => useContext(LeadContext);
