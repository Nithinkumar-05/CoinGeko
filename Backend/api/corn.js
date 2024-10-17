// api/cron.js

const { fetchCryptoData } = require('../controllers/fetchData.controller');
const storeCryptoData = require('../controllers/StoreData.controller');

export default async function handler(req, res) {
  // Check for the secret to prevent unauthorized access
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log(`[${new Date().toISOString()}] Fetching and storing crypto data...`);
    const cryptoData = await fetchCryptoData();
    
    if (cryptoData) {
      await storeCryptoData(cryptoData);
      console.log(`[${new Date().toISOString()}] Successfully stored crypto data.`);
      res.status(200).json({ message: 'Cron job completed successfully' });
    } else {
      console.log(`[${new Date().toISOString()}] No crypto data received.`);
      res.status(204).json({ message: 'No crypto data received' });
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in fetchAndStoreCryptoData:`, error);
    res.status(500).json({ error: 'Error in cron job execution' });
  }
}