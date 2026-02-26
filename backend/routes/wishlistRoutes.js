const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

// Add
router.post("/:itemId", protect, addToWishlist);

// Remove
router.delete("/:itemId", protect, removeFromWishlist);

// Get My Wishlist
router.get("/", protect, getMyWishlist);

module.exports = router;