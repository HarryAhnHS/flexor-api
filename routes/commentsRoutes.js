const express = require('express');
const router = express.Router();

// List all comments for a post
router.get('/posts/:postId/comments', (req, res) => {
  // Handle listing comments for a specific post
});

// Add a new comment to a post
router.post('/posts/:postId/comments', (req, res) => {
  // Handle adding a new comment to a post
});

// Get a specific comment
router.get('/comments/:id', (req, res) => {
  // Handle fetching comment details by ID
});

// Update a specific comment
router.patch('/comments/:id', (req, res) => {
  // Handle updating a specific comment by ID
});

// Delete a specific comment
router.delete('/comments/:id', (req, res) => {
  // Handle deleting a specific comment by ID
});

module.exports = router;
