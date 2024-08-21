const { validationResult } = require("express-validator");
var JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const db = require('../db/queries');

module.exports = {
    indexGet: (req, res) => {
        res.json({
            message: 'hi'
        })
    },
    signUpPost: async (req, res) => {
        // Validate sign up and handle errors
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        // Add user to database
        const { email, username, password } = req.body;
        const newUser = await db.addUser(email, username, password);
    
        // Send success response
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    },
    logInPost: (req, res) => {
        // Authenticate users
        var opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey = 'secret',
            issuer = 'accounts.examplesoft.com',
            audience = 'yoursite.net',
        }
        // Payload user
        // MOCK need to integrate passport auth and pass real user

        const user = {
            id: 1,
            username: 'mock',
            password: 'mock'
        }
    
        jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '24h'}, (err, token) => {
            res.json({
                token
            })
        })
    },

    postPost: (req, res) => {
        jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                res.status(403).json({
                    message: "Not authorized"
                })
            } else {
                res.json({
                    message: 'Post created!',
                    authData
                })
            }
        })
    },
}