const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
    createdby: {
        type: Schema.Types.ObjectId,
        ref: 'user'
  
    },
 
    comments: [{
      type: String,
        
    }],

  NumberOfPeople:  [{
      type: Schema.Types.ObjectId,
      ref: 'user'
  }],

  Date: {
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
  Place: {
    type: String,
    required: true
 
  },
 
},
{
  timestamps: true
}
);

module.exports = mongoose.model('Event', EventSchema);