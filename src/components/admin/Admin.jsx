// import React from "react";
import AdminNavbar from "./AdminNavbar";
import AdminDashboard from "./AdminDashboard";

function Admin() {
  return (
    <div className="flex-1 h-auto p-6 overflow-y-auto">
      <AdminNavbar />
      <AdminDashboard />
    </div>
  );
}

export default Admin;
