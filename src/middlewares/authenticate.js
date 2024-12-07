const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT
// const authenticateToken = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1]; // Get token from 'Authorization' header

//   if (!token) {
//     return res.status(401).json({ message: "Access Denied" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid Token" });
//     }

//     req.user = decoded; // Attach decoded user info to request
//     next(); // Proceed to the next middleware or route handler
//   });
// };
// const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, // Add required payload
    process.env.JWT_SECRET, // Use a strong secret key stored in .env
    { expiresIn: "1h" } // Token expiration time
  );
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(403)
          .json({ message: "Access Denied: Token has expired." });
      } else {
        return res
          .status(403)
          .json({ message: "Access Denied: Invalid token." });
      }
    }

    req.user = user; // Save user information to request object
    next();
  });
};
// Middleware to check if the user is an admin
// const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }
    req.user = decoded; // Attach decoded user data to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateToken, verifyAdmin };
