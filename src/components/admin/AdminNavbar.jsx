// import React from "react";

function AdminNavbar() {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search here"
          className="w-full max-w-xs input input-bordered"
        />
        <div className="flex items-center p-1 w-72">
          <img
            src="https://placehold.co/40x40"
            alt="User avatar"
            className="w-10 h-10 mr-2 rounded-full"
          />
          <div>
            <div className="font-bold">John Doe</div>
            <div className="text-sm text-gray-500">Super admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;
