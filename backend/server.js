const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDb = require('./config/DB.js');
const cors = require('cors');
const userRoute = require('./routes/userRoute.js');
const itemRoute = require('./routes/itemRoutes.js');
const wishlistRoutes = require('./routes/wishlistRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes.js');
const sellerRoute = require('./routes/sellerRoutes.js');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes.js');
const notificationRoutes = require('./routes/notificationRoutes.js');
const feedbackRoutes = require('./routes/feedbackRoutes');

dotenv.config();
const app = express();

const corsOptions = {
    origin: ['http://localhost:5173', 'https://campus-marketplace-dusky.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});

app.use(cors(corsOptions));
app.use(express.json());

app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(limiter);

// server.js ke niche add karein
app.get('/api/cron-test', (req, res) => {
    console.log('Cron job hit at', new Date().toLocaleString());
    res.send('Cron job executed successfully!');
});

//anty header
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; \
        script-src 'self' https://cdn.jsdelivr.net; \
        style-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com 'unsafe-inline'; \
        font-src 'self' https://cdnjs.cloudflare.com; \
        img-src 'self' data: https://campusmarketplace-cw77.onrender.com;"
    );
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=()'
    );
    next();
});

app.use('/uploads', express.static('uploads'));
app.use('/api/auth', userRoute);
app.use('/api/items', itemRoute);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/seller', sellerRoute);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/feedback', feedbackRoutes);



const PORT = process.env.PORT || 5050;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT :${PORT}`);
    });
});