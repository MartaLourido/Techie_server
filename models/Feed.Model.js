const mongoose = require('mongoose');

const { Schema } = mongoose;

const FeedSchema = new Schema({
  createdby: {
      type: Schema.Types.ObjectId,
      ref: 'user'

  },
 
  comments: [{
    type: String,
      
  }],
  description: {
    type: String,
      
  },

  likesCounter: {
    type: Number,

  },
 
},
{
  timestamps: true
}
);

module.exports = mongoose.model('Feed', FeedSchema);