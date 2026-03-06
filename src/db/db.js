const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect(process.env.MongoDB_URI)
    console.log('Connected to MongoDB');
}

module.exports = connectDB;
