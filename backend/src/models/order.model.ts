import mongoose, { modelNames } from "mongoose";

const orderedItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    orderedItems: [orderedItemSchema],
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      //required:true
    },
    slot: {
      type: String,
      enum: ["lunch", "paratha", "dinner"],
      required: true,
    },
    totalBill: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Orders", orderSchema);
