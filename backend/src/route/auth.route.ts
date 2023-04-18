import express from "express";
//Importing middlewares
const { otpVerification } = require("../middleware/sendEmail");
const { checkFields } = require("../middleware/checkFields");
//Importing controllers
const {
  signup,
  login,
  googleLogin,
  verifyOtp,
  resendOtp,
} = require("../controllers/auth.controller");
//Creating express routing
export const authRouter = express.Router();

//Auth routing
//Signup route
authRouter.post("/signup", checkFields, otpVerification, signup);
//Login route
authRouter.post("/login", checkFields, login);
//Continue with google
authRouter.post("/googlelogin", googleLogin);
//Verify Otp route;
authRouter.post("/verifyotp", verifyOtp);
//resend otp route
authRouter.post("/resendotp", otpVerification, resendOtp);
