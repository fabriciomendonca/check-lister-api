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
      _createdBy: req.user._id,
      isRoot: false
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
      res.send(responses[1]);
    })
    .catch(next);

  },

  get (req, res, next) {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    CheckList.findOne({ _id: id, _createdBy: req.user._id})
      .populate({
        path: 'tasks',
        options: {
          sort: {
            createdAt: -1
          }
        }
      })
      .then((data) => {
        if (!data) {
          res.status(404).send();
        }
        res.send({ data });
      })
      .catch(next);
  },

  getList (req, res, next) {
    CheckList.find({
      _createdBy: req.user._id,
      isRoot: true
    })
      .populate({
        path: 'tasks'
      })
      .sort({
        createdAt: -1
      })
      .then((data) => {
        res.send({ data });
      }).catch(next);
  },

  update (req, res, next) {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    const body = {};
    Object.keys(req.body).forEach(key => {
      if (key !== '_id') {
        body[key] = req.body[key];
      }
    });

    CheckList.findOneAndUpdate({_id: id, _createdBy: req.user._id}, body)
      .then(doc => {
        if (!doc) {
          res.status(404).send();
        }

        return CheckList.findById(id)
      })
      .then(data => res.send(data))
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