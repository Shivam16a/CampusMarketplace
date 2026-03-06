const Contact = require("../models/ContactModel.js");

// Send Message
const sendMessage = async (req, res) => {
    try {

        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newMessage = new Contact({
            name,
            email,
            message
        });

        await newMessage.save();

        res.status(201).json({
            success: true,
            message: "Message sent successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Contacts
const getAllContact = async (req, res) => {
    try {
        const contacts = await Contact
            .find()
            .sort({ createdAt: -1 });   // latest message first

        res.status(200).json({
            success: true,
            total: contacts.length,
            contacts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    sendMessage,
    getAllContact
};
