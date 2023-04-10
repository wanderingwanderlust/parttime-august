import express from "express";
import User from "../models/User.js";

const router = express.Router();

// /auth/login
router.post('/login', (req, res) => {
    const {username, password} = req.body
    
    User.findOne({username: username}, (err, user) => {
        if(err) {res.status(401).json(`${err}`)}
        if(!user) {res.status(200).json('User does not exist, please create an account')}
        debugger;
        user.comparePassword(password, (err, isMatch) => {
            if(err) {
                console.log(err)
                const message = 'Passwords did not match'
                res.json(message)
            }

            if(isMatch) {
                // we need to eventually add accessToken, refreshTokeb, verifiedUser jsonWebTokens
                const message = `${username} successfully logged in`
                res.json(message)
            }
        })
    })
})


// /auth/signup
router.post('/signup', (req, res) => {
    const {username, password} = req.body
    // Save User to our Mongo DB
    User.findOne({username: username}, (err, user) => {
        if(user){
            res.status(500).send('User Already Exists')
        } else {
            User.create({
                username: username,
                password: password
            }, (userError, user) => {
                if(userError) {
                    console.log(userError)
                    res.status(500).send('User was not successfully created. Please try again.')
                } else {
                    res.send('User successfully created. Please login')
                }
            })
        }
    })
})

router.post('/logout', (req, res) => {
    // handle logging out by removing jsonwebtoken
})

export default router;