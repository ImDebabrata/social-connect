import express, { Request, Response } from "express";

const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
export const authRouter = express.Router();

//Signup route
authRouter.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // checking all input fields
  if (!name || !email || !password) {
    return res.status(401).send({ res: "Please input all fields" });
  } else {
    //checking for user in database
    const userPresent = await UserModel.findOne({ email });
    if (userPresent) {
      return res.status(401).send({ res: "User Already Exists" });
    } else {
      try {
        //hasing user password and saving to database;
        bcrypt.hash(password, 10, async (err: any, hash: String) => {
          const user = new UserModel({ name, email, password: hash });
          await user.save();
          return res.status(201).send({ res: "Signup Success" });
        });
      } catch (error) {
        return res.send({ res: "Something went wrong", error });
      }
    }
  }
});

//Login route
authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  //checking email and passwords are not empty;
  if (!email || !password) {
    return res.status(401).send({ res: "Please Enter all fields" });
  } else {
    //checking user in database;
    const userPresent = await UserModel.findOne({ email });
    if (!userPresent) {
      return res.status(404).send({ res: "User not found, Please signup" });
    } else {
      try {
        const hashedPassword = userPresent.password;
        //comparing user entered password with database password
        bcrypt.compare(
          password,
          hashedPassword,
          (err: any, result: Boolean) => {
            if (result) {
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
          }
        );
      } catch (error) {
        return res.send({ res: "Something went wrong", error });
      }
    }
  }
});

//Continue with google
authRouter.post("/googlelogin", async (req: Request, res: Response) => {
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
});
