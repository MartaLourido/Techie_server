const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  createdby: {
    type: String,
    required: true
  },
 
  comments: {
    type: [
      {
        userId: String,
        text: String,
        timestamp: Number
      }
    ],
    required: true
  },
  likesCounter: {
    type: Number,
    required: true
  },
  textComment: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Post', PostSchema);