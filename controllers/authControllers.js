const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userQueries = require('../queries/usersQueries');

module.exports = {
    signUpPost: async (req, res) => {
        // Validate sign up and handle errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        // Add user to database
        const { email, username, password } = req.body;
        const newUser = await userQueries.addUser(email, username, password);
    
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
        const user  = await userQueries.findUser("username", username);
        if (!user) return res.status(401).json({
            message: 'Username not found'
        });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({
            message: 'Invalid password'
        });

        // Create jwt token 
        jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
            res.json({token})
        })
    },
}