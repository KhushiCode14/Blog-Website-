import axios from "axios";
import { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]); // State for user data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/alluser"); // Fetch user data
      setUsers(response.data); // Set fetched data to state
      setLoading(false); // Turn off loading indicator
      console.log("Users fetched:", response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load user data.");
      setLoading(false); // Turn off loading indicator
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/auth/user/${userId}`); // Delete user by ID
      setUsers(users.filter((user) => user._id !== userId)); // Update state to remove deleted user
      console.log("User deleted:", userId);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array ensures it runs only once

  if (loading) return <p>Loading...</p>; // Show loading indicator
  if (error) return <p className="text-red-500">{error}</p>; // Show error message
  return (
    <div className="p-4">
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-md shadow-sm"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Role:</strong> {user.role}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Posts:</strong> {user.posts.length || 0}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Created At:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Updated At:</strong>{" "}
                {new Date(user.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => deleteUser(user._id)}
              className="px-4 py-2 text-white bg-red-500 rounded-md shadow hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No users found.</p>
      )}
    </div>
  );
};

export default UserList;
