const upload = require('../utils/configs/multer-config');
const isAuthorized = require('../utils/middlewares/isAuthorized');

const express = require('express');
const router = express.Router();
const usersControllers = require("../controllers/usersControllers");


// List all users
router.get('/', usersControllers.getUsers);

// Get a specific user
router.get('/:id', usersControllers.findUser);

// Update user details except profile photo
router.put('/:id', isAuthorized, usersControllers.updateUser);

// TODO Update profile photo for user
router.put('/:id/profile-picture', isAuthorized, upload.single('profilePicture'), usersControllers.updateUserProfilePicture);

// Delete a user
router.delete('/:id', isAuthorized, usersControllers.deleteUser);

// Get all posts from a user
router.get('/:id/posts', usersControllers.getUserPosts);

// Get all drafts from a user
router.get('/:id/posts/drafts', isAuthorized, usersControllers.getUserDrafts);

// Get all followers from a user
router.get('/:id/followers', usersControllers.getUserFollowers);

// Get all following from a user
router.get('/:id/following', usersControllers.getUserFollowing);

// Follow a user
router.post('/:id/follow', usersControllers.loggedUserFollow);

// Unfollow a user
router.delete('/:id/follow', usersControllers.loggedUserUnfollow);

module.exports = router;
