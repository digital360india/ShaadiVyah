"use client";
import React, { useState } from "react";

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
import { useLead } from "@/Providers/LeadProviders";
import BiddingCards from "@/components/admin/PopUpBiddingCards";

const LeadsPage = () => {
  const { leads, deleteLead, updateLeadStatus } = useLead();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (leadId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (confirmDelete) {
      await deleteLead(leadId);
    }
  };

  const handleUpdateLeadStatus = async (leadId, status) => {
    await updateLeadStatus(leadId, status);
  };

  return (
    <div className="container mx-auto px-4 py-8  bg-[url('/images/dashbg1.svg')] w-full h-full">
      <div className="flex justify-between">
        {" "}
        <h1 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
          Leads
          <hr className="w-[90px] h-[2px] bg-gradient-border border-0 font-thin space-x-6 mt-2" />
        </h1>
        <div className="mt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#A11C5C] text-white py-2 px-6 rounded font-Merriweather"
          >
            Add Leads
          </button>

          <BiddingCards
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>

      <TableContainer component={Paper} className="border-gradient">
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
                  <TableCell className="font-semibold">{lead.name}</TableCell>
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
                        handleUpdateLeadStatus(lead.id, e.target.value)
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
                      onClick={() => handleDelete(lead.id)}
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
