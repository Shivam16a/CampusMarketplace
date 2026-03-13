const express = require('express');
const router = express.Router();

const {
    sendNotification,
    getNotifications,
    markAsRead,
    deleteNotification,
} = require('../controllers/notificationController.js');

const { protect } = require('../middleware/authMiddleware.js');


// admin / seller send notification
router.post('/send', protect, sendNotification);


// user get notification
router.get('/', protect, getNotifications);


// mark read
router.put('/read/:id', protect, markAsRead);


// delete
router.delete('/:id', protect, deleteNotification);

module.exports = router;