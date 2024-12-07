const express = require("express");
const authRoute = require("./Auth/authRoutes");
const postRoutes = require("./Posts/postRoutes");
const commentRoutes = require("./comments/commentsRoutes");
// const uploadImage = require("../src/config/cloudinary");
require("dotenv").config();

const cors = require("cors");
// const bodyParser = require("bodyParser");
const bodyParser = require("body-parser");
const userRoutes = require("./User/UserRoute");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(bodyParser.json());
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
// Example route
app.get("/test", (req, res) => {
  console.log(req.url); // Logs the URL of the request
  res.send("Test route");
});

app.use("/auth/", authRoute);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);
app.use("/auth", userRoutes);
// uploadImage();
module.exports = app;
