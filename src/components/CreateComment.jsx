import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure proper import

const CreateComment = ({ id, onNewComment }) => {
  const [comment, setComment] = useState({
    content: "",
    post_id: id,
    author: "",
  });
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token || !userId) {
      console.error("Missing token or userId. Unable to submit comment.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/posts/${id}/comments`,
        {
          content: comment.content,
          author: userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data?.comment) {
        onNewComment(response.data.comment); // Notify parent component
        setComment({ content: "", post_id: id, author: "" }); // Reset form
        console.log("Comment added successfully:", response.data.comment);
      }
    } catch (error) {
      console.error(
        "Error submitting comment:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col chat chat-start">
        <textarea
          className="w-full bg-gray-200 textarea textarea-bordered"
          name="content"
          placeholder="Write a comment..."
          value={comment.content}
          onChange={handleChange}
          required
        />
        <button
          className="mt-2 text-white bg-orange-600 border-none btn hover:text-orange-600 hover:bg-white hover:shadow-slate-700"
          type="submit"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
