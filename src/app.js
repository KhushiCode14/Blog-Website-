const express = require("express");
const authRoute = require("./Auth/authRoutes");
const postRoutes = require("./Posts/postRoutes");
const commentRoutes = require("./comments/commentsRoutes");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Example route
app.get("/test", (req, res) => {
  console.log(req.url); // Logs the URL of the request
  res.send("Test route");
});

app.use("/auth/", authRoute);
app.use("/", postRoutes);
app.use("/", commentRoutes);
module.exports = app;
