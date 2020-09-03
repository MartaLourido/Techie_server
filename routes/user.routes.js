const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

//const for require user model
const User = require("../models/User.model");
const { isLoggedIn } = require('../helpers/auth.helper'); // to check if user is loggedIn


//Get a user by id para ver mi usuario
//con req session loggedInuser ya tengo el id del usuario 
router.get('/profile', isLoggedIn, (req, res) => {
  User.findById(req.session.loggedInUser._id)
    .then((user) => {
      console.log("ROUTE /user", user)
      // req.profile = user; //
      user.passwordHash = "******"
      res.status(200).json( user )
    })
    .catch(() => {
      res.status(500).json({
        error: 'User not found'
      });
    })
});


// Edit profile with put route 

router.put('/profile/edit', isLoggedIn, (req, res, next)=>{
 
  // if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   res.status(400).json({ message: 'Specified id is not valid' });
  //   return;
  // }
  console.log("inside put route", req.body)
  const {username, email, userAvatar, city} = req.body
  User.findByIdAndUpdate(req.session.loggedInUser._id, {username, email, userAvatar, city})
    .then(() => {
      res.json({ message: `User ${req.session.loggedInUser.username} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})



// Delete profile

router.delete('/profile/delete', isLoggedIn, (req, res) => {
  User.findByIdAndDelete(req.session.loggedInUser._id)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
        error: "Something went wrong deleting your profile, try again"
      })
    })
})



module.exports = router;