const { send } = require('micro');
const cors = require('micro-cors')();

const handler = async (req, res) => {
  send(res, 200, 'Crypto Data Server is running');
};

module.exports = cors(handler);
