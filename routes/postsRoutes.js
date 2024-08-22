const express = require('express');
const router = express.Router();

// List all posts
router.get('/', (req, res) => {
  // Handle listing posts with optional filters
});

/// Create a new post or draft (published or not)
router.post('/', upload.array('media', 10), usersControllers.createUserPost);

// Get a specific post
router.get('/posts/:id', (req, res) => {
  // Handle fetching post details by ID
});

// Update a post
router.put('/posts/:id', (req, res) => {
  // Handle updating a post by ID
});

// Partially update a post
router.patch('/posts/:id', (req, res) => {
  // Handle partial updates to a post by ID
});

// Delete a post
router.delete('/posts/:id', (req, res) => {
  // Handle deleting a post by ID
});

module.exports = router;
