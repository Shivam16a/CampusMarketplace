const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
} = require("../controllers/userController.js");

const { protect } = require("../middleware/authMiddleware.js");
const upload = require("../middleware/uploadMiddleware.js");

router.post("/register", upload.single("profilepic"), registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

module.exports = router;