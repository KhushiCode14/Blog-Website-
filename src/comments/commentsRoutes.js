const express = require("express");
const { createComment, getComments } = require("./commentController");
const { authenticateToken } = require("../middlewares/authenticate");
const commentRoutes = express.Router();

// POST to create a comment on a specific post
commentRoutes.post("/posts/:postId/comments", authenticateToken, createComment);

// GET all comments for a specific post
commentRoutes.get("/posts/:postId/comments", getComments);

module.exports = commentRoutes;
