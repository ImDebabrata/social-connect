const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profilePic: String,
  otp: {
    OTP: Number,
    OtpExpTime: Number,
  },
  verified: Boolean,
});

export const UserModel = mongoose.model("user", userSchema);
// module.exports = { UserModel };
