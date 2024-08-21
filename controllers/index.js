const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
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
    logInPost: async (req, res) => {    
        const { username, password } = req.body;

        // Verify user login
        const user  = await db.findUser("username", username);
        if (!user) return res.status(401).json({
            message: 'Username not found'
        });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({
            message: 'Invalid password'
        });

        jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
            res.json({token})
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