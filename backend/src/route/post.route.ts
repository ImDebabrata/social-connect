import express from "express";
//Importing middlewares
const { verifyToken } = require("../middleware/verifyToken");
//Importing controllers
const {
  createPost,
  deletePost,
  getPosts,
} = require("../controllers/post.controller");
//Creating express route
export const postRouter = express.Router();

//Express Routing
//Create Post
postRouter.post("/", verifyToken, createPost);
// Delete a post
postRouter.delete("/:postId", deletePost);
//Get all posts in descending order
postRouter.get("/", getPosts);
