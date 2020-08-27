const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
     username: {
       type: String,
       required: [true, 'Please enter username']
     }, 
     email: {
      type: String,
      required: [true, 'Please enter email']
    },
     passwordHash: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  }
);


//used to ensure that both emain and username are unique 
// Read https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator
userSchema.index({ 'email': 1}, {unique: true});
userSchema.index({ 'username': 1}, {unique: true});
 module.exports = model('User', userSchema);