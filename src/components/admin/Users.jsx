import axios from "axios";
import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchAllpost = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts/");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchAllpost();
  }, []);

  return (
    <section className="container px-4 py-16 mx-auto">
      <h2 className="mb-8 text-2xl font-bold">Recent Blog Posts</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="overflow-hidden bg-white rounded-lg shadow"
            >
              {/* Placeholder image */}
              <img
                src="https://placehold.co/400x300"
                alt={post.title || "Post Image"}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {post.title || "Untitled"}
                </h3>
                <p className="mt-2 text-gray-600">
                  {post.content || "No content available."}
                </p>
                <div className="flex items-center mt-4">
                  {/* Placeholder for author image */}
                  <img
                    src="https://placehold.co/32x32"
                    alt={post.author?.name || "Unknown Author"}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="ml-2">
                    <p className="text-gray-700">
                      {post.author?.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString() ||
                        "Unknown date"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </section>
  );
};

export default Posts;
