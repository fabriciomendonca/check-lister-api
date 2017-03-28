const CheckList = require('../models/check-list');
const { ObjectID } = require('mongodb');

const getCheckList = (app) => {
  app.get('/check-list/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    CheckList.findById(id).then((data) => {
      return res.status(200).send({ data });
    }).catch((err) => res.status(400).send(err));
  });

  app.get('/check-list', (req, res) => {
    CheckList.find({}).then((data) => {
      res.status(200).send({ data });
    })
  });
};

module.exports = getCheckList;
