const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    deleteProfile,
    adminUpdateUser,
    adminDeleteUser,
    getAllUsers
} = require('../controllers/userController.js');


// login/register limiter (strict)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 5, // sirf 5 attempts
    message: 'Too many login/register attempts. Try again after 15 minutes.'
});

const { protect, adminOnly } = require('../middleware/authMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');

router.post('/register', authLimiter, upload.single('profilepic'), registerUser);
router.post('/login', authLimiter, loginUser);
router.get('/profile', protect, getProfile);

// USER
router.put('/profile', protect, upload.single('profilepic'), updateProfile);
router.delete('/profile', protect, deleteProfile);

// ADMIN
router.get('/all', protect, adminOnly, getAllUsers);
router.put('/admin/:id', protect, adminOnly, upload.single('profilepic'), adminUpdateUser);
router.delete('/admin/:id', protect, adminOnly, adminDeleteUser);

module.exports = router;