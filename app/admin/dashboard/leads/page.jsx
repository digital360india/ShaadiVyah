"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get("/api/show-lead");

        setLeads(response.data.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  const deleteLead = async (leadId) => {
    try {
      await axios.delete("/api/show-lead", {
        data: { leadId },
      });

      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const updateLeadStatus = async (leadId, status) => {
    try {
      await axios.put("/api/show-lead", { leadId, status });
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId ? { ...lead, status } : lead
        )
      );
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8  bg-[url('/images/dashbg1.svg')] w-full h-full">
      <h1 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
        Leads
      </h1>
      {/* <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">{lead.name}</h2>
            <p className="text-gray-600 mb-2">Email: {lead.email}</p>
            <p className="text-gray-600 mb-2">Phone: {lead.phone}</p>
            <div className="flex space-x-4">
              <select
                value={lead.status}
                onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                className="bg-gray-100 px-4 py-2 rounded-md"
              >
                <option value="hot">Hot</option>
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
              </select>
              <button
                onClick={() => deleteLead(lead.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div> */}

      <TableContainer
        component={Paper}
        style={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderImage: "linear-gradient(180deg, #BE7318, #EED68A, #BE7217) 1",
        }}
      >
        <div className="h-[80vh] overflow-y-auto">
          <Table className="bg-[#FFF4E8]">
            <TableHead className="sticky top-0 bg-[#FFF4E8] z-10 shadow-md">
              <TableRow>
                <TableCell className="font-Merriweather text-[#9B1B52]">
                  <strong>Name</strong>
                </TableCell>
                <TableCell className="font-Merriweather text-[#9B1B52]">
                  <strong>Destination</strong>
                </TableCell>
                <TableCell className="font-Merriweather text-[#9B1B52]">
                  <strong>Budget</strong>
                </TableCell>
                <TableCell className="font-Merriweather text-[#9B1B52]">
                  <strong>Date</strong>
                </TableCell>
                <TableCell className="font-Merriweather text-[#9B1B52]">
                  <strong>Selected Fields</strong>
                </TableCell>
                <TableCell className="font-Merriweather text-[#9B1B52]">
                  <strong>Phone</strong>
                </TableCell>
                <TableCell className="font-Merriweather text-[#9B1B52]">
                  <strong>Status</strong>
                </TableCell>
                <TableCell className="font-Merriweather text-[#9B1B52]">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.destination}</TableCell>
                  <TableCell>{lead.budget}</TableCell>
                  <TableCell>{lead.date}</TableCell>
                  <TableCell className="px-4 py-2 w-40">
                    {Array.isArray(lead.selectedFields)
                      ? lead.selectedFields.join(", ")
                      : lead.selectedFields}
                  </TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <Select
                      value={lead.status || "hot"}
                      onChange={(e) =>
                        updateLeadStatus(lead.id, e.target.value)
                      }
                      size="big"
                      className="w-full h-[40px]"
                    >
                      <MenuItem value="hot">Hot</MenuItem>
                      <MenuItem value="warm">Warm</MenuItem>
                      <MenuItem value="cold">Cold</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteLead(lead.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </div>
  );
};

export default LeadsPage;
