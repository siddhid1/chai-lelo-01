import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    phone: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    userAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("Users", userSchema);


