const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: {
    type: String,
  },
  post_image: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const PostModal = mongoose.model("post", postSchema);
