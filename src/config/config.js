const { config: loadConfig } = require("dotenv");

loadConfig();
const config = {
  mongodb_url: process.env.MONGO_URL,
  jwt_secret: process.env.JWT_SECRET,
};

module.exports = config;
