const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDb = require('./config/DB.js');
const cors = require('cors');
const userRoute = require('./routes/userRoute.js');
const itemRoute = require('./routes/itemRoutes.js');
const wishlistRoutes = require("./routes/wishlistRoutes");
const purchaseRoutes = require('./routes/purchaseRoutes.js');
const sellerRoute = require('./routes/sellerRoutes.js');
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes.js");
const notificationRoutes = require('./routes/notificationRoutes.js');

dotenv.config();
const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
});

app.use(cors(corsOptions));
app.use(express.json());

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(limiter);

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", userRoute);
app.use("/api/items", itemRoute);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/seller", sellerRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/notifications",notificationRoutes);



const PORT = process.env.PORT || 5050;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT :${PORT}`);
    });
});