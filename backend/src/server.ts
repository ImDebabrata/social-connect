import express, { Request, Response } from "express";
const cors = require("cors");
require("dotenv").config();
import { connection } from "./config/db";
import { authRouter } from "./route/auth.route";
import { postRouter } from "./route/post.route";

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome social-connect server");
});

app.use("/auth", authRouter);
app.use("/post", postRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB successfully");
  } catch (err) {
    console.log(err);
    console.log("Error while connect with db");
  }
  console.log(`Listening on port ${PORT}`);
});
