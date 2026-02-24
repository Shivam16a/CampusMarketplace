const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    deleteProfile,
    adminUpdateUser,
    adminDeleteUser,
    getAllUsers  
} = require("../controllers/userController.js");

const { protect, adminOnly } = require("../middleware/authMiddleware.js");
const upload = require("../middleware/uploadMiddleware.js");

router.post("/register", upload.single("profilepic"), registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

// USER
router.put("/profile", protect, upload.single("profilepic"), updateProfile);
router.delete("/profile", protect, deleteProfile);

// ADMIN
router.get("/all", protect, adminOnly, getAllUsers);   
router.put("/admin/:id", protect, adminOnly, upload.single("profilepic"), adminUpdateUser);
router.delete("/admin/:id", protect, adminOnly, adminDeleteUser);

module.exports = router;