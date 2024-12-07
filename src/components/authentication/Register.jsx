import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state for error handling
  const [file, setFile] = useState(null); // File state for Dropzone

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("name", name);
      if (file) {
        formData.append("profilePicture", file);
      }

      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("token", response.data.token);

      if (response.data.message === "User registered successfully") {
        toast.success("Registered successfully!");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed.");
      toast.error("Registration failed!");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
    multiple: false,
    accept: "image/*",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-600 to-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 text-orange-600 bg-white rounded-lg shadow-lg"
      >
        <h2 className="mb-4 text-2xl font-bold text-center text-orange-600">
          Register
        </h2>
        {error && <div className="mb-4 text-center text-red-600">{error}</div>}{" "}
        {/* Display error */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-orange-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            required
          />
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
          {/* Dropzone for file upload */}
          <div
            {...getRootProps()}
            className="w-full p-4 text-center border-2 border-orange-600 border-dashed rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-600"
          >
            <input {...getInputProps()} />
            {file ? (
              <p className="text-orange-600">File: {file.name}</p>
            ) : (
              <p className="text-gray-500">
                Drag & drop a profile picture or click to select one
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-6 text-white bg-orange-600 rounded hover:bg-orange-700"
        >
          Register
        </button>
        <p className="mt-4 text-center text-orange-600">
          Already have an account?{" "}
          <span className="font-bold cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Register;
