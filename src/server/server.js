const { env } = require('./config/config');

const express = require('express');
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');

const {checkListRoutes} = require('./routes/check-list');

const app = express();

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