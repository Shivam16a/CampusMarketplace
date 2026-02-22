const mongoose = require('mongoose');

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Databse conneced successfully");
    } catch (error) {
        console.error("Database connection failed:",error);
        process.exit(0);
    }
}

module.exports = connectDb;