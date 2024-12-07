const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(
      config.mongodb_url || `${process.env.MONGO_URl}/BlogWebsite`
    );
    console.log("mongodb conencted successfully");
  } catch (error) {
    console.error("monfgodb error", error);
  }
};
mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
});
module.exports = connectDB;

// connecy to mongodb
// schema define:define structure of document:schemaType
// model define:construct documents:mongoose.model(modelName, schema):
