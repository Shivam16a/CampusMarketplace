const Item = require("../models/itemModel");

// ================= ADD ITEM =================
const addItem = async (req, res) => {
    try {
        const { name, description, category, price, condition, exchangeOption } =
            req.body;

        const images = req.files
            ? req.files.map((file) => file.filename)
            : [];

        const item = await Item.create({
            user: req.user._id,
            seller: req.user._id,
            name,
            description,
            category,
            price,
            condition,
            exchangeOption,
            images,
        });

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= GET ALL ITEMS =================
const getItems = async (req, res) => {
    try {
        const { keyword, category, condition, minPrice, maxPrice } = req.query;

        let query = {};

        // Search by name
        if (keyword) {
            query.name = { $regex: keyword, $options: "i" };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by condition
        if (condition) {
            query.condition = condition;
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = minPrice;
            if (maxPrice) query.price.$lte = maxPrice;
        }

        const items = await Item.find(query)
            .populate("user", "username profilepic")
            .sort({ createdAt: -1 });

        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= GET SINGLE ITEM =================
const getSingleItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate(
            "user",
            "username email profilepic"
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= UPDATE ITEM =================
const updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Only owner can update
        if (item.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        item.name = req.body.name || item.name;
        item.description = req.body.description || item.description;
        item.category = req.body.category || item.category;
        item.price = req.body.price || item.price;
        item.condition = req.body.condition || item.condition;
        item.exchangeOption =
            req.body.exchangeOption !== undefined
                ? req.body.exchangeOption
                : item.exchangeOption;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= DELETE ITEM =================
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Only owner or admin
        if (
            item.user.toString() !== req.user._id.toString() &&
            !req.user.isAdmin
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await item.deleteOne();

        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= GET MY ITEMS =================
const getMyItems = async (req, res) => {
    try {
        const items = await Item.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= UPDATE ITEM STATUS =================
const updateItemStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        if (item.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        item.status = status;
        await item.save();

        res.json({ message: "Status updated", item });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addItem,
    getItems,
    getSingleItem,
    updateItem,
    deleteItem,
    getMyItems,
    updateItemStatus,
};