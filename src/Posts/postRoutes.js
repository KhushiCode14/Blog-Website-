const express = require("express");
const multer = require("multer");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const {
  createPost,
  allPosts,
  getSinglePosts,
  updateSinglePosts,
  deleteSinglePosts,
  postCount,
} = require("./postController");

const postRoutes = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
  fileFilter: (req, file, cb) => {
    // Only allow images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Routes
postRoutes.post("/posts", upload.single("files"), createPost);
postRoutes.get("/posts", allPosts);
postRoutes.get("/posts/:id", getSinglePosts);
postRoutes.delete("/posts/:id", deleteSinglePosts);
postRoutes.patch("/posts/:id", updateSinglePosts);
postRoutes.get("/postcount", postCount);

module.exports = postRoutes;
