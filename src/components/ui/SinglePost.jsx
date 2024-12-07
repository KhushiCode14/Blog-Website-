import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetComment from "../GetComment";
import CreateComment from "../createComment";
import SinglePostSidebar from "../SinglePostSidebar";
import { Img } from "react-image";
import LazyLoad from "react-lazyload";

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/posts/${postId}`
        );
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const data = await response.json();
        setPost(data);
        setComments(data.comments || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <section className="flex flex-col m-auto overflow-hidden bg-white md:flex-row max-w-7xl">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : post ? (
        <div className="flex-1 p-5 overflow-y-auto bg-slate-500">
          <figure className="w-full bg-red-400 h-72">
            <LazyLoad height={200} offset={100}>
              <Img
                src={post.image || "default-image.jpg"}
                alt={post.title}
                loader={<p>Loading...</p>}
                unloader={<p>Image failed to load</p>}
                className="object-cover w-full h-72"
              />
            </LazyLoad>
          </figure>
          <div className="flex flex-col h-auto gap-4">
            <h2 className="text-3xl text-orange-600">{post.title}</h2>
            <p className="text-lg text-gray-600">{post.content}</p>
            <div className="flex items-end justify-between">
              <div>{post.author?.name}</div>
              <div>{new Date(post.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="mt-4">
              <CreateComment id={post._id} onNewComment={handleNewComment} />
            </div>
            <div className="h-full mt-4 overflow-y-auto bg-gray-100 border rounded-md">
              <GetComment comments={comments} id={post._id} />
            </div>
          </div>
        </div>
      ) : (
        <div>Post not found</div>
      )}
      <div className="w-full h-full overflow-y-auto md:w-1/3">
        <SinglePostSidebar />
      </div>
    </section>
  );
};

export default SinglePost;
