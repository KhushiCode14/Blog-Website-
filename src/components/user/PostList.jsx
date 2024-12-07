import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");
  const loggedInUserId = "674d53d2ca2daa61b59c301c"; // Replace with actual logged-in user ID

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      // Filter posts created by the logged-in user
      const userPosts = data.filter(
        (post) => post.author._id === loggedInUserId
      );
      setPosts(userPosts);
    } catch (error) {
      setError(error.message);
    }
  };

  // Update a post
  const handleUpdatePost = async (postId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      console.log({ postId, updatedData });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Failed to update post with ID ${postId}: ${errorData.message}`,
          {
            position: "top-right",
          }
        );
        return;
      }
      console.log(await response.json());

      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );
      setEditingPost(null);
      setUpdatedContent("");
      toast.success(`Post with ID ${postId} updated successfully!`, {
        position: "top-right",
      });
    } catch {
      toast.error("An error occurred while updating the post.", {
        position: "top-right",
      });
    }
  };

  // Delete a post
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
        toast.success("Post deleted successfully!", {
          position: "top-right",
        });
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete post: ${errorData.message}`, {
          position: "top-right",
        });
      }
    } catch {
      toast.error("Error deleting the post.", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container p-6 mx-auto">
      <ToastContainer />
      <h1 className="mb-6 text-2xl font-bold text-center">My Posts</h1>
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post._id}
            className="flex flex-col p-4 space-y-2 bg-white rounded-md shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {post.title}
            </h2>
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-56 rounded-md"
              />
            )}
            {editingPost === post._id ? (
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Update content here..."
              />
            ) : (
              <p className="text-gray-600">{post.content}</p>
            )}
            <div className="space-x-2">
              {editingPost === post._id ? (
                <>
                  <button
                    onClick={() =>
                      handleUpdatePost(post._id, {
                        title: post.title,
                        content: updatedContent,
                      })
                    }
                    className="px-4 py-2 text-white transition bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingPost(null)}
                    className="px-4 py-2 text-white transition bg-gray-400 rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingPost(post._id);
                      setUpdatedContent(post.content); // Load current content for editing
                    }}
                    className="px-4 py-2 text-white transition bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="px-4 py-2 text-white transition bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
