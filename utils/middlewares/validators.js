const { body } = require('express-validator');
const userQueries = require('../../queries/userQueries');

// Validation middleware for the sign-up form
const validateSignUp = [
    // Validate email
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address')
        .custom(async value => {
            // Check if email already exists in the database
            const user = await userQueries.findUser('email', value);
            if (user) {
                throw new Error('Email already in use');
            }
            return true;
        }),

    // Validate username
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .isAlphanumeric().withMessage('Username must contain only letters and numbers')
        .custom(async value => {
            const user =  await userQueries.findUser("username", value);
            if (user) {
                throw new Error('Username already in use');
            }
            else {
                return true;
            }
        }),

    // Validate password
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),

    // Validate confirm password
    body('confirmPassword')
        .trim()
        .notEmpty().withMessage('Confirm password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        })
];

module.exports = { validateSignUp };