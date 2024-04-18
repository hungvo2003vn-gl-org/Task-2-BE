import mongoose from "mongoose";
const Schema = mongoose.Schema;
const token = new Schema(
  {
    accessToken: { type: String },
    refreshToken: { type: String },
    user_id: { type: String },
    session_id: {type: String }
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("tokens", token);