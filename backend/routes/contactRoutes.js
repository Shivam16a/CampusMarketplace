const express = require('express');
const {protect} = require('../middleware/authMiddleware.js');
const router = express.Router();
const { sendMessage, getAllContact } = require('../controllers/ContactController.js');

router.post('/send',protect, sendMessage);
router.get('/getall',protect, getAllContact);

module.exports = router;