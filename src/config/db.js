const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodb_url);
    console.log("mongodb conencted successfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;

// connecy to mongodb
// schema define:define structure of document:schemaType
// model define:construct documents:mongoose.model(modelName, schema):
