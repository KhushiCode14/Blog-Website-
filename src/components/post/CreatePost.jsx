import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDropzone } from "react-dropzone";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS

const CreatePost = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [title, setTitle] = useState(""); // State for title
  const [description, setDescription] = useState(""); // State for description

  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");
  console.log(userId);
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken?.userId) {
          setUserId(decodedToken.userId);
          fetchUserData(decodedToken.userId);
        }
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, [token]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`/auth/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User Data:", response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  // Dropzone configuration
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".jpg, .jpeg, .png, .pdf",
    onDrop: (files) => {
      const validMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
      const invalidFiles = files.filter(
        (file) => !validMimeTypes.includes(file.type)
      );

      if (invalidFiles.length > 0) {
        setErrorMessage(
          "Invalid file type! Please upload only JPEG, PNG, or PDF files."
        );
        toast.error(
          "Invalid file type! Please upload only JPEG, PNG, or PDF files."
        );
      } else {
        setErrorMessage("");
        setAcceptedFiles((prevFiles) => [...prevFiles, ...files]);
        toast.success("Files successfully uploaded!");
      }
    },
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      toast.error("Title and Description are required!");
      return;
    }
    if (acceptedFiles.length === 0) {
      toast.error("Please upload at least one file!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", description);
    formData.append("author", userId);
    console.log(description, title, userId);
    acceptedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",

        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Post created successfully!");
        // Clear the form fields after success
        setTitle("");
        setDescription("");
        setAcceptedFiles([]);
      } else {
        toast.error(data.message || "Post creation failed.");
      }
    } catch (error) {
      toast.error("Error creating post. Please try again.", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Create a Post</h1>
          <button className="text-gray-500 hover:text-gray-700">
            <Link to="/user">
              <FaTimes />
            </Link>
          </button>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter the title"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
            placeholder="Enter the description"
          ></textarea>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-4">
          <ul className="flex border-b">
            {["upload", "preview", "settings"].map((tab) => (
              <li className="mr-1" key={tab}>
                <button
                  className={`inline-block px-4 py-2 font-semibold ${
                    activeTab === tab
                      ? "text-blue-500 bg-white"
                      : "text-gray-500 bg-gray-200"
                  }`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        {activeTab === "upload" && (
          <div>
            {/* Dropzone Area */}
            <div
              {...getRootProps()}
              className="p-6 mb-4 text-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-500"
            >
              <input {...getInputProps()} />
              <p className="mb-2 text-gray-500">Drop your files here!</p>
              <p className="mb-4 text-gray-500">or</p>
              <button
                className="px-4 py-2 text-white bg-green-500 rounded-lg"
                type="button"
              >
                Add Files
              </button>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="mb-4 text-red-500">{errorMessage}</div>
            )}
          </div>
        )}

        {activeTab === "preview" && (
          <div>
            <h2 className="mb-2 text-lg font-semibold">File Previews</h2>
            {acceptedFiles.length === 0 ? (
              <p className="text-gray-500">No files uploaded yet.</p>
            ) : (
              <ul>
                {acceptedFiles.map((file) => (
                  <li key={file.name} className="mb-2">
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="object-cover w-32 h-32"
                      />
                    ) : (
                      <p>{file.name} (PDF file)</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="mb-2 text-lg font-semibold">Settings</h2>
            {/* Add settings form here */}
          </div>
        )}

        {/* Submit and Cancel Buttons */}
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
            onClick={handleSubmit}
          >
            Submit Post
          </button>
          <a href="#" className="text-gray-500">
            Cancel
          </a>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CreatePost;
