const express = require('express');
const router = express.Router();

// Like a post
router.post('/posts/:postId/likes', (req, res) => {
  // Handle liking a post
});

// Remove like from a post
router.delete('/posts/:postId/likes', (req, res) => {
  // Handle removing a like from a post
});

// Follow a user
router.post('/users/:userId/follow', (req, res) => {
  // Handle following a user
});

// Unfollow a user
router.delete('/users/:userId/follow', (req, res) => {
  // Handle unfollowing a user
});

module.exports = router;
