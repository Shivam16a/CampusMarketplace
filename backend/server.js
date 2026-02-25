const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/DB.js');
const userRoute = require('./routes/userRoute.js');
const itemRoute = require('./routes/itemRoutes.js');

dotenv.config();
const app = express();
app.use(express.json());


app.use("/uploads", express.static("uploads"));
app.use("/api/auth",userRoute);
app.use("/api/items",itemRoute);



const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on PORT :${PORT}`);
    connectDb();
});