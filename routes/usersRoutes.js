const express = require('express');
const router = express.Router();
const usersControllers = require("../controllers/usersControllers");

// List all users
router.get('/', usersControllers.getUsers);

// Get a specific user
router.get('/:id', usersControllers.findUser);

// Update user details
router.put('/:id', usersControllers.updateUser);

// Delete a user
router.delete('/:id', usersControllers.deleteUser);

// Get all posts from a user
router.get('/:id/posts', usersControllers.getUserPosts);

module.exports = router;
