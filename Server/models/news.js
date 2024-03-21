import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { APP_URL } from "../config";

const newsSchema = new Schema(
  {
    userName: { type: String, required: true },
    userId: { type: String, required: true },
    profileImage: { type: String, required: true },
    caption: { type: String, required: true },
    imageUrl: {
      type: String,
      required: true,
      get: (image) => {
        return `${APP_URL}/${image.replace("\\", "/")}`;
      },
    },
    likes: { type: Array, required: true },
  },
  { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model("News", newsSchema, "news");