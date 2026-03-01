const express = require("express");
const router = express.Router();

const { protect, sellerOnly } = require('../middleware/authMiddleware.js');

const { sellerStats } = require("../controllers/sellerController");

router.get("/stats", protect, sellerOnly, sellerStats);

module.exports = router;