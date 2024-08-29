const express = require('express');
const router = express.Router();
const upload = require('../utils/configs/multer-config');
const imagesControllers = require('../controllers/imagesControllers');
const isAuthorized = require('../utils/middlewares/isAuthorized');

// Logged user to upload images + generate imageId (uuid) from front-end
router.post('/', upload.single('image'), imagesControllers.uploadPostImage);

// User to delete images with imageId
router.delete('/:id', isAuthorized("image"), imagesControllers.deletePostImage);

// Logged user to upload + update profile photo url and public id for themselves
router.put('/profile-picture', upload.single('profilePicture'), imagesControllers.updateUserProfilePicture);

// User who created realm to upload + update profile photo for realm - requires a realmId as req body
router.put('/:id/realm-picture', isAuthorized("realm"), upload.single('realmPicture'), imagesControllers.updateRealmPicture);

// Endpoint for sender user to upload images for socket
router.post('/:id/socket/upload', isAuthorized("user"), upload.single('socketImage'), imagesControllers.uploadSocketImage);

module.exports = router;
