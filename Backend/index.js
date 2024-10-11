const mongoose = require('mongoose');
const cron = require('node-cron');
const cors = require('cors');
const express = require("express")
const connection = require('./connection/database.connection')
const {fetchCryptoData} = require('./controllers/fetchData.controller');
const storeCryptoData = require('./controllers/StoreData.controller');
const statsRoute = require('./routes/stats.route');
const app = express();
const port = process.env.PORT || 3000;

// Function to fetch and store crypto data
async function fetchAndStoreCryptoData() {
    try {
        console.log(`[${new Date().toISOString()}] Fetching and storing crypto data...`);
        const cryptoData = await fetchCryptoData();
        if (cryptoData) {
            await storeCryptoData(cryptoData);
            console.log(`[${new Date().toISOString()}] Successfully stored crypto data.`);
        } else {
            console.log(`[${new Date().toISOString()}] No crypto data received.`);
        }
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error in fetchAndStoreCryptoData:`, error);
    }
}

// Run the job immediately
fetchAndStoreCryptoData();

// Schedule the job to run every 2 hours
const job = cron.schedule('0 */2 * * *', fetchAndStoreCryptoData, {
    scheduled: true,
    timezone: "UTC"
});

console.log(`[${new Date().toISOString()}] Cron job is scheduled to run every 2 hours.`);

app.use(cors());
app.use('/',statsRoute);

app.get('/',(req,res)=>{
    res.send('Crypto Data Server is running');
});

app.listen(port,()=>{
    console.log(`[${new Date().toISOString()}] Server is running on port ${port}`);
})

// Handle process termination
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Stopping cron job and closing server.');
    job.stop();
    // Close database connection and perform any other cleanup
});