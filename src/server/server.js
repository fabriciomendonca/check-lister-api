const { env } = require('./config/config');

const express = require('express');
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const {checkListRoutes} = require('./routes/check-list');
const {userRoutes} = require('./routes/user');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Define /users routes
userRoutes(app);
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