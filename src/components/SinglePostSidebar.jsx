import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SinglePostSidebar = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/posts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <aside className="h-full p-6 bg-gradient-to-b from-orange-50 to-orange-100">
      <h1 className="mb-6 text-3xl font-bold text-center text-orange-600">
        Latest Posts
      </h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <motion.li
            key={post._id}
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-500">{post.author?.name}</p>
          </motion.li>
        ))}
      </ul>
    </aside>
  );
};

export default SinglePostSidebar;
