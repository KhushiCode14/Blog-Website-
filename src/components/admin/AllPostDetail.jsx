import axios from "axios";
import { useState, useEffect } from "react";

const AllPostDetail = () => {
  const [posts, setPosts] = useState([]); // State for posts data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [editingPostId, setEditingPostId] = useState(null); // State for editing a specific post
  const [editForm, setEditForm] = useState({ title: "", content: "" }); // State for edit form data

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/posts");
      setPosts(response.data); // Set fetched posts data
      setLoading(false);
      console.log("Posts fetched:", response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts.");
      setLoading(false);
    }
  };

  // Delete a post by ID
  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId)); // Remove deleted post from state
      console.log("Post deleted:", postId);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  // Start editing a post
  const startEditing = (post) => {
    setEditingPostId(post._id);
    setEditForm({ title: post.title, content: post.content });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingPostId(null);
    setEditForm({ title: "", content: "" });
  };

  // Update a post
  const updatePost = async (postId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/posts/${postId}`,
        editForm
      );
      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, ...response.data } : post
        )
      );
      setEditingPostId(null);
      setEditForm({ title: "", content: "" });
      console.log("Post updated:", response.data);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Fetch posts on component mount

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p className="text-red-500">{error}</p>; // Show error message

  return (
    <div className="p-4">
      <h1 className="p-5 text-3xl font-bold text-gray-900 bg-slate-500 rounded-2xl w-fit">
        Post List
      </h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col p-4 mb-4 bg-gray-100 rounded-md shadow-sm"
          >
            {editingPostId === post._id ? (
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Edit title"
                />
                <textarea
                  value={editForm.content}
                  onChange={(e) =>
                    setEditForm({ ...editForm, content: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded"
                  placeholder="Edit content"
                ></textarea>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updatePost(post._id)}
                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    <strong>Content:</strong> {post.content}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Author:</strong> {post.author?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Created At:</strong>{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Updated At:</strong>{" "}
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(post)}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(post._id)}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No posts found.</p>
      )}
    </div>
  );
};

export default AllPostDetail;
