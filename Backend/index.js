const mongoose = require('mongoose');
const cron = require('node-cron');
const cors = require('cors');
const express = require("express")
const connection = require('./connection/database.connection')
const {fetchCryptoData} = require('./controllers/fetchData.controller');
const storeCryptoData = require('./controllers/StoreData.controller');
const statsRoute = require('./routes/stats.route');
const app = express();
const port = 3000;

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', async () => {
    console.log('Fetching and storing crypto data...');
    const cryptoData = await fetchCryptoData();
    if (cryptoData) {
      await storeCryptoData(cryptoData);
    }
  });
  
app.use(cors());
app.use('/',statsRoute);


console.log('Cron job is running...');

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})