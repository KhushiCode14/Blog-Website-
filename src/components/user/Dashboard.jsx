import { Link, Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";
// import { useSelector } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  // Get the token from localStorage
  const token = localStorage.getItem("token");
  console.log("token: " + token);
  // If the token exists, decode it to get the userId
  let userId = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log("decodedToken :", decodedToken);
      userId = decodedToken.userId;
      console.log("userId" + userId); // Extract userId from the token
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  // Fetch user-specific data or use the userId for subsequent API requests
  useEffect(() => {
    if (userId) {
      // Fetch user data using the userId
      fetchUserData(userId);
    }
  }, [userId]);

  const fetchUserData = async (userId) => {
    const response = await fetch(`/auth/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authorization
      },
    });
    const data = await response.json();
    console.log("User Data:", data); // Use the user data to populate the dashboard
  };
  return (
    <div className="flex h-screen bg-slate-800 ">
      {/* Sidebar */}
      <div className="w-64 text-white bg-gray-800">
        <div className="flex justify-center py-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <ul className="px-6 space-y-4">
          {/* Ensure the Link components use 'block' and have padding and hover effects */}
          <li>
            <Link
              to="/"
              className="block py-2 rounded-lg cursor-pointer hover:bg-gray-700"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={`/user/postsDetail`}
              className="block py-2 rounded-lg cursor-pointer hover:bg-gray-700"
            >
              Post
            </Link>
          </li>
          {/* <Link
            to={`/posts//comments`}
            className="py-2 rounded-lg cursor-pointer hover:bg-gray-700"
          >
            Comment
          </Link> */}
          <li className="py-2 rounded-lg cursor-pointer hover:bg-gray-700">
            Profile
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 rounded-md">
        {/* Navbar */}
        <div className="">
          <UserNavbar />
        </div>
        <div className="flex flex-1 p-6 m-4 space-x-6 rounded-2xl bg-slate-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
