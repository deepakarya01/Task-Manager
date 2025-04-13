const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: [true, 'Please add a task title'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
},
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task