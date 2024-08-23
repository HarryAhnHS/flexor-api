const express = require('express');
const router = express.Router();
const upload = require('../utils/configs/multer-config');
const imagesControllers = require('../controllers/imagesControllers');
const isAuthorized = require('../utils/middlewares/isAuthorized');

// Route to upload images for posts - requires a postId as req body
router.post('/', upload.array('image', 10), imagesControllers.uploadPostImages);

// Route to delete post images
router.delete('/:id', imagesControllers.deletePostImage);

// Route to upload + update profile photo for user
router.post('/profile-picture', isAuthorized, upload.single('profilePhoto'), imagesControllers.updateUserProfilePicture);

// Route to upload + update profile photo for realm - requires a realmId as req body
router.post('/realm-picture', isAuthorized, upload.single('realmProfilePhoto'), imagesControllers.updateRealmPicture);

module.exports = router;
