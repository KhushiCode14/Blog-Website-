import { AiTwotoneLike } from "react-icons/ai";
import { FaDollarSign, FaEye } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const ContentPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken?.userId) {
          setUserId(decodedToken.userId);
        }
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, [token]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allPosts = response.data;
      const userPosts = allPosts.filter((post) => post.author?._id === userId);
      setPosts(userPosts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-3 mt-3 text-gray-800 bg-[#F3F6FF] rounded-xl">
      <div className="space-y-4 rounded-xl">
        <div className="flex items-center justify-between text-3xl font-bold">
          My Posts
        </div>
        {posts.length === 0 ? (
          <div className="text-gray-600">No posts available.</div>
        ) : (
          posts.map((post, index) => (
            <div
              className="flex flex-col items-center justify-between p-4 bg-white border-2 rounded-lg shadow-md md:flex-row border-orange-950"
              key={post._id}
            >
              {/* Numbering */}
              <div className="text-xl font-bold text-gray-700">
                {index + 1}.
              </div>
              <div className="flex flex-col items-center text-center md:w-1/4">
                <div className="w-16 h-16 mb-2">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center text-start md:w-1/2">
                <div className="mb-2 text-xl font-semibold">{post.title}</div>
                <div className="text-sm text-gray-600">{post.content}</div>
                <div className="text-start">
                  {new Date(post.createdAt).toLocaleDateString()} ||{" "}
                  {new Date(post.updatedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-4 text-gray-600 md:w-1/4 md:mt-0">
                <div className="flex items-center">
                  <FaEye className="mr-1 text-xl" />
                  56
                </div>
                <div className="flex items-center">
                  <AiTwotoneLike className="mr-1 text-xl" />
                  56
                </div>
                <div className="flex items-center">
                  <FaDollarSign className="mr-1 text-xl" />
                  56
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentPost;
