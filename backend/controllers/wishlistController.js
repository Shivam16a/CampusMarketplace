const User = require("../models/userModels");
const Item = require("../models/itemModel");

// 1️⃣ Add to Wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.params;

    const user = await User.findById(userId);

    // Check item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Prevent duplicate
    if (user.wishlist.includes(itemId)) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    user.wishlist.push(itemId);
    await user.save();

    res.status(200).json({ message: "Item added to wishlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2️⃣ Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.params;

    const user = await User.findById(userId);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== itemId
    );

    await user.save();

    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3️⃣ Get My Wishlist
exports.getMyWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("wishlist")
      .select("wishlist");

    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};