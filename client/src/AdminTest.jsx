import React, { useEffect } from "react";
import axios from "axios";
import { server } from "./constants/config";

const AdminTest = () => {
  useEffect(() => {
    axios
      .get(`${server}/api/v1/admin/`, { withCredentials: true })
      .then((res) => {
        console.log("Admin API response:", res.data);
      })
      .catch((err) => {
        console.error("Admin API error:", err.response?.data || err.message);
      });
  }, []);

  return (
    <div>
      <h1>Admin API Test</h1>
      <p>Check your browser console for the API response.</p>
    </div>
  );
};

export default AdminTest;
