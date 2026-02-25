const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: { type: Number, required: true },
    gender: { type: String, required: true },
    collagemane: { type: String, required: true },
    department: { type: String, required: true },
    profilepic: {
        type: String,
        default:""
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: { type: String, required: true },
}, { timestamps: true });

const User = new mongoose.model("User", userSchema);
module.exports = User;