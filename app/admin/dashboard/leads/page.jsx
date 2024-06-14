"use client"
import React, { useState, useEffect } from 'react';
import { db } from '@/firebase/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "leads"));
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setLeads(data);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  const deleteLead = async (leadId) => {
    try {
      await deleteDoc(doc(db, "leads", leadId));
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const updateLeadStatus = async (leadId, status) => {
    try {
      await updateDoc(doc(db, "leads", leadId), { status });
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 fixed backdrop-blur-sm">Leads</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20" >
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
      </div>
    </div>
  );
};

export default LeadsPage;
