const express = require("express");
const jwt = require("jsonwebtoken");
// const registerController = require("./authController");
const {
  registerController,
  loginController,
  userCount,
  // Users,
} = require("./authController");
const {
  // authenticateToken,
  // authorizeAdmin,
  verifyAdmin,
} = require("../middlewares/authenticate");

const authRoute = express.Router();

// Middleware to parse JSON request bodies

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
authRoute.get("/count", userCount);
authRoute.get("/admin/login", verifyAdmin, async (req, res) => {
  const { username, password } = req.body;

  // Find admin user by username
  const admin = await User.findOne({ username });

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate a JWT token for the admin
  const token = jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token expiration
  );

  res.json({ token });
});
// authRoute.get("/aggregate", aggregate);
// authRoute.post("/count", userCount);
// authRoute.post("/count", userCount);
module.exports = authRoute;
