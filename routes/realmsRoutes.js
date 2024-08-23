const realmsController = require("../controllers/realmsController");
const express = require('express');
const router = express.Router();

// List all realms
router.get('/', realmsController.getAllRealms);
// Retrieve a single realm by ID - get meta data - num posts, num joined, creator info 
router.get('/realms/:id')
// Update a realm by ID
router.put('/realms/:id')
// Delete a realm by ID
router.delete('/realms/:id')
// Get all posts in a specific realm
router.get('/realms/:id/posts')
// List all users following a specific realm
router.get('/realms/:id/followers')

// Create a new realm
router.post('/:id', realmsController.getRealm);

module.exports = router;