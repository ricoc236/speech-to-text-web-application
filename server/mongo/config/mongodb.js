// db.js
const { MongoClient } = require('mongodb');

// Your MongoDB connection string
const uri = 'mongodb://localhost:27017/textify';
const client = new MongoClient(uri);

// Use a variable to hold the connected database instance
let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('textify');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }
}

function getDB() {
    return db;
}

module.exports = { connectDB, getDB };