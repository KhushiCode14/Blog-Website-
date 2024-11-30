const express = require("express");
const authRoute = require("./Auth/authRoutes");

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Example route
app.get("/test", (req, res) => {
  console.log(req.url); // Logs the URL of the request
  res.send("Test route");
});

app.use("/auth/", authRoute);
module.exports = app;
