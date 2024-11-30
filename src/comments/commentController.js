// controllers/commentController.js
const Comment = require("../model/Comment");
const Post = require("../model/Post");
const User = require("../model/User");

// Create a new comment for a specific post
const createComment = async (req, res) => {
  const { content, authorId } = req.body; // The content of the comment and the author ID
  const { postId } = req.params; // The postId is provided in the URL

  try {
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the author exists
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(400).json({ message: "Author not found" });
    }

    // Create and save the new comment
    const newComment = new Comment({
      content,
      post: postId, // Link the comment to the post
      author: authorId, // Link the comment to the author
    });

    await newComment.save();

    // Populate the author with the name from the User model
    const populatedComment = await newComment.populate("author", "name");

    res.status(201).json({
      message: "Comment created successfully",
      comment: populatedComment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating comment",
      error: error.message,
    });
  }
};

// Get all comments for a specific post
const getComments = async (req, res) => {
  const { postId } = req.params; // The postId is provided in the URL

  try {
    // Find all comments for the specific post and populate the 'author' field
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "name"
    ); // Populate the author with the name from the User model

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "No comments found" });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching comments",
      error: error.message,
    });
  }
};

module.exports = { createComment, getComments };
