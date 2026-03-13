const Notification = require('../models/notificationModel.js');
const User = require('../models/userModels.js');


// Admin / Seller send notification to user
exports.sendNotification = async (req, res) => {
    try {

        // permission check
        if (req.user.role !== 'admin' && req.user.role !== 'seller') {
            return res.status(403).json({
                message: 'Not authorized to send notification',
            });
        }

        const { username, message } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const notification = await Notification.create({
            user: user._id,
            sender: req.user._id,
            message,
        });

        res.json({
            message: 'Notification sent successfully',
            notification,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// user get notifications
exports.getNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find({ user: req.user._id })
            .populate('sender', 'username')
            .sort({ createdAt: -1 });

        res.json(notifications);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// mark notification as read
exports.markAsRead = async (req, res) => {
    try {

        await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true }
        );

        res.json({
            message: 'Notification marked as read',
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// delete notification
exports.deleteNotification = async (req, res) => {
    try {

        await Notification.findByIdAndDelete(req.params.id);

        res.json({
            message: 'Notification deleted',
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};