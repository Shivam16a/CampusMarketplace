const User = require("../models/userModels");
const Item = require("../models/itemModel"); 

// ================= ADMIN DASHBOARD STATS =================
const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalSellers = await User.countDocuments({ role: "seller" });
        const bannedUsers = await User.countDocuments({ isBanned: true });

        const totalItems = await Item.countDocuments();

        // Unique colleges
        const colleges = await User.distinct("collagename");

        res.json({
            totalUsers,
            totalSellers,
            bannedUsers,
            totalItems,
            totalColleges: colleges.length,
            colleges,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// ================= BAN / UNBAN USER =================
const toggleBanUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isBanned = !user.isBanned;
        await user.save();

        res.json({ message: "User ban status updated" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getAdminStats,
    toggleBanUser,
};