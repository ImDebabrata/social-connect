import express, { Request, Response } from "express";
const { UserModel } = require("../models/User.model");
const { PostModal } = require("../models/Post.modal");
const { verifyToken } = require("../middleware/verifyToken");

export const postRouter = express.Router();

//Create Post

postRouter.post("/", verifyToken, async (req: Request, res: Response) => {
  const { content, post_image, email } = req.body;
  //Checking for user
  const userPresent = await UserModel.findOne({ email });
  if (!userPresent) {
    res.status(400).send({ res: "No user found" });
  }
  const post = new PostModal({
    content,
    post_image,
    userId: userPresent._id,
  });
  post.save();
  res.send({ res: "Posted Successfully", post });
});

//Get all posts
postRouter.get("/", async (req: Request, res: Response) => {
  const posts = await PostModal.find().populate("userId", [
    "name",
    "email",
    "profilePic",
  ]);
  res.send({ res: "Get post success", posts });
});
