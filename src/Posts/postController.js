const Post = require("../model/Post");
const User = require("../model/User");
// Create a new post

const createPost = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    // Create a new post without author first
    const newPost = await Post.create({ title, content, author });

    // Populate the 'author' field to get the name from the User model
    const populatedPost = await newPost.populate("author", "name");

    // Send response with the populated post
    res
      .status(201)
      .json({ newPost: populatedPost, message: "Post created successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};
const allPosts = async (req, res) => {
  //   const { title, content, author } = req.body;
  try {
    const posts = await Post.find()
      .populate("author", "name") // Populate author with user's name
      .populate("comments");
    console.log("all posts are", posts);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};
// logic for single posts
const getSinglePosts = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id)
      .populate("author", "name")
      .populate("comments");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
    console.log(post);
  } catch (error) {
    res.status(500).json({ message: "Error getting post" });
  }
};

// update single post
const updateSinglePosts = async (req, res) => {
  const id = req.params.id;
  const { title, content, author } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true }
    );
    res.json(post);
  } catch (error) {}
};
// delete single post
const deleteSinglePosts = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};
module.exports = {
  createPost,
  allPosts,
  getSinglePosts,
  updateSinglePosts,
  deleteSinglePosts,
};
