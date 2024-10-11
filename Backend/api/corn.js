// api/cron.js

const { fetchCryptoData } = require('../controllers/fetchData.controller');
const storeCryptoData = require('../controllers/StoreData.controller');

module.exports = async (req, res) => {
    try {
        console.log(`[${new Date().toISOString()}] Cron job: Fetching and storing crypto data...`);
        const cryptoData = await fetchCryptoData();
        if (cryptoData) {
            await storeCryptoData(cryptoData);
            console.log(`[${new Date().toISOString()}] Successfully stored crypto data.`);
            return res.status(200).json({ message: "Crypto data fetched and stored successfully" });
        } else {
            console.log(`[${new Date().toISOString()}] No crypto data received.`);
            return res.status(204).json({ message: "No crypto data received" });
        }
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error in cron job:`, error);
        return res.status(500).json({ message: "Error fetching or storing crypto data" });
    }
};
