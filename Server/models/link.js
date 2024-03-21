import mongoose from "mongoose";
const Schema = mongoose.Schema;

const linkSchema = new Schema(
  {
    link_token: { type: String, required: true },
    invalid: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Link", linkSchema, "links");
