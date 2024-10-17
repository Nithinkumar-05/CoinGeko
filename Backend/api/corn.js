// api/cron.js
const { fetchCryptoData } = require('../controllers/fetchData.controller');
const storeCryptoData = require('../controllers/StoreData.controller');

module.exports = async (req, res) => {
    res.status(202).send('Cron job initiated');  // Send early response
    try {
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
};
