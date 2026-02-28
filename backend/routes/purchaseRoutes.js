const express = require("express");
const router = express.Router();

const {
  sendPurchaseRequest,
  getSellerRequests,
  updateRequestStatus,
  getBuyerRequests,
} = require("../controllers/purchaseController");

const { protect } = require("../middleware/authMiddleware");

router.post("/:itemId", protect, sendPurchaseRequest);
router.get("/seller", protect, getSellerRequests);
router.get("/buyer", protect, getBuyerRequests);
router.put("/:id", protect, updateRequestStatus);

module.exports = router;