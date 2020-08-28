const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

//const for require user model
const User = require("../models/User.Model");
const { isLoggedIn } = require('../helpers/auth.helper'); // to check if user is loggedIn


//Get the feed 
router.get('/feed', (req, res) => {
  FeedModel.find()
       .then((feed) => {
            res.status(200).json(feed)
       })
       .catch((err) => {
            res.status(500).json({
                 error: 'Something went wrong, try again',
                 message: err
            })
  })         
})

//create a post in the feed

router.post('/feed/create', isLoggedIn, (req, res) => {  
  const {createdby, likesCounter, textComment, comments} = req.body;
  console.log(req.body)
  FeedModel.create({createdby, likesCounter, textComment, comments})
        .then((response) => {
             res.status(200).json(response)
        })
        .catch((err) => {
             res.status(500).json({
                  error: 'Something went wrong',
                  message: err
             })
        })  
})

// Edit a post with put route 

router.put('/feed/edit', isLoggedIn, (req, res, next)=>{

  User.findByIdAndUpdate(req.session.loggedInUser._id, req.body)
    .then(() => {
      res.json({ message: `User ${req.session.loggedInUser.username} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// Delete profile

router.delete('/user/delete', isLoggedIn, (req, res) => {
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