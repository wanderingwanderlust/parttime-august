import express from "express";
import User from "../models/User.js";
import jsonwebtoken from "jsonwebtoken";

const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomrefreshtoken';
const refreshTokens = [];

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
                const accessToken = jsonwebtoken.sign(
                    {username: user.username, id: user._id}, // token
                    accessTokenSecret, // secret used to sign the token
                    {expiresIn: '120m'} // token details
                )

                const refreshToken = jsonwebtoken.sign(
                    {username: user.username, id: user._id}, // token
                    refreshTokenSecret
                )

                const decodedUser = jsonwebtoken.verify(accessToken, accessTokenSecret)
                refreshTokens.push(refreshToken)
                const message = `${username} successfully logged in`
                res.json(accessToken, refreshToken, decodedUser, message)
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