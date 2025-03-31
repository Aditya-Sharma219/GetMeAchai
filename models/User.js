import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    profilepic: { type: String, default: "/default-avatar.png" },
    coverpic: { type: String, default: "/default-cover.png" },
    keyId: { type: String },
    keySecret: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
