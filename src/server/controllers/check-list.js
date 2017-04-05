const CheckList = require('../models/check-list');
const { ObjectID } = require('mongodb');


const CheckListController = {
  create (req, res, next) {
    var chk = new CheckList({
      name: req.body.name
    });

    chk.save().then((data) => {
      res.send({ data });
    }).catch(next);
  },

  get (req, res, next) {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    CheckList.findById(id).then((data) => {
      res.send({ data });
    }).catch(next);
  },

  getList (req, res, next) {
    CheckList.find({}).then((data) => {
      res.send({ data });
    }).catch(next);
  },

  update (req, res, next) {
    
  },

  destroy (req, res, next) {

  }
};

module.exports = {
  CheckListController
};