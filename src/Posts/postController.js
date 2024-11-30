const Post = require("../model/Post");
const createPost = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newPost = await Post.create({ title, content, author });
    // const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};
const allPosts = async () => {
  //   const { title, content, author } = req.body;
  try {
    const posts = await Post.find();
    console.log("all posts are", posts);
  } catch (error) {
    console.log(error);
  }
};
// logic for single posts
const getSinglePosts = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
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
