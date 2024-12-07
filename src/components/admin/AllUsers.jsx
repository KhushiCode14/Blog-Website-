// import React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaMoneyBill } from "react-icons/fa";

const AllPostList = () => {
  const [posts, setPosts] = useState();
  const fetchAllpost = async () => {
    const response = await axios.get("http://localhost:3000/api/posts/");
    const data = await response.data;
    console.log(data);
    setPosts(data);
  };
  useEffect(() => {
    fetchAllpost();
  }, []);
  return (
    <div className="h-auto">
      <div className="flex flex-col gap-4">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Trending Posts
        </h2>

        {posts &&
          posts.map((post) => {
            return (
              <div
                className="flex items-center p-4 space-x-4 text-white transition duration-300 bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700 "
                key={post._id}
              >
                <div className="text-4xl">
                  <FaMoneyBill />
                </div>
                <div>
                  <h2>{post.author?.name}</h2>
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <h4 className="text-sm font-medium">{post.content}</h4>
                </div>
                {/* <div>{post.createdAt}</div> */}
              </div>
            );
          })}

        {/* Add any other content here if needed */}
      </div>
    </div>
  );
};

export default AllPostList;
