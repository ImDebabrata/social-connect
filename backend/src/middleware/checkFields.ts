import { NextFunction, Request, Response } from "express";
const { UserModel } = require("../models/User.model");

const checkFields = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  console.log("check fields middleware");
  //For signup Route
  if (req.originalUrl === "/auth/signup") {
    // checking all input fields
    if (!name || !email || !password) {
      return res.status(401).send({ res: "Please input all fields" });
    }
    //checking for user in database
    const userPresent = await UserModel.findOne({ email });
    if (userPresent) {
      return res.status(401).send({ res: "User Already Exists" });
    }
    next();
  } else {
    if (!email || !password) {
      return res.status(401).send({ res: "Please Enter all fields" });
    }
    //checking for user in database
    const userPresent = await UserModel.findOne({ email });
    if (!userPresent) {
      return res.status(404).send({ res: "User not found, Please signup" });
    }
    next();
  }
};

module.exports = { checkFields };
