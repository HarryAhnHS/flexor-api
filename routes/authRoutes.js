const express = require('express');
const passport = require('passport');

const authControllers = require('../controllers/authControllers');

const { validateUser } = require('../utils/middlewares/validators');

const router = express.Router();

// Route to check if the user is authenticated
router.get('/check', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ isAuthenticated: true });
});

router.post('/signup', [validateUser, authControllers.signUpPost])

router.post('/login', authControllers.logInPost);

router.post('/login/demo', authControllers.demoLogInPost);

module.exports = router;