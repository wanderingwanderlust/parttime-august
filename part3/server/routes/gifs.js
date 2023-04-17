import express from "express";
import axios from 'axios';
import Gif from "../models/Gif.js";

const router = express.Router();


// Get - Grab all the Users Gifs
// Param: User._id
// Response: Json(GifSchema)
router.get('/', (req, res) => {
    console.log("This is the gif route")
    // const user = JSON.parse(req.body.user)
    const userId = req.body.user.id

    Gif.find({user: userId}, (err, gifs) => {
        if(err) {
            console.log(err);
            res.send('error')
        } else {
            res.send(gifs)
        }
    })
})


// Post Create Gifs
// Params: URL, TITLE, User_id
// Response: DB record was success
router.post('/', (req, res) => {
    Gif.create({
        url: req.body.url,
        title: req.body.title,
        user: req.body.user.id
    }, (err, gif) => {
        if(err) {
            console.log(err)
            res.send('error')
        } else {
            res.send('Gif was saved successfully')
        }
    })
})

// Update Gifs

// Delete Gifs



export default router;