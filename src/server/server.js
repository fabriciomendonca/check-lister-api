const { env } = require('./config/config');

const express = require('express');
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');

const {checkListRoutes} = require('./routes/check-list');

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
});
app.use(bodyParser.json());

// Define /check-list routes
checkListRoutes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Listen port ${process.env.PORT}`);
});

module.exports = {
  app
};