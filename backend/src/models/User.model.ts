const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export const UserModel = mongoose.model("user", userSchema);
// module.exports = { UserModel };
