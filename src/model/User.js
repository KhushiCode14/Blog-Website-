const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    name: String,

    email: String,
    password: String,
    role: { type: String, enum: ["admin", "user"], default: "user" }, // Role-based
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);

module.exports = User;
// clerkId: String,