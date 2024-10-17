const { send } = require('micro');
const cors = require('micro-cors')({
    allowedOrigins: ['https://koinx-geko.vercel.app'] // Add your frontend domain
});

const handler = async (req, res) => {
  send(res, 200, 'Crypto Data Server is running');
};

module.exports = cors(handler);
