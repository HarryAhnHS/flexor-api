const postsControllers = require('../controllers/postsControllers');
const upload = require('../utils/configs/multer-config');

const express = require('express');
const isAuthorized = require('../utils/middlewares/isAuthorized');
const router = express.Router();

// List all posts
router.get('/', postsControllers.getAllPosts);

// TODO Get feed of posts based on following users + realms
// router.get('/feed', postsControllers.getFeed);

// Get a specific post
router.get('/:id', postsControllers.getPost);

// Update a post
router.put('/:id', isAuthorized, postsControllers.updatePost);

// Delete a post
router.delete('/:id', isAuthorized, postsControllers.deletePost);

// Get all root comments under a post
router.get('/:id/comments', postsControllers.getPostComments);

// Get all likes from a post
router.get('/:id/likes', postsControllers.getPostLikes);

// Actions
// Create a new post or draft (published or not)
router.post('/', upload.array('image', 10), postsControllers.createPost);

// Logged user to like a post
router.post('/:id/like', postsControllers.loggedUserLike);

// Logged user to unlike a post
router.delete('/:id/like', postsControllers.loggedUserUnlike);

// Logged user to add a root comment to a post (req.body.comment)
router.post('/:id/comment', postsControllers.loggedUserAddComment);

module.exports = router;
