const Comment = require("../model/Comment");
const Post = require("../model/Post");
const User = require("../model/User");

// Create a new comment for a specific post
const createComment = async (req, res) => {
  console.log("Received Request:", req.body);
  console.log("Authorization Header:", req.headers.authorization);
  const { content } = req.body;
  const { postId } = req.params;
  const authorId = req.user?.id || req.body.author; // Fetch author from `req.user` or `req.body`.
  // const authorId = req.user?.id || req.body.author;

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

    // Validate the content
    if (!content || content.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "Content is required and cannot be empty" });
    }

    // Create and save the new comment
    const newComment = new Comment({
      content,
      post: postId,
      author: authorId, // Link the author to the comment
    });

    await newComment.save();

    // Update the Post to include this comment
    post.comments.push(newComment._id);
    await post.save();

    // Populate the author's name
    const populatedComment = await newComment.populate("author", "name");
    console.log("Post ID:", postId);
    console.log("Content:", content);
    console.log("Author ID:", authorId);
    console.log("Authenticated user:", req.user); // Log to verify user info

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
  const { postId } = req.params;

  try {
    // Fetch comments and populate author field with name and email
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "name email"
    );

    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this post" });
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
