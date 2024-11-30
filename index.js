const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");

const servermain = async () => {
  await connectDB();
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

servermain();
