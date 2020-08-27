const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventsSchema = new Schema({
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
  NumberOfPeople: {
    type: [
      {
        userId: String,
        text: String,
        timestamp: Number
      }
    ],
    required: true
  },
  Date: {
    type: Number,
    required: true
  },
  textComment: {
    type: String,
    required: true
  },
  Topics: {
    type: [
      {
        information: String,
        text: String,
        timestamp: Number
      }
    ],
    required: true
  },
  Place: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Events', EventsSchema);