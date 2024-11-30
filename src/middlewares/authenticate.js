const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next(); // If authenticated, move to the next middleware/resource
  } catch (error) {
    res.status(401).json({ message: "Token is not valid!" });
  }
};

module.exports = authenticate;
