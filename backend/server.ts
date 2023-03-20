import express from "express";
import cors from "cors";
import dotnenv from "dotenv";
import { connection } from "./config/db.js";
dotnenv.config();

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome social-connect server");
});

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
