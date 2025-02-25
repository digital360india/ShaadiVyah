"use client";
import React, { useEffect, useRef, useState } from "react";

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
} from "@mui/material";
import { useLead } from "@/Providers/LeadProviders";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EditLeadPopup from "@/components/admin/EditLeadPopup";
import RemarkPopup from "@/components/admin/RemarkPopup";
import ReminderPop from "@/components/admin/ReminderPop";
import AddLeadPopUp from "@/components/admin/AddLeadPopUp";
import AssignLeadMemberPopup from "@/components/admin/AssignLeadMemberPopup";

const LeadsPage = () => {
  const { leads, deleteLead, updateLead } = useLead();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [openMoreMenu, setOpenMoreMenu] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isRemarkPopupOpen, setIsRemarkPopupOpen] = useState(false);
  const [isReminderPopupOpen, setIsReminderPopupOpen] = useState(false);
  const [isAssignLeadMemberPopupOpen, setIsAssignLeadMemberPopupOpen] =
    useState(false);
  const menuRef = useRef(null);

  const handleDelete = async (leadId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (confirmDelete) {
      await deleteLead(leadId);
      setOpenMoreMenu(null);
    }
  };

  const handleUpdateLeadStatus = async (leadId, status) => {
    await updateLead(leadId, { status });
  };

  const handleUpdateLead = (formData) => {
    if (selectedLead) {
      updateLead(selectedLead.id, formData);
    }
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setIsEditPopupOpen(true);
    setOpenMoreMenu(null);
  };

  const handleRemark = (lead) => {
    setSelectedLead(lead);
    setIsRemarkPopupOpen(true);
    setOpenMoreMenu(null);
  };

  const handleReminder = (lead) => {
    setSelectedLead(lead);
    setIsReminderPopupOpen(true);
    setOpenMoreMenu(null);
  };

  const handleAssignLeadMember = async (lead) => {
    setSelectedLead(lead);
    setIsAssignLeadMemberPopupOpen(true);
    setOpenMoreMenu(null);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMoreMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-4 py-8  bg-[url('/images/dashbg1.svg')] w-full h-auto">
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

          <AddLeadPopUp
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
                <strong>Lead Assign Member</strong>
              </TableCell>
              <TableCell className="font-Merriweather text-[#9B1B52]">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead, index) => (
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
                  {lead.assignedmember?.length > 0 ? (
                    <span>
                      {lead.assignedmember
                        .map((member) => member.name)
                        .join(", ") || "Loading..."}
                    </span>
                  ) : (
                    "Not Assigned"
                  )}

                </TableCell>
                <TableCell className="relative">
                  <MoreVertIcon
                    className="cursor-pointer"
                    onClick={() =>
                      setOpenMoreMenu(openMoreMenu === lead.id ? null : lead.id)
                    }
                  />

                  {openMoreMenu === lead.id && (
                    <div
                      ref={menuRef}
                      className={`absolute w-32 bg-white border border-gray-300 rounded-lg shadow-md z-10
                    ${
                      index === leads.length - 1 || index === leads.length - 2
                        ? "bottom-10 right-20"
                        : "top-auto right-20"
                    }`}
                    >
                      <button
                        onClick={() => handleEdit(lead)}
                        className="flex items-center space-x-2 p-3 hover:bg-gray-200 w-full text-left"
                      >
                        <EditIcon className="text-blue-500" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="flex items-center space-x-2 p-3 hover:bg-gray-200 w-full text-left"
                      >
                        <DeleteIcon className="text-red-500" />
                        <span>Delete</span>
                      </button>
                      <button
                        onClick={() => handleRemark(lead)}
                        className="flex items-center space-x-2 p-3 hover:bg-gray-200 w-full text-left"
                      >
                        <CommentIcon className="text-green-500" />
                        <span>Remark</span>
                      </button>
                      <button
                        onClick={() => handleReminder(lead)}
                        className="flex items-center space-x-2 p-3 hover:bg-gray-200 w-full text-left"
                      >
                        <NotificationsActiveIcon className="text-yellow-500" />
                        <span>Reminder</span>
                      </button>
                      <button
                        onClick={() =>
                          handleAssignLeadMember(lead)
                        }
                        className="flex items-center space-x-2 p-3 hover:bg-gray-200 w-full text-left"
                      >
                        <AssignmentIcon className="text-blue" />
                        <span>Assign Lead Member</span>
                      </button>
                    </div>
                  )}
                </TableCell>

                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditLeadPopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        leadData={selectedLead}
        onUpdate={handleUpdateLead}
      />

      {isRemarkPopupOpen && (
        <RemarkPopup
          isOpen={isRemarkPopupOpen}
          onClose={() => setIsRemarkPopupOpen(false)}
          leadData={selectedLead}
        />
      )}

      {isReminderPopupOpen && (
        <ReminderPop
          isOpen={isReminderPopupOpen}
          onClose={() => setIsReminderPopupOpen(false)}
          leadData={selectedLead}
        />
      )}

      {isAssignLeadMemberPopupOpen && (
        <AssignLeadMemberPopup
          isOpen={isAssignLeadMemberPopupOpen}
          onClose={() => setIsAssignLeadMemberPopupOpen(false)}
          leadData={selectedLead}
        />
      )}
    </div>
  );
};

export default LeadsPage;
