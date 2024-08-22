const express = require('express');
const router = express.Router();

// Like a post
router.post('/posts/:postId/like', (req, res) => {
  // Handle liking a post
});

// Remove like from a post
router.delete('/posts/:postId/like', (req, res) => {
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

// Join a realm
router.post('/realms/:realmId/join', (req, res) => {
});

// Unjoin a realm
router.delete('/realms/:realmId/join', (req, res) => {
});

module.exports = router;
