import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, default: "text" },
  },
  { timestamps: true, toJSON: { getters: true }, id: true }
);

export default mongoose.model("Message", messageSchema, "messages");
