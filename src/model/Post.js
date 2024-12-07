// models/Post.js
const mongoose = require("mongoose");

// Define the schema for a post
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: { type: String },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      // required: true,
    },
    views: {
      type: Number,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User model
    comments: [
      {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // Reference to the Comment model
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create the Post model using the schema
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
