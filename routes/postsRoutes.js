const postsControllers = require('../controllers/postsControllers');
const upload = require('../utils/configs/multer-config');

const express = require('express');
const isAuthorized = require('../utils/middlewares/isAuthorized');
const router = express.Router();

// List all posts
router.get('/', postsControllers.getAllPosts);

// Get feed of posts based on following users + realms - req.query page and pageSize to paginate
router.get('/feed', postsControllers.getFeed);

// Get a specific post including realm, author, images, and post's root comments + count of nested comments
router.get('/:id', postsControllers.getPost);

// Get all users who liked a post
router.get('/:id/liked', postsControllers.getPostLikedUsers);

// Update a post
router.put('/:id', isAuthorized("post"), postsControllers.updatePost);

// Delete a post
router.delete('/:id', isAuthorized("post"), postsControllers.deletePost);

// Logged user to initialize a new blank unpublished post
router.post('/', postsControllers.initPost);

// Logged user to like a post
router.post('/:id/like', postsControllers.loggedUserLike);

// Logged user to unlike a post
router.delete('/:id/like', postsControllers.loggedUserUnlike);

// Logged user to add a root comment to a post (req.body.comment)
router.post('/:id/comment', postsControllers.loggedUserAddComment);

module.exports = router;
