const { fetchCryptoData } = require('../controllers/fetchData.controller');
const storeCryptoData = require('../controllers/StoreData.controller');

module.exports = async (req, res) => {
    try {
        console.log(`[${new Date().toISOString()}] Fetching and storing crypto data...`);
        const cryptoData = await fetchCryptoData();
        if (cryptoData) {
            await storeCryptoData(cryptoData);
            console.log(`[${new Date().toISOString()}] Successfully stored crypto data.`);
            res.status(200).send('Cron job completed successfully');
        } else {
            console.log(`[${new Date().toISOString()}] No crypto data received.`);
            res.status(204).send('No crypto data received');
        }
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error in fetchAndStoreCryptoData:`, error);
        res.status(500).send('Error in cron job execution');
    }
};
