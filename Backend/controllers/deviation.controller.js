const CryptoData = require('../models/Crypto.model'); // Import your model

// Function to calculate the standard deviation of an array
const calculateStandardDeviation = (data) => {
  const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
  const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;
  return Math.sqrt(variance);
};

// Function to get the standard deviation for a specific cryptocurrency
const getStandardDeviation = async (req, res) => {
  const coin = req.query.coin;

  if (!coin) {
    return res.status(400).json({ error: 'Coin parameter is required' });
  }

  try {
    // Fetch the last 100 records for the specified cryptocurrency
    const records = await CryptoData.find({ coin })
      .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
      .limit(100); // Limit to the last 100 records

    if (records.length === 0) {
      return res.status(404).json({ error: 'No records found for this cryptocurrency' });
    }

    // Extract prices from the records
    const prices = records.map(record => record.price);
    const deviation = calculateStandardDeviation(prices).toFixed(2); // Calculate and format to 2 decimal places

    return res.json({ deviation: parseFloat(deviation) }); // Return the result

  } catch (error) {
    console.error('Error fetching records:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getStandardDeviation;
