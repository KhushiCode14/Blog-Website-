// import React from "react";s

import Admin from "./Admin";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar />
      <Admin />
    </div>
  );
};

export default AdminLayout;
