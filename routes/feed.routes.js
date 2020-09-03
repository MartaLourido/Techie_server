const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

//const for require user model
const FeedModel = require("../models/Feed.model");
const { isLoggedIn } = require('../helpers/auth.helper'); // to check if user is loggedIn


//Get the feed  //Funciona
router.get('/feed', (req, res) => {
     FeedModel.find()
     .sort([["createdAt", -1]])
     .populate("createdby")
     .populate({
          path: "comments",
          populate: "createdby"

     })
          .then((feed) => {
               console.log(feed[0].comments)
               let newFeed = feed.map(e => {
                    let newElem = JSON.parse(JSON.stringify(e))
                    newElem.passwordHash = "***"
                    return newElem
               })
               res.status(200).json(newFeed)
          })
          .catch((err) => {
               console.log(err)
               res.status(500).json({
                    error: 'Something went wrong, try again',
                    message: err
               })
          })
})

//create a post in the feed  //Funciona

router.post('/feed/create', isLoggedIn, (req, res) => {
     const { description } = req.body;
     const createdby = req.session.loggedInUser._id;
     console.log(req.body)
     FeedModel.create({ createdby, description })
          .then((response) => {
               res.status(201).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong, try again',
                    message: err
               })
          })
})

//find by id for do the edit and the delete /Funciona //using populate to dont show the password and show the createdby

router.get('/feed/:postId', isLoggedIn, (req, res) => {
     FeedModel.findById(req.params.postId)
     .populate("createdby")
          .then((response) => {
               response.createdby.passwordHash = "***"
               res.status(200).json(response)
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong, try again',
                    message: err
               })
          })
})



// Edit a post with put route //Funciona

router.put('/feed/:postId/edit', isLoggedIn, (req, res) => {
     const { description } = req.body;
     FeedModel.findByIdAndUpdate(req.params.postId, {
          description: description,
     })
          .then(() => {
               res.status(200).json(
                    { message: `Your post is updated successfully.` });
          })
          .catch(err => {
               res.json(err);
          })
})

// Delete a post //funciona

router.delete('/feed/:postId/delete', isLoggedIn, (req, res) => {
     FeedModel.findByIdAndDelete(req.params.id)
          .then((response) => {
               res.status(202).json({ message: `Your post is deleted successfully.` });
          })
          .catch((err) => {
               res.status(500).json({
                    error: 'Something went wrong, try again',
                    message: err
               })
          })
})

//Add a like and update //Funciona pero pendiente validar en el frontend que si ya tiene like no se le deje dar like otra vez

router.put('/feed/:postId/addlike', isLoggedIn, (req, res) => {
     const likeUser = req.session.loggedInUser._id;
     FeedModel.findByIdAndUpdate(req.params.postId, {
          $push: { "likes": likeUser }
     })
          .then(() => {
               res.status(200).json(
                    { message: `Your post is updated successfully.` });
          })
          .catch(err => {
               res.json(err);
          })
})


//Add comment //Funciona

router.put('/feed/:postId/addcomment', isLoggedIn, (req, res) => {
     const { comment } = req.body;
     const createdby = req.session.loggedInUser._id;
     FeedModel.findByIdAndUpdate(req.params.postId,  {
          $push: { "comments": {comment:comment, createdby: createdby } }
     })
          .then(() => {
               res.status(200).json(
                    { message: `Your comment have been added successfully.` });
          })
          .catch(err => {
               res.json(err);
          })
})

// router.post('/feed/:userId', isLoggedIn, (req, res) => {
//   let id = req.params.id
//   const {name, textComment} = req.body;
//   FeedModel.findByIdAndUpdate(id, {$set: {name: name, textComment: textComment}})
//         .then((response) => {
//              res.status(200).json(response)
//         })
//         .catch((err) => {
//              console.log(err)
//              res.status(500).json({
//                   error: 'Something went wrong, try again',
//                   message: err
//              })
//         }) 
// })

//router add a like would be here

module.exports = router;