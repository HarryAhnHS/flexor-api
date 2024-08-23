const imagesQueries = require("../queries/imagesQueries");
const realmsQueries = require("../queries/realmsQueries");
const usersQueries = require("../queries/usersQueries");

module.exports = {
    uploadPostImages: async (req, res) => {
        const images = req.files;
        const postId = req.body.postId; // Get postId from req body
        try {
            // Handle images uploads if any
            if (images && images.length > 0) {
                const imageData = [];
                // For each file in uploaded images array, upload each file and push data into Image table
                for (const image of images) {
                    const result = await cloudinary.uploader.upload(image.path, {
                    resource_type: 'auto',
                    });
            
                    imageData.push({
                        url: result.secure_url, // Cloudinary URL
                        postId: postId,
                        publicId: result.public_id,  // Store the public ID for future deletion
                    });
            
                    // Remove local file after upload
                    fs.unlinkSync(image.path);
                }
                const uploadedImages = await imagesQueries.uploadImages(imageData);
                res.status(201).json({
                    message: "Successfully uploaded images",
                    uploadedImages
                });
            }
        }   
        catch(error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
    deletePostImage: async (req, res) => {
        const imageId = req.params.id;
        try {
            // Fetch the image from the database
            const image = await imagesQueries.getImage(imageId);
            if (image) {
                // Remove image from Cloudinary
                await cloudinary.uploader.destroy(image.publicId);
    
                // Delete image record from the database
                await imagesQueries.deleteImage(imageId);
    
                res.status(200).json({
                    message: "Successfully deleted image"
                });
            } else {
                res.status(404).json({
                    error: "Image not found"
                });
            }
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
    updateUserProfilePicture: async(req, res) => {
        const userId = req.user.id;
        const image = req.file;
        try {
            // Fetch current user profile picture current public id
            const currentId = await usersQueries.getUserProfilePicturePublicId(userId);

            // Upload new image
            const result = await cloudinary.uploader.upload(image.path, {
                resource_type: 'auto',
            });

            // Update user in the database with new image URL and public ID
            await usersQueries.updateUserProfilePicture(id, result.secure_url, result.public_id);

            // Delete old image if it exists and is not the default
            if (currentId !== process.env.DEFAULT_PROFILE_PICTURE_PUBLIC_ID) {
                await cloudinary.uploader.destroy(currentId);
            }

            // Respond with success
            res.status(200).json({
                message: "Succesfully updated user profile picture",
                profilePictureUrl: result.secure_url,
            });

            // Remove local file after upload
            fs.unlinkSync(image.path);
        } 
        catch (error) {
            res.status(500).json({
                error: error.message
            })
        } 
    },
    updateRealmPicture: async(req, res) => {
        const { realmId } = req.body; 
        const image = req.file;
        try {
            // Fetch current realm picture current public id
            const currentId = await realmsQueries.getRealmPicturePublicId(realmId);

            // Upload new image
            const result = await cloudinary.uploader.upload(image.path, {
                resource_type: 'auto',
            });

            // Update realm in the database with new image URL and public ID
            await realmsQueries.updateRealmPicture(id, result.secure_url, result.public_id);

            // Delete old image if it exists and is not the default
            if (currentId !== process.env.DEFAULT_REALM_PICTURE_PUBLIC_ID) {
                await cloudinary.uploader.destroy(currentId);
            }

            // Respond with success
            res.status(200).json({
                message: "Succesfully updated user profile picture",
                realmPictureUrl: result.secure_url,
            });

            // Remove local file after upload
            fs.unlinkSync(image.path);
        } 
        catch (error) {
            res.status(500).json({
                error: error.message
            })
        } 
    },


}