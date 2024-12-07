import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./comment.css";
const GetComment = ({ id }) => {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${id}/comments`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setComments(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handlelikes = (commentId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [commentId]: (prevLikes[commentId] || 0) + 1,
    }));
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <h2 className="mb-4 text-xl font-bold text-center text-orange-600">
        Comments
      </h2>
      {/* Post container that will expand when comments are added */}
      <div className="p-4 border rounded-lg post-container bg-gray-50">
        <div className="single-post-content">
          {/* Single Post content can go here */}
          <h3 className="font-semibold">Single Post Title</h3>
          <p className="text-sm">Post content...</p>
        </div>

        {/* Dynamic Comments Section */}
        <div className="h-full mt-4 overflow-y-auto ">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md comment hover:shadow-lg"
            >
              {/* Profile Image */}
              <div className="flex items-center justify-center">
                <div className="w-16 overflow-hidden border-2 border-gray-300 rounded-full aspect-square">
                  <img
                    src="/assets/1.jpg"
                    alt={comment.author?.name || "Author"}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Comment Content */}
              <div className="flex flex-col flex-grow gap-2">
                {/* Author and Date */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800">
                    {comment.author?.name || "Anonymous"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.date).toLocaleDateString() || "Date"}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-sm text-gray-600">{comment.content}</p>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button className="text-sm text-blue-500 hover:underline">
                    Reply
                  </button>
                  <button
                    onClick={() => handlelikes(comment._id)}
                    className="flex items-center gap-1 text-gray-600 transition-all hover:text-red-600"
                  >
                    <FaHeart
                      size={16}
                      className={`transition-colors ${
                        likes[comment._id] ? "text-red-600" : "text-gray-400"
                      }`}
                    />
                    <span>{likes[comment._id] || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-center text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetComment;
