const mongoose = require('mongoose');

const { Schema } = mongoose;

const CheckListItem = mongoose.model('check-list-item', new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  createdAt: {
    type: Number,
    default: 0
  },
  completedAt: {
    type: Number,
    default: 0
  }
}));

module.exports = CheckListItem;