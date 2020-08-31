const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
  name: {
    type: String,
  },
  createdby: {
    type: Schema.Types.ObjectId,
    ref: 'user'

  },

  comments: [{
    type: String,

  }],

  numberOfPeople: {
    type: Number,
  },

  place: {
    type: String,
    required: true
  },
  textComment: {
    type: String,

  },
  image: {
    type: String,

  },
  date: {
    type: Date,

  },
  topics: {
    type: String
  },
  city: {
    type: String,
    required: true

  },


},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Event', EventSchema);