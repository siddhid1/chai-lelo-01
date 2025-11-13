import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  menuId:{type:String,
    required:true
  },
  name: String,
  description: String,
  // foodItems:String[],
  image: String,
  price: Number,
  veg: Boolean,
  slot: {
    type: String,
    enum: ["lunch", "paratha", "dinner"],
    required: true,
  },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);


//isOrderClosed -> true -> order nhi kar sak te // discarded
