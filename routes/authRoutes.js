const express = require('express');
const passport = require('passport');

const authControllers = require('../controllers/authControllers');

const { validateSignUp } = require('../utils/middlewares/validators');

const router = express.Router();

// Route to check if the user is authenticated
router.get('/check', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ isAuthenticated: true });
});

router.post('/signup', [validateSignUp, authControllers.signUpPost])

router.post('/login', authControllers.logInPost);

module.exports = router;