const realmsController = require("../controllers/realmsController");
const isAuthorized = require("../utils/middlewares/isAuthorized");
const express = require('express');
const router = express.Router();

// List all realms
router.get('/', realmsController.getAllRealms);

// Logged user create a new realm
router.post('/:id', realmsController.createRealm);

// Update a realm by ID
router.put('/:id', isAuthorized, realmsController.updateRealm);

// Delete a realm by ID
router.delete('/:id', isAuthorized, realmsController.deleteRealm);

// Retrieve a single realm by ID - get meta data: num posts, num joined, creator info 
router.get('/:id', realmsController.getRealm);

// Get all posts in a specific realm
router.get('/:id/posts', realmsController.getRealmPosts);

// List all users following a specific realm
router.get('/:id/joiners', realmsController.getRealmJoiners);

// Logged user join a specific realm
router.post('/:id/join', realmsController.loggedUserJoinRealm);

// Logged user leave a specific realm
router.delete('/:id/join', realmsController.loggedUserLeaveRealm);


module.exports = router;