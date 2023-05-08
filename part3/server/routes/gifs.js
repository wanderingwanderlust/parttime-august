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
// Params - GIF_ID(required) ( JSON BodyURL(option) TITLE(optional), USER_ID(optional))
router.put('/:id', (req, res) => {
    Gif.findByIdAndUpdate(req.params.id, {title: req.body.title}, (err, result) => {
        if(err) {
            console.log(err);
            res.send('error')
        } else {
            console.log(result)
            res.send(`succssfully updated GIF title to be ${result.title}`)
        }
    })
})

// Delete Gifs
// Params - GIF_ID (required)
// Response - 204 success message hard_deleted / soft_deleted
router.delete('/:id', (req, res) => {
    Gif.findByIdAndDelete(req.params.id, (err, result) => {
        if(err) {
            console.log(err)
            res.send('error')
        } else {
            console.log(result)
            res.send('Gif was successfully deleted')
        }
    })
})



export default router;