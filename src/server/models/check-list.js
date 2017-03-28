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
  }
}));

module.exports = CheckList;