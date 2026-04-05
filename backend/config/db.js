const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Default to a local db or just mock for now if cluster fails, but let's stick to throwing error
        // process.exit(1); 
        console.log("Could not connect. Ensure MONGO_URI is correctly set in .env.");
    }
};

module.exports = connectDB;
