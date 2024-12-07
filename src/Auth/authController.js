const User = require("../model/User");
const bcrypt = require("bcryptjs"); // For hashing passwords
const jwt = require("jsonwebtoken");
// const sendEmail = require("../");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const sendEmail = require("../helpers/NodeMailer");
const Post = require("../model/Post");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middlewares/authenticate");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("profilePicture");

// Controller to handle registration
const registerController = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error uploading file", error: err });
      // console.log(err);
    }

    const { name, email, password } = req.body;
    const subject = "Welcome to My Blog";
    const text = `Hello ${name},\n\nThank you for registering on our blog!`;
    const html = `<p>Hello ${name},</p><p>Thank you for registering on our blog!</p>`;

    try {
      // Check if email and password are provided
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Check if email is in a valid format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Set default role to 'user' or 'admin' based on email
      let role = "user";
      const adminEmails = ["admin@example.com", "superadmin@example.com"]; // Admin emails list
      if (adminEmails.includes(email)) {
        role = "admin"; // Assign admin role if email matches
      }

      // Handle profile picture upload to Cloudinary if provided
      let profileImageUrl = "";
      if (req.file) {
        try {
          const uploadResult = await cloudinary.v2.uploader.upload_stream(
            { folder: "profile_pictures" },
            async (error, result) => {
              if (error) {
                return res
                  .status(500)
                  .json({ message: "Error uploading profile picture" });
              }
              profileImageUrl = result.secure_url;
            }
          );
          uploadResult.end(req.file.buffer);
        } catch (error) {
          return res
            .status(500)
            .json({ message: "Error uploading image to Cloudinary", error });
        }
      }

      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role, // Set the role
        profilePicture: profileImageUrl, // Save Cloudinary URL
      });

      // Send a welcome email
      sendEmail(email, subject, text, html);

      // Save the new user to the database
      await newUser.save();

      // Send success response
      res.json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          profilePicture: newUser.profilePicture, // Include profile picture URL
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  });
};
const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "email not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate a JWT token with userId and role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );
    res.json({
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Other routes can be added here as needed, such as getting user profiles or updating user data.
const userCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error);
  }
};
const aggregate = async (req, res) => {
  try {
    const aggregate = Post.aggregate([
      { $group: { _id: "$category", totalPosts: { $sum: 1 } } },
    ]);
    res.json({ aggregate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Example: Get all users (Admin-only)

module.exports = {
  registerController,
  loginController,
  userCount,
  aggregate,
};
