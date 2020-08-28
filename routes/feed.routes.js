const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

//const for require user model
const FeedModel = require("../models/Feed.Model");
const { isLoggedIn } = require('../helpers/auth.helper'); // to check if user is loggedIn


//Get the feed  //Funciona
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

//create a post in the feed  //Funciona

router.post('/feed/create', isLoggedIn, (req, res) => {  
  const {description} = req.body;
  const createdby = req.session.loggedInUser._id;
  console.log(req.body)
  FeedModel.create({createdby, description})
        .then((response) => {
             res.status(200).json(response)
        })
        .catch((err) => {
             res.status(500).json({
                  error: 'Something went wrong, try again',
                  message: err
             })
        })  
})

//find by id for do the edit and the delete

router.get('/feed/:postId',  isLoggedIn, (req, res) => {
  FeedModel.findById(req.params.myId)
   .then((response) => {
        res.status(200).json(response)
   })
   .catch((err) => {
        res.status(500).json({
             error: 'Something went wrong, try again',
             message: err
        })
   }) 
})

// Edit a post with put route 

router.put('/feed/:postId/edit', isLoggedIn, (req, res) =>{

  FeedModel.findByIdAndUpdate(req.params.postId)
    .then(() => {
      res.json({ message: `Your post is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// Delete a post

router.delete('/feed/:postId', isLoggedIn, (req, res) => {
  FeedModel.findByIdAndDelete(req.params.id)
        .then((response) => {
             res.status(200).json(response)
        })
        .catch((err) => {
             res.status(500).json({
                  error: 'Something went wrong, try again',
                  message: err
             })
        })  
})

//Add a comment

router.post('/feed/:userId', isLoggedIn, (req, res) => {
  let id = req.params.id
  const {name, textComment} = req.body;
  FeedModel.findByIdAndUpdate(id, {$set: {name: name, textComment: textComment}})
        .then((response) => {
             res.status(200).json(response)
        })
        .catch((err) => {
             console.log(err)
             res.status(500).json({
                  error: 'Something went wrong, try again',
                  message: err
             })
        }) 
})

//router add a like would be here

module.exports = router;