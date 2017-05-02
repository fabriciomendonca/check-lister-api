const CheckList = require('../models/check-list');
const { ObjectID } = require('mongodb');


const CheckListController = {
  create (req, res, next) {
    var chk = new CheckList({
      name: req.body.name
    });
    
    if (req.body.parent) {
      chk._parent = req.body.parent;
    }

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
    const id = req.params.id;
    const name = req.body.name;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    CheckList.findByIdAndUpdate(id, {name})
      .then(() => CheckList.findById(id))
      .then(data => res.send({data}))
      .catch(next);
  },

  destroy (req, res, next) {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    CheckList.findByIdAndRemove(id)
      .then(() => CheckList.findById(id))
      .then(data => res.send({data}))
      .catch(next);
  }
};

module.exports = {
  CheckListController
};