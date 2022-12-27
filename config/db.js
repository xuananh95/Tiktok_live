const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/tiktok-live";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(DB_URL);
        console.log(`Mongo connected at: ${connect.connection.host}`);
    } catch (error) {
        console.log("Error connect to mongodb", error);
    }
};
module.exports = connectDB;
