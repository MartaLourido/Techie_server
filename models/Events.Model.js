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

  NumberOfPeople:  [{
      type: Schema.Types.ObjectId,
      ref: 'number'
  }],

  place: {
    type: Number,
    required: true
  },
  textComment: {
    type: String,
    required: true
  },
  Topics: [{
    type: String
  }],
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