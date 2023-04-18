import { Request, Response } from "express";
import { UserModel } from "../models/User.model";
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Signup new user
const signup = async (req: Request, res: Response) => {
  const { name, email, password, otpData } = req.body;
  try {
    //hasing user password and saving to database;
    bcrypt.hash(password, 10, async (err: any, hash: String) => {
      const user = new UserModel({
        name,
        email,
        password: hash,
        otp: otpData,
        verified: false,
      });
      await user.save();
      return res.status(201).send({
        res: "OTP sent to registered mail",
        email,
        otpTimer: otpData.OtpExpTime,
      });
    });
  } catch (error) {
    return res.send({ res: "Something went wrong", error });
  }
};

//Login user
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  //checking email and passwords are not empty;

  //checking user in database;
  const userPresent = await UserModel.findOne({ email });
  try {
    const hashedPassword = userPresent.password;
    //comparing user entered password with database password
    bcrypt.compare(password, hashedPassword, (err: any, result: Boolean) => {
      if (result) {
        //Checking Email is verified or not
        if (userPresent.verified === false) {
          return res.status(401).send({
            res: "Email is not verified",
            email,
            otpTimer: userPresent.otp.OtpExpTime,
          });
        }
        //Creating json web token
        const token = jwt.sign(
          {
            email: userPresent.email,
            name: userPresent.name,
          },
          "secret-code"
        );
        return res
          .status(200)
          .send({ res: `Hello ${userPresent.name}`, token });
      } else {
        return res.status(401).send({ res: "Password incorrect" });
      }
    });
  } catch (error) {
    return res.send({ res: "Something went wrong", error });
  }
};

//Google login
const googleLogin = async (req: Request, res: Response) => {
  const { token } = req.body;
  //getting user info from token;
  const decodedToken = jwt.decode(token, { complete: true });
  //error handling
  if (!token || !decodedToken) {
    return res.status(400).send({ res: "Encountered invalid token" });
  }
  const { name, picture, email } = decodedToken.payload;
  //creating json token;
  const createToken = jwt.sign({ name, email }, "secret-code");
  //Check user is already available in db or not;
  const userPresent = await UserModel.findOne({ email });
  if (userPresent) {
    return res
      .status(202)
      .send({ res: `Hello ${userPresent.name}`, token: createToken });
  } else {
    //creating new user in database;
    try {
      const user = new UserModel({ name, email, profilePic: picture });
      await user.save();
      return res
        .status(201)
        .send({ res: "Signup with google Successfully", token: createToken });
    } catch (err) {
      res.send({ res: "Something went wrong", error: err });
    }
  }
};

//Verify otp
const verifyOtp = async (req: Request, res: Response) => {
  const { otp, email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user?.otp?.OTP === +otp) {
      await UserModel.findOneAndUpdate(
        { email },
        { verified: true },
        { new: true }
      );
      return res.send({ res: "OTP verification success" });
    } else {
      return res.status(401).send({ res: "OTP you have entered is wrong" });
    }
  } catch (err) {
    return res.send({ res: "Something went wrong", error: err });
  }
};

//Resent OTP mail
const resendOtp = async (req: Request, res: Response) => {
  const { otpData, email } = req.body;
  const user = await UserModel.findOneAndUpdate(
    { email },
    { otp: otpData },
    { new: true }
  );

  res.send({ res: "OTP sent to the mail", otpTimer: user.otp.OtpExpTime });
};

module.exports = { signup, login, googleLogin, verifyOtp, resendOtp };
