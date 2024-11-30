const express = require("express");
const {
  createPost,
  allPosts,
  getSinglePosts,
  updateSinglePosts,
  deleteSinglePosts,
} = require("./postController");
const authenticate = require("../middlewares/authenticate");
const postRoutes = express.Router();

postRoutes.post("/posts", createPost);
postRoutes.get("/posts", allPosts);
postRoutes.get("/posts/:id", getSinglePosts);
postRoutes.delete("/posts/:id", deleteSinglePosts);
postRoutes.patch("/posts/:id", updateSinglePosts);
// crud

module.exports = postRoutes;
