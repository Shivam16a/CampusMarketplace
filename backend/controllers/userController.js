const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels.js");
// Required for deleting old profile image
const fs = require("fs");
const path = require("path");

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// ================= REGISTER =================
const registerUser = async (req, res) => {
    try {
        const {
            username,
            email,
            phone,
            gender,
            collagemane,
            department,
            password,
        } = req.body;

        // Agar image upload hui hai to filename lo
        const profilepic = req.file ? req.file.filename : "";

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            phone,
            gender,
            collagemane,
            department,
            profilepic,
            password: hashedPassword,
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilepic: user.profilepic,
            role: user.role,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// ================= LOGIN =================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            profilepic: user.profilepic,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= GET PROFILE =================
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= UPDATE PROFILE (USER) =================
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update basic fields
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.gender = req.body.gender || user.gender;
        user.collagemane = req.body.collagemane || user.collagemane;
        user.department = req.body.department || user.department;

        // ================= IMAGE REPLACE LOGIC =================
        if (req.file) {

            // Agar pehle se profile pic hai to delete karo
            if (user.profilepic) {
                const oldImagePath = path.join("uploads", user.profilepic);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); // delete old image
                }
            }

            // Nayi image save karo
            user.profilepic = req.file.filename;
        }
        // ======================================================

        // Password update
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            profilepic: updatedUser.profilepic,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ================= DELETE OWN ACCOUNT =================
const deleteProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();

        res.json({ message: "Account deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= ADMIN UPDATE USER =================
const adminUpdateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        // ================= IMAGE REPLACE LOGIC =================
        if (req.file) {

            if (user.profilepic) {
                const oldImagePath = path.join("uploads", user.profilepic);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            user.profilepic = req.file.filename;
        }
        // ======================================================

        const updatedUser = await user.save();

        res.json(updatedUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ================= ADMIN DELETE USER =================
const adminDeleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.deleteOne();

        res.json({ message: "User deleted by admin" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    deleteProfile,
    adminUpdateUser,
    adminDeleteUser,
};