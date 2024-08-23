const express = require('express');
const passport = require('passport');

const controllers = require('../controllers/authControllers');

const validators = require('../utils/middlewares/validators');

const router = express.Router();

router.post('/signup', [validators.validateSignUp, controllers.signUpPost])

router.post('/login', controllers.logInPost);

module.exports = router;