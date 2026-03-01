const Item = require('../models/itemModel.js');

const sellerStats = async (req, res) => {
    const sellerId = req.user._id;

    const totalListings = await Item.countDocuments({
        user: sellerId,
    });

    const totalSold = await Item.countDocuments({
        user: sellerId,
        status: "Sold",
    });

    const soldItems = await Item.find({
        user: sellerId,
        status: "Sold",
    });

    const totalEarnings = soldItems.reduce(
        (acc, item) => acc + (item.price || 0),
        0
    );

    const activeListings = await Item.countDocuments({
        user: sellerId,
        status: "Available",
    });

    res.json({
        totalListings,
        totalSold,
        totalEarnings,
        activeListings,
    });
};

module.exports = { sellerStats };