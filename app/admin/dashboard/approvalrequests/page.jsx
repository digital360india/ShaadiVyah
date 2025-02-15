"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function ApprovalRequestsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchApprovalRequests = async () => {
    try {
      const approvalRequestsSnapshot = await getDocs(
        collection(db, "approvalrequests")
      );
      const approvalRequests = approvalRequestsSnapshot.docs.map((doc) =>
        doc.data()
      );

      const uids = approvalRequests.map((request) => request.uid);
      console.log(uids);
      if (uids.length > 0) {
        const userPromises = uids.map(async (uid) => {
          const usersQuery = query(
            collection(db, "users"),
            where("uid", "==", uid)
          );
          const usersSnapshot = await getDocs(usersQuery);

          return usersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        });
        const usersLists = await Promise.all(userPromises);
        const mergedUsers = usersLists.flat();
        setUsers(mergedUsers);
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
          rejectionTimestamp: null,
        });
        alert("User approved successfully!");
      } else {
        setShowReasonDialog(true);
        setSelectedUser(userId);
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, approval: isApproved, rejected: !isApproved }
            : user
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
        rejectionTimestamp: serverTimestamp(),
      });
      setShowReasonDialog(false);
      setSelectedUser(null);
      setRejectionReason("");
      fetchApprovalRequests();
    } catch (error) {
      console.error("Error updating user rejection status: ", error);
    }
  };

  const handleReasonDialogClose = () => {
    setShowReasonDialog(false);
    setSelectedUser(null);
    setRejectionReason("");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // console.log(users);
  return (
    // <div className="container mx-auto px-4 py-8 bg-[url('/images/dashbg1.svg')] w-full h-full ">
    //   <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather ">Approval Requests</h1>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //     {users.map((user) => (
    //       <div key={user.id} className="border border-gray-200 bg-[#FFF4E8]  rounded-md p-4">
    //         <p className="font-semibold">Name: {user.name}</p>
    //         <p className="text-gray-600">Email: {user.email}</p>

    //         <p className="mt-2">Approval Status: {user.approval ? 'Approved' : 'Pending'}</p>
    //         <div className="flex justify-end mt-4">
    //           <button onClick={() => handleApprovalChange(user.id, true)} className="bg-green-500 text-white px-3 py-1 rounded-md mr-2">Approve</button>
    //           <button onClick={() => handleApprovalChange(user.id, false)} className="bg-red-500 text-white px-3 py-1 rounded-md">Reject</button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   {showReasonDialog && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
    //       <div className="bg-white p-6 rounded-md w-96">
    //         <h2 className="text-lg font-semibold mb-4">Reason for Rejection</h2>
    //         <textarea
    //           value={rejectionReason}
    //           onChange={(e) => setRejectionReason(e.target.value)}
    //           className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md mb-4"
    //           placeholder="Enter reason for rejection..."
    //         ></textarea>
    //         <div className="flex justify-end">
    //           <button onClick={handleReasonDialogClose} className="text-gray-500 mr-4">Cancel</button>
    //           <button onClick={handleRejectionSubmit} className="bg-red-500 text-white px-3 py-1 rounded-md">Submit</button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="container mx-auto px-4 py-8  bg-[url('/images/dashbg1.svg')] w-full h-full ">
      <h1 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#BE7318] via-[#EED68A] to-[#BE7217] font-Merriweather">
        Approval Requests
        <hr className="w-[300px] h-[2px] bg-gradient-border border-0 font-thin space-x-6 mt-2" />

      </h1>
      <TableContainer
        component={Paper}
        style={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderImage: "linear-gradient(180deg, #BE7318, #EED68A, #BE7217) 1",
        }}
      >
        <div className="h-[80vh] overflow-y-auto">
          <Table>
            <TableHead className="sticky top-0 bg-[#FFF4E8] z-10 shadow-md">
              <TableRow  >
                <TableCell>
                  <strong  className="font-Merriweather text-[#9B1B52]">Name</strong>
                </TableCell >
                <TableCell>
                  <strong  className="font-Merriweather text-[#9B1B52]">Email</strong>
                </TableCell>
                <TableCell>
                  <strong  className="font-Merriweather text-[#9B1B52]">Approval Status</strong>
                </TableCell>
                <TableCell align="center" >
                  <strong className="font-Merriweather text-[#9B1B52]">Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.approval ? "Approved" : "Pending"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApprovalChange(user.id, true)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleApprovalChange(user.id, false)}
                      style={{ marginLeft: "8px" }}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TableContainer>

      <Dialog
        open={showReasonDialog}
        onClose={() => setShowReasonDialog(false)}
      >
        <DialogTitle>Reason for Rejection</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter reason for rejection..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReasonDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleRejectionSubmit}
            color="error"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ApprovalRequestsPage;
