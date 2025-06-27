import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
