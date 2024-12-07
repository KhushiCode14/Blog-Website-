const express = require("express");
const uploadRoutes = express;

// Upload routes
uploadRoutes.post("/upload", (req, res) => {
  // Handle file upload
  res.send("File uploaded");
});
