const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

//const for require user model
const EventModel = require("../models/Events.model");
const { isLoggedIn } = require('../helpers/auth.helper'); // to check if user is loggedIn


//Get the event list
router.get('/events', (req, res) => {
  EventModel.find()
       .then((events) => {
            res.status(200).json(events)
       })
       .catch((err) => {
            res.status(500).json({
                 error: 'Something went wrong, try again',
                 message: err
            })
  })         
})

//create a new event

router.post('/event/create', isLoggedIn, (req, res) => {  
  const {name, date, place, topics, numberOfPeople, image, city, information} = req.body;
  const createdby = req.session.loggedInUser._id
  console.log(createdby)
  EventModel.create({createdby:createdby, name: name, date: date, place: place, topics: topics, numberOfPeople: numberOfPeople, image: image, city: city, information: information})
          .then((response) => {
             res.status(200).json(response)
        })
        .catch((err) => {
             console.log(err)
             res.status(500).json({
                  error: 'Something went wrong',
                  message: err
             })
        })  
})

//find by id for do the edit and the delete, with populate for get the name who create the event in the frontend

router.get('/event/:eventId',  isLoggedIn, (req, res) => {
  EventModel.findById(req.params.eventId)
  .populate("createdby")
   .then((response) => {
        response.createdby.passwordHash = "***"
        console.log(response)
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

// Edit a event with put route 

router.put('/event/:eventId/edit', isLoggedIn, (req, res) =>{
     const {name, topics, image, city} = req.body;
  EventModel.findByIdAndUpdate(req.params.eventId, {name: name, topics: topics, image: image, city: city})
    .then(() => {
      res.json({ message: `Your event is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})



// Delete a event

router.delete('/event/:eventId/delete', isLoggedIn, (req, res) => {
  EventModel.findByIdAndDelete(req.params.eventId)
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

router.patch('/event/:eventId', isLoggedIn, (req, res) => {
  let id = req.params.id
  const {createdby, textComment, date} = req.body;
  EventModel.findByIdAndUpdate(id, {$set: {createdby: createdby, textComment: textComment, date: date}})
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



module.exports = router;