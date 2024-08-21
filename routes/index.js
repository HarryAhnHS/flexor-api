const indexControllers = require('../controllers/index');
const express = require('express');

const validators = require('../utils/middlewares/validators');

const indexRouter = express.Router();

indexRouter.get('/', indexControllers.indexGet);

indexRouter.post('/signup', [validators.validateSignUp, indexControllers.signUpPost])

indexRouter.post('/login', passport.authenticate('jwt', { session: false }), indexControllers.logInPost);

indexRouter.post('/post', passport.authenticate('jwt', { session: false }), indexControllers.postPost);

module.exports = indexRouter;