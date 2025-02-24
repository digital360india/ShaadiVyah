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
} from "@mui/material";
import { useLead } from "@/Providers/LeadProviders";

import AddTeamMemberPopUp from "@/components/admin/AddTeamMemberPopup";

const LeadsPage = () => {
  const { teammembers } = useLead();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="px-4 py-8  bg-[url('/images/dashbg1.svg')] w-full h-auto">
      <div className="flex justify-between">
        {" "}
        <h1 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
          Team Members
          <hr className="w-[250px] h-[2px] bg-gradient-border border-0 font-thin space-x-6 mt-2" />
        </h1>
        <div className="mt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#A11C5C] text-white py-2 px-6 rounded font-Merriweather"
          >
            Add Team Members
          </button>

          <AddTeamMemberPopUp
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>

      <TableContainer component={Paper} className="  bg-[#FFF4E8]">
        <Table className="">
          <TableHead className="sticky top-0  bg-[#FFF4E8] z-10 shadow-md">
            <TableRow>
              <TableCell className="font-Merriweather text-[#9B1B52]">
                <strong>Name</strong>
              </TableCell>
              <TableCell className="font-Merriweather text-[#9B1B52]">
                <strong>Email</strong>
              </TableCell>
              <TableCell className="font-Merriweather text-[#9B1B52]">
                <strong>Phone</strong>
              </TableCell>
              <TableCell className="font-Merriweather text-[#9B1B52]">
                <strong>Role</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teammembers.map((teammembers, index) => (
              <TableRow key={teammembers.id}>
                <TableCell className="font-semibold">
                  {teammembers.name}
                </TableCell>
                <TableCell>{teammembers.email}</TableCell>
                <TableCell>{teammembers.phone}</TableCell>
                <TableCell>{teammembers.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeadsPage;
