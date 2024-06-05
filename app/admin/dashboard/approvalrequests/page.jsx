'use client';
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

function ApprovalRequestsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');


    const fetchApprovalRequests = async () => {
      try {
        const approvalRequestsSnapshot = await getDocs(
          collection(db, "approvalrequests")
        );
        const approvalRequests = approvalRequestsSnapshot.docs.map((doc) =>
          doc.data()
        );

        const uids = approvalRequests.map((request) => request.id);
        console.log(uids);
        if (uids.length > 0) {
          const usersQuery = query(
            collection(db, "users"),
            where("uid", "in", uids)
          );
          const usersSnapshot = await getDocs(usersQuery);
          const usersList = usersSnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          setUsers(usersList);
        }
      } catch (error) {
        console.error("Error fetching approval requests or users: ", error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchApprovalRequests();
  }, []);

  const handleApprovalChange = async (userId, isApproved) => {
    try {
      if (isApproved) {
        await updateDoc(doc(db, "users", userId), {
          approval: true,
          rejected: false,
          rejectionReason: null,
          rejectionTimestamp: null
        });
      } else {
        setShowReasonDialog(true);
        setSelectedUser(userId);
      }

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, approval: isApproved, rejected: !isApproved } : user
        )
      );

      await deleteDoc(doc(db, "approvalrequests", userId));
      fetchApprovalRequests();
    } catch (error) {
      console.error("Error updating user approval status: ", error);
    }
  };

  const handleRejectionSubmit = async () => {
    try {
      await updateDoc(doc(db, "users", selectedUser), {
        approval: false,
        rejected: true,
        rejectionReason: rejectionReason,
        rejectionTimestamp: serverTimestamp()
      });
      setShowReasonDialog(false);
      setSelectedUser(null);
      setRejectionReason('');
      fetchApprovalRequests();
    } catch (error) {
      console.error("Error updating user rejection status: ", error);
    }
  };

  const handleReasonDialogClose = () => {
    setShowReasonDialog(false);
    setSelectedUser(null);
    setRejectionReason('');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Approval Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border border-gray-200 rounded-md p-4">
            <p className="font-semibold">Name: {user.name}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="mt-2">Approval Status: {user.approval ? 'Approved' : 'Pending'}</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => handleApprovalChange(user.id, true)} className="bg-green-500 text-white px-3 py-1 rounded-md mr-2">Approve</button>
              <button onClick={() => handleApprovalChange(user.id, false)} className="bg-red-500 text-white px-3 py-1 rounded-md">Reject</button>
            </div>
          </div>
        ))}
      </div>
      {showReasonDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-4">Reason for Rejection</h2>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter reason for rejection..."
            ></textarea>
            <div className="flex justify-end">
              <button onClick={handleReasonDialogClose} className="text-gray-500 mr-4">Cancel</button>
              <button onClick={handleRejectionSubmit} className="bg-red-500 text-white px-3 py-1 rounded-md">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApprovalRequestsPage;
