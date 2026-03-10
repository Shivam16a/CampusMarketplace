const router = require("express").Router();

const {
    createFeedback,
    getFeedback,
    deleteFeedback,
    getPublicFeedback
} = require("../controllers/feedbackController.js");

const { protect, adminOnly } = require("../middleware/authMiddleware.js");


// user feedback
router.post("/", protect, createFeedback);

router.get("/public", getPublicFeedback);


// admin
router.get("/", protect, adminOnly, getFeedback);

router.delete("/:id", protect, adminOnly, deleteFeedback);


module.exports = router;