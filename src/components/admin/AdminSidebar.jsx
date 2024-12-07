// import React from "react";

import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="w-64 p-4 text-white bg-pink-600">
      <div className="mb-8 text-2xl font-bold">Accusoft</div>
      <ul className="menu">
        <li className="mb-4">
          <Link className="flex items-center" to="/admin">
            <i className="mr-2 fas fa-users"></i>
            Dashboard
          </Link>
        </li>{" "}
        <li className="mb-4">
          <Link className="flex items-center" to="/admin/userdetail">
            <i className="mr-2 fas fa-users"></i>
            Users
          </Link>
        </li>{" "}
        <li className="mb-4">
          <Link className="flex items-center" to="/admin/postdetail">
            <i className="mr-2 fas fa-users"></i>
            Posts
          </Link>
        </li>{" "}
        <li className="mb-4">
          <Link className="flex items-center" to="/admin/postdetail">
            <i className="mr-2 fas fa-users"></i>
            PostNew
          </Link>
        </li>
        <li className="mb-4">
          <a className="flex items-center">
            <i className="mr-2 fas fa-boxes"></i>
            Inventory
          </a>
        </li>
        <li className="mb-4">
          <a className="flex items-center">
            <i className="mr-2 fas fa-wallet"></i>
            Accounts
          </a>
        </li>
        <li className="mb-4">
          <a className="flex items-center">
            <i className="mr-2 fas fa-tasks"></i>
            Tasks
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
