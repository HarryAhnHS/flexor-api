const express = require('express');
const isAuthorized = require('../utils/middlewares/isAuthorized');
const notificationsControllers = require('../controllers/notificationsControllers');
const router = express.Router();

router.get('/', notificationsControllers.getNotifications);

module.exports = router;