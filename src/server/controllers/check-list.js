const CheckList = require('../models/check-list');
const { ObjectID } = require('mongodb');


const CheckListController = {
  create (req, res, next) {
    var chk = new CheckList({
      name: req.body.name,
      createdAt: new Date().getTime(),
      _createdBy: req.user._id
    });

    chk.save().then((data) => {
      res.send({ data });
    }).catch(next);
  },

  addTask(req, res, next) {
    var chk = new CheckList({
      name: req.body.name,
      createdAt: new Date().getTime(),
      _createdBy: req.user._id
    });

    const { id } = req.params;
    
    CheckList.findOne({
      _id: id,
      _createdBy: req.user._id
    }).then(data => {
      if (!data) {
        res.status(401).send(`You don't have permission to edit this checklist`);
      }

      data.tasks.push(chk);
      
      return Promise.all([data.save(), chk.save()]);
    })
    .then(responses => {
      res.send({ data: responses[1] });
    })
    .catch(next);

  },

  get (req, res, next) {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    CheckList.findById(id)
      .populate({
        path: 'tasks'
      })
      .then((data) => {
        res.send({ data });
      })
      .catch(next);
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