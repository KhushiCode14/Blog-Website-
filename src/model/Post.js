// models/Post.js
const mongoose = require("mongoose");

// Define the schema for a post
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Post model using the schema
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
