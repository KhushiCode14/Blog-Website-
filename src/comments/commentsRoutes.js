const express = require("express");
const { createComment, getComments } = require("./commentController");
const commentRoutes = express.Router();

// POST to create a comment on a specific post
commentRoutes.post("/posts/:postId/comments", createComment);

// GET all comments for a specific post
commentRoutes.get("/posts/:postId/comments", getComments);

module.exports = commentRoutes;
