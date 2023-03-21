const express = require("express");
const cors = require("cors");
// import dotnenv from "dotenv";
require("dotenv").config();
// const { connection } = "./config/db.js";

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.json());
app.use(cors());

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("Welcome social-connect server");
});

app.listen(PORT, async () => {
  try {
    // await connection;
    console.log("sdf");
    console.log("Connected to DB successfully");
  } catch (err) {
    console.log(err);
    console.log("Error while connect with db");
  }
  console.log(`Listening on port ${PORT}`);
});
