// import React from "react";
import { useEffect, useState } from "react";
// import AllPostList from "./AllUsers";

import Card from "./Card";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
// import UserList from "./UserList";
// import RecentProjects from "./RecentProjects";
// import NewCustomers from "./NewCustomers";

function AdminDashboard() {
  const [count, setCount] = useState(0);
  const [post, setPost] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/auth/count`);
      setCount(response.data.count);
      console.log(response);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user count.");
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/postcount`);
      setPost(response.data.count);
      console.log(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch post count.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
      await fetchPosts();
    };
    fetchData();
  }, []);
  const handleNavigateToUser = () => {
    // window.location.href = "/users";
    navigate("/admin/userdetail");
  };
  const handleNavigateToPosts = () => {
    navigate("/admin/postdetail");
  };
  return (
    <div className="h-auto overflow-y-auto">
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <button onClick={handleNavigateToUser}>
          <Card title="Users" count={count} icon="users" />
        </button>
        <button onClick={handleNavigateToPosts}>
          <Card title="Posts" count={post} icon="tasks" />
        </button>
        <Card title="Orders" count="124" icon="shopping-cart" />
        <Card title="Income" count="$6k" icon="wallet" highlight />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* <RecentProjects /> */}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
