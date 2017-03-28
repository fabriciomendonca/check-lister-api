const { env } = require('./config/config');

const express = require('express');
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');

const getCheckList = require('./routes/check-list.get');

const app = express();

app.use(bodyParser.json());

// Define /check-list routes
getCheckList(app);

app.listen(process.env.PORT, () => {
  console.log(`Listen port ${process.env.PORT}`);
});

module.exports = {
  app
};