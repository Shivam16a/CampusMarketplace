const express = require("express");
const router = express.Router();

const {
  getAdminStats,
  toggleBanUser,
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Dashboard Stats
router.get("/stats", protect, adminOnly, getAdminStats);

// Ban / Unban
router.put("/ban/:id", protect, adminOnly, toggleBanUser);

module.exports = router;