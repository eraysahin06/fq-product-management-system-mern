const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })

        console.log(`Connected to MongoDB: ${connection.connection.host}`);
    } catch(err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;