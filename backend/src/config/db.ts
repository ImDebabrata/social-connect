import mongoose from "mongoose";
require("dotenv").config();

export const connection = mongoose.connect(process.env.MONGO_URL!);
