import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { APP_URL } from "../config";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: {
      type: String,
      get: (profileImage) => {
        return `${APP_URL}/${profileImage.replace("\\", "/")}`;
      },
    },
    coverImage: {
      type: String,
      get: (coverImage) => {
        return `${APP_URL}/${coverImage.replace("\\", "/")}`;
      },
    },
    followers: { type: Array, required: true },
    following: { type: Array, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true, toJSON: { getters: true }, id: true }
);

export default mongoose.model("User", userSchema, "users");
