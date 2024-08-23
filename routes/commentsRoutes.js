const express = require('express');
const commentsControllers = require('../controllers/commentsControllers');
const isAuthorized = require('../utils/middlewares/isAuthorized');
const router = express.Router();


// Get all comments
router.get('/', commentsControllers.getAllComments);

// Get a specific comment by id
router.get('/:id', commentsControllers.getComment);

// Update a specific comment
router.put('/comments/:id', isAuthorized, commentsControllers.updateComment);

// Delete a specific comment
router.delete('/comments/:id', isAuthorized, commentsControllers.deleteComment);

module.exports = router;
