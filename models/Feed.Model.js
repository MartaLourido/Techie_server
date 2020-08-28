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
  
  },
  textComment: {
    type: String,
 
  },
  timestamp: {
    type: Number,

  }
});

module.exports = mongoose.model('Post', PostSchema);