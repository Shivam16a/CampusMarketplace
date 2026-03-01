const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,          // prevent duplicate
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,          // Number se String better
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    collagename: {           // typo fixed
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    profilepic: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "seller"],
      default: "user",
    },
    
    isBanned: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);