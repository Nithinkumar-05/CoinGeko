const Crypto = require('../models/Crypto.model');

async function storeCryptoData(data) {
  try {
    await Crypto.insertMany(data);
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error storing data:', error);
  }
}

module.exports = storeCryptoData;
