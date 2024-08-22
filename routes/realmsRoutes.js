const express = require('express');
const router = express.Router();

// List all realms
router.get('/realms');
// Create a new realm
router.post('/realms');
// Retrieve a single realm by ID
router.get('/realms/:id')
// Update a realm by ID
router.put('/realms/:id')
// Delete a realm by ID
router.delete('/realms/:id')
// Get all posts in a specific realm
router.get('/realms/:id/posts')
// List all users following a specific realm
router.get('/realms/:id/followers')