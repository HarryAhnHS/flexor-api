const controllers = require('../controllers/authControllers');
const express = require('express');

const validators = require('../utils/middlewares/validators');

const router = express.Router();

router.post('/signup', [validators.validateSignUp, controllers.signUpPost])

router.post('/login', passport.authenticate('jwt', { session: false }), controllers.logInPost);

module.exports = router;