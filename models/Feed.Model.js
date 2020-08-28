const mongoose = require('mongoose');

const { Schema } = mongoose;

const FeedSchema = new Schema({
  createdby: {
    type: Schema.Types.ObjectId,
    ref: 'user'

  },

  comments: [{
    comment: {
      type: String,

    },
    createdby:
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  }],
  description: {
    type: String,

  },

  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'

  }],

},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Feed', FeedSchema);