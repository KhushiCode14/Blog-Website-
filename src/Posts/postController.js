const Post = require("../model/Post");
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");

const isValidObjectId = mongoose.Types.ObjectId.isValid;

// Create a new post
const createPost = async (req, res) => {
  const { title, content, author } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "posts",
      public_id: "post_" + Date.now(),
    });
    const imageUrl = uploadResult.secure_url;
    console.log("Uploaded Image URL:", imageUrl.secure_url);

    // Create the post
    const newPost = await Post.create({
      title,
      content,
      author,
      comments: [],
      image: imageUrl, // Store Cloudinary URL
    });

    const populatedPost = await newPost.populate("author", "name");
    res.status(201).json({
      postId: populatedPost._id,
      newPost: populatedPost,
      uploadResult: imageUrl,
      message: "Post created successfully!",
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

// Get all posts
const allPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .populate("comments");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// Get a single post
const getSinglePosts = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    const post = await Post.findById(id)
      .populate("author", "name")
      .populate("comments");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Error fetching post" });
  }
};

// Update a post
const updateSinglePosts = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true }
    ).populate("author", "name");
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Error updating post" });
  }
};

// Delete a post
const deleteSinglePosts = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Error deleting post" });
  }
};

// Count posts
const postCount = async (req, res) => {
  try {
    const count = await Post.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Error counting posts:", error);
    res.status(500).json({ message: "Error counting posts" });
  }
};

module.exports = {
  createPost,
  allPosts,
  getSinglePosts,
  updateSinglePosts,
  deleteSinglePosts,
  postCount,
};
