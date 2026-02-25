const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Books", "Gadgets", "Stationery", "Others"],
      required: true,
    },
    price: { type: Number },
    exchangeOption: { type: Boolean, default: false },
    condition: {
      type: String,
      enum: ["New", "Used"],
      required: true,
    },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ["Available", "Reserved", "Sold"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);