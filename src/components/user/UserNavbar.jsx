import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBell, FaSearch } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { login } from "../../redux/AuthSlice"; // Import the actions
import axios from "axios";
import { toast } from "react-toastify"; // Import toast for error/success notifications

const UserNavbar = () => {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const { token, role, isAuthenticated, name, email } = useSelector(
    (state) => state.auth
  );
  const fetchPosts = async () => {
    // const userId = localStorage.getItem("userId");
    const response = await axios.get("http://localhost:3000/api/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const allPosts = response.data;

    setSearch(allPosts);
  };

  useEffect(() => {
    fetchPosts();
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedToken = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!storedToken) {
          throw new Error("No token found. Please log in again.");
        }
        const response = await axios.get(
          "http://localhost:3000/auth/userdata",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (response.status === 200 && response.data && response.data.user) {
          const { name, email } = response.data.user;
          console.log("Fetched User Data:", response.data);
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          console.log("Token:", token);

          dispatch(login({ token: storedToken, name, email, role: "User" }));
        } else {
          throw new Error(
            "Unexpected response structure or missing user data."
          );
        }
      } catch (error) {
        if (error.response) {
          // Handle user not found
          if (error.response.status === 404) {
            toast.error("User not found. Please log in again.", {
              position: "top-right",
            });
          } else {
            toast.error(
              `Server Error: ${
                error.response.data?.message || error.response.statusText
              }`,
              { position: "top-right" }
            );
          }
        } else if (error.request) {
          toast.error("Network error. Please check your internet connection.", {
            position: "top-right",
          });
        } else {
          toast.error(`Error: ${error.message}`, {
            position: "top-right",
          });
        }
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [dispatch, isAuthenticated, token]);

  return (
    <div className="flex items-center justify-between p-4 text-white bg-gray-800 shadow-md">
      <div>
        <label className="flex items-center gap-2 input input-bordered">
          <FaSearch size={25} />
          <input
            type="search"
            id="search"
            value={search}
            className="p-2 bg-gray-500 search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </label>
      </div>
      <div className="flex gap-2">
        <button className="text-white btn">
          <FaBell />
        </button>
        <button className="text-white btn">
          <FaMessage />
        </button>
      </div>

      {/* Conditional rendering based on authentication state */}
      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <span className="text-white">{role}</span> {/* Display role */}
          <span className="text-white">{name}</span> {/* Display name */}
          <span className="text-white">{email}</span> {/* Display email */}
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNavbar;
