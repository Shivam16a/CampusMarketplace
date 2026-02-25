const express = require("express");
const router = express.Router();
const {
  addItem,
  getItems,
  getSingleItem,
  updateItem,
  deleteItem,
  getMyItems,
  updateItemStatus,
} = require("../controllers/itemController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Multiple image upload
router.post("/", protect, upload.array("images", 5), addItem);

router.get("/my-items", protect, getMyItems);
router.put("/status/:id", protect, updateItemStatus);

router.get("/", getItems);
router.get("/:id", getSingleItem);

router.put("/:id", protect, updateItem);
router.delete("/:id", protect, deleteItem);

module.exports = router;