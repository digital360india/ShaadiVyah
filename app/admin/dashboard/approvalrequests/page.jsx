'use client'
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase"; 

function ApprovalRequestsPage() { 
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [users, setUsers] = useState({}); 
  useEffect(() => {
    const fetchrequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "approvalrequests"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
        }));
        setApprovalRequests(data[0]);
        fetchUsers();

      } catch (error) {
        console.error("Error fetching amenities: ", error);
      }
    };

  
    fetchrequests();
  }, []);
  const fetchUsers = async () => {
    try {
      const userIds = approvalRequests.map((request) => request.id); 
      const q = query(collection(db, "users"), where("id", "in", userIds)); 
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userData.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}));
      console.log(users);
    } catch (error) {
      console.error("Error fetching Users: ", error);
    }
  };
  


  return (
    <div className="mt-40">
      {approvalRequests.length > 0 ? (
        <ul>
          {approvalRequests.map((request) => (
            <li key={request.id}>
              <div>Request Details: {request.details}</div>
              <div>
                Submitted by: {users[request.userId]?.name || "User not found"}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No approval requests found.</p>
      )}
    </div>
  );
}

export default ApprovalRequestsPage;
