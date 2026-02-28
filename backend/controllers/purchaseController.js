const PurchaseRequest = require("../models/purchaseRequestModel");
const Item = require("../models/itemModel");


// ================= SEND REQUEST =================
const sendPurchaseRequest = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.user.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot buy your own item" });
    }

    const existingRequest = await PurchaseRequest.findOne({
      item: item._id,
      buyer: req.user._id,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = await PurchaseRequest.create({
      item: item._id,
      buyer: req.user._id,
      seller: item.user,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= SELLER VIEW REQUESTS =================
const getSellerRequests = async (req, res) => {
  try {
    const requests = await PurchaseRequest.find({
      seller: req.user._id,
    })
      .populate("item", "name price images")
      .populate("buyer", "username email");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//============GET BUYER REQUEST STATUS==============
const getBuyerRequests = async (req, res) => {
  try {
    const requests = await PurchaseRequest.find({
      buyer: req.user._id,
    })
      .populate("item", "name price images status")
      .populate("seller", "username email");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ACCEPT / REJECT =================
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body; // "Accepted" or "Rejected"
    const request = await PurchaseRequest.findById(req.params.id).populate("item");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Only seller of this item can update
    if (request.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // If already accepted/rejected
    if (request.status !== "Pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    // ACCEPT LOGIC
    if (status === "Accepted") {
      request.status = "Accepted";
      await request.save();

      // Reject all other pending requests for same item
      await PurchaseRequest.updateMany(
        {
          item: request.item._id,
          _id: { $ne: request._id },
          status: "Pending",
        },
        { status: "Rejected" }
      );

      // Update item status
      await Item.findByIdAndUpdate(request.item._id, {
        status: "Reserved", // or "Sold"
      });

      return res.json({ message: "Request accepted. Item reserved." });
    }

    // REJECT LOGIC
    if (status === "Rejected") {
      request.status = "Rejected";
      await request.save();
      return res.json({ message: "Request rejected." });
    }

    res.status(400).json({ message: "Invalid status value" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendPurchaseRequest,
  getSellerRequests,
  updateRequestStatus,
  getBuyerRequests,
};