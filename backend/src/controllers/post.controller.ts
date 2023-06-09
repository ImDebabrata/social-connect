import { Request, Response } from "express";
import { UserModel } from "../models/User.model";
import { PostModal } from "../models/Post.modal";
import { AuthenticatedRequest } from "../middleware/verifyToken";

//Creating a new post
const createPost = async (req: AuthenticatedRequest, res: Response) => {
  const { content, post_image } = req.body;
  const user = req.user;
  try {
    //Checking for user
    const userPresent = await UserModel.findOne({ email: user!.email });
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
  } catch (error) {
    res.send({ res: "Something went wrong", error });
  }
};

//Deleting post by id
const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const deletedPost = await PostModal.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).send({ error: "Post not found" });
    }

    res.send({ res: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ res: "Server error" });
  }
};

//Get all posts
const getPosts = async (req: Request, res: Response) => {
  const posts = await PostModal.find()
    .populate("userId", ["name", "email", "profilePic"])
    .sort({ created_at: -1 });
  res.send({ res: "Get post success", posts });
};

module.exports = { createPost, deletePost, getPosts };
