import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { APP_URL } from "../config";

const postSchema = new Schema(
  {
    userName: { type: String, required: true },
    userId: { type: String, required: true },
    profileImage: { type: String, required: true },
    caption: { type: String, required: true },
    imageUrl: {
      type: String,
      get: (image) => {
        return image ? `${APP_URL}/${image.replace("\\", "/")}` : undefined;
      },
    },
    likes: { type: Array, required: true },
    comments: { type: Array, required: true },
    reposts: { type: Array, required: true },
  },
  { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model("Post", postSchema, "posts");
