const Feedback = require("../models/FeedbackModel.js");


// create feedback
exports.createFeedback = async (req, res) => {
    try {

        const feedback = new Feedback({
            user: req.user.id,
            message: req.body.message,
            rating: req.body.rating
        });

        const saved = await feedback.save();

        res.status(201).json(saved);

    } catch (err) {
        res.status(500).json(err);
    }
};



// get all feedback (admin)
exports.getFeedback = async (req, res) => {
    try {

        const feedback = await Feedback
            .find()
            .populate("user", "username email");

        res.json(feedback);

    } catch (err) {
        res.status(500).json(err);
    }
};



// delete feedback
exports.deleteFeedback = async (req, res) => {
    try {

        await Feedback.findByIdAndDelete(req.params.id);

        res.json({ message: "Feedback deleted" });

    } catch (err) {
        res.status(500).json(err);
    }
};

//get all feedback for publick
exports.getPublicFeedback = async (req, res) => {
    try {

        const feedback = await Feedback
            .find()
            .populate("user", "username profilepic")
            .sort({ createdAt: -1 })
            .limit(10);

        res.json(feedback);

    } catch (error) {
        res.status(500).json(error);
    }
};