import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from API
  const fetchPost = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/posts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("this is all post data fetch :", data);
      // console.log("post image not fetch", posts.image);

      setPosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPost();
  }, []); // Empty dependency array ensures this runs only once

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <section className="m-auto bg-white max-w-7xl">
      {loading ? (
        <div>Loading...</div> // Display loading message while fetching
      ) : error ? (
        <div>Error: {error}</div> // Display error if the fetch fails
      ) : (
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          // key={posts.id}
        >
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className=" card w-96" key={post._id}>
                <figure>
                  <img
                    src={
                      post.image ||
                      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    }
                    alt={post.title}
                    className="object-cover w-full h-48"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="text-orange-600 card-title">{post.title}!</h2>
                  <p className="overflow-hidden">{post.content}</p>
                  <div className="flex card-content">
                    {/* Render the author's name correctly */}
                    <img
                      src={post.author?.image || "default-author-image.jpg"}
                      alt="Author"
                    />
                    <div>{post.author?.name}</div>{" "}
                    {/* Access the name property */}
                    <div>{formatDate(post.createAt)}</div>
                  </div>
                  <Link
                    to={`/posts/${post._id || ""}`}
                    className="justify-end card-actions"
                  >
                    <button className="btn btn-primary">Read More</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div>No posts available</div> // Display message if no posts are available
          )}
        </div>
      )}
    </section>
  );
};

export default AllPost;
