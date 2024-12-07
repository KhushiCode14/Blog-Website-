// src/components/LoginForm.js
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/AuthSlice";
import { jwtDecode } from "jwt-decode"; // Corrected import

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // List of admin emails
  const adminEmails = ["admin@example.com", "superadmin@example.com"]; // Example email list for admins

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);

      // Get token from the response
      const token = response.data.token;

      // Decode the token to get user details like role
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken); // Check the decoded token

      // Manually assign 'admin' role if email matches the list
      let userRole = decodedToken.role;
      if (adminEmails.includes(email)) {
        userRole = "admin"; // Overwrite role if the email is in the admin list
      }

      // Dispatch the login action with token and role
      dispatch(login({ token, role: userRole }));

      console.log("Role after dispatch:", userRole);

      // Navigate based on the assigned role
      navigate(userRole === "admin" ? "/admin" : "/user");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Failed to log in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-white bg-gray-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 text-orange-600 bg-white rounded-lg shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold text-center">Login</h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-6 text-white bg-orange-600 rounded hover:bg-orange-700"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <span className="font-bold text-orange-600 cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
