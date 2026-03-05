const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
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

const corseOption = {
    origin: "http://localhost:5173",
    method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}

dotenv.config();
const app = express();
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
});

app.use(limiter);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

app.use(cors(corseOption));
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", userRoute);
app.use("/api/items", itemRoute);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/seller", sellerRoute);
app.use("/api/admin", adminRoutes);



const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on PORT :${PORT}`);
    connectDb();
});