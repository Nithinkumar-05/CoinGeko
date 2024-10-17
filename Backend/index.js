const mongoose = require('mongoose');
const cors = require('micro-cors')(); // This will allow all origins
const express = require("express");
const connection = require('./connection/database.connection');
const statsRoute = require('./routes/stats.route');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use('/', statsRoute);

// Test route
app.get('/', (req, res) => {
    res.send('Crypto Data Server is running');
});

// Start the server
app.listen(port, () => {
    console.log(`[${new Date().toISOString()}] Server is running on port ${port}`);
});

// Handle process termination (if needed for cleanup)
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Performing cleanup.');
    // Perform any necessary cleanup, e.g., close database connections.
});
