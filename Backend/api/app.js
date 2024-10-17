// api/app.js
const express = require('express');
const cors = require('cors');
const statsRoute = require('../routes/stats.route');

const app = express();

app.use(cors());
app.use('/', statsRoute);

app.get('/', (req, res) => {
    res.send('Crypto Data Server is running');
});

module.exports = app;