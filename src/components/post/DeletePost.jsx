import React from "react";

const DeletePost = ({ postId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Call the delete function passed as a prop if the delete was successful
        if (onDelete) {
          onDelete(postId);
        }
        console.log(`Post with ID ${postId} deleted successfully.`);
      } else {
        console.error(`Failed to delete post with ID ${postId}.`);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  );
};

export default DeletePost;
