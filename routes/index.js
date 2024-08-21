const indexControllers = require('../controllers/index');
const express = require('express');

const extractToken = require('../utils/middlewares/extractToken');
const validators = require('../utils/middlewares/validators');

const indexRouter = express.Router();

indexRouter.get('/', indexControllers.indexGet);

indexRouter.post('/signup', [validators.validateSignUp, indexControllers.signUpPost])

indexRouter.post('/login', indexControllers.logInPost);

indexRouter.post('/post', extractToken, indexControllers.postPost);

module.exports = indexRouter;