const mongoose = require('mongoose');

const { Schema } = mongoose;

const CheckList = mongoose.model('check-list', new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3
  },
  createdAt: {
    type: Number,
    default: 0
  },
  completedAt: {
    type: Number,
    default: 0
  },
  _createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'check-list'
  }]
}));

module.exports = CheckList;