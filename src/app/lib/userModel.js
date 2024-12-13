import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const UserSchema =
  mongoose.models.users || mongoose.model("users", userModel);
