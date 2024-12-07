import { Link } from "react-router-dom";

const ContentBanner = () => {
  const handlecreatePost = () => {
    console.log("create post button clicked");
  };
  return (
    <div className="p-4 text-white bg-orange-500 rounded-md">
      <h1 className="w-full text-2xl font-bold text-center">
        Welcome to our blog
      </h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque
        tellus. Sed ut erat non mi gravida malesuada.
      </p>
      <div className="flex justify-center mt-4">
        <button className="px-6 py-2 text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700">
          <Link to="/user/createPost" onClick={handlecreatePost}>
            Add new Post
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ContentBanner;
