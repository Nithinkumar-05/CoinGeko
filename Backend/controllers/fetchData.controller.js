const axios = require('axios');
const CryptoData = require('../models/Crypto.model');
const fetchCryptoData = async () => {
  try {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,matic-network,ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_change=true';
    const response = await axios.get(url);
    
    // Structure the fetched data into an array of objects
    const cryptoData = [
      {
        coin: 'bitcoin',
        price: response.data.bitcoin.usd,
        marketCap: response.data.bitcoin.usd_market_cap,
        '24hChange': response.data.bitcoin.usd_24h_change
      },
      {
        coin: 'ethereum',
        price: response.data.ethereum.usd,
        marketCap: response.data.ethereum.usd_market_cap,
        '24hChange': response.data.ethereum.usd_24h_change
      },
      {
        coin: 'matic-network',
        price: response.data['matic-network'].usd,
        marketCap: response.data['matic-network'].usd_market_cap,
        '24hChange': response.data['matic-network'].usd_24h_change
      }
    ];

    console.log("Fetched crypto data:", cryptoData);
    return cryptoData;

  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error);
    return null;
  }
};

const getCryptoStats = async (req, res) => {
  const { coin } = req.query;

  // Validate the query parameter
  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({
      error: 'Invalid or missing coin parameter. Use bitcoin, matic-network, or ethereum.'
    });
  }

  try {
    // Fetch the latest data for the requested coin
    const latestData = await CryptoData.findOne({ coin }).sort({ updatedAt: -1 }).exec();

    // If data not found, return a 404 response
    if (!latestData) {
      return res.status(404).json({ error: 'Data for the requested coin not found.' });
    }

    // Return the data in the required format
    return res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      '24hChange': latestData['24hChange']
    });

  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {fetchCryptoData,getCryptoStats};
