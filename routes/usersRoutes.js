const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure the storage location

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

// Get all drafts from a user
router.get('/:id/posts/drafts', usersControllers.getUserDrafts);

// Get all followers from a user
router.get('/:id/followers', usersControllers.getUserFollowers);

// Get all following from a user
router.get('/:id/following', usersControllers.getUserFollowing);

// TODO Update profile photo for user
// router.put('/:id/profile-picture', upload.single('profilePicture'), usersControllers.updateUserProfilePicture);

module.exports = router;
