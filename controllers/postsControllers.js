const cloudinary = require('../utils/configs/cloudinary-config');
const fs = require('fs');

const postsQueries = require("../queries/postsQueries");
const imagesQueries = require("../queries/imagesQueries");
const likesQueries = require('../queries/likesQueries');
const commentsQueries = require('../queries/commentsQueries');

module.exports = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await postsQueries.getAllPosts();
            // Respond with the created post
            res.status(201).json({
                posts
            });
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    createPost: async (req, res) => {
        // Create a new Post and handle both posts (published = true) and saves as draft
        // Realm, title, text + optional medias
        const { id } = req.user;
        const { realmId, title, text, published } = req.body;
        const images = req.files;
        try {
            // Validate required fields for published posts
            if (published && (!realmId || !title)) {
                return res.status(400).json({ error: 'Realm ID and title are required for published posts.' });
            }

            const postData = {
                title,
                text: text || '',
                published: published || false,
                realmId: realmId || null,  // Realm ID can be null for drafts
                authorId: id,  // Set the author as the user who created the post
            }
            // Create a new post
            const post = await postsQueries.createPost(postData);

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
                      postId: post.id,
                      publicId: result.public_id,  // Store the public ID for future deletion
                    });
            
                    // Remove local file after upload
                    fs.unlinkSync(image.path);
                }
                const uploadedImages = await imagesQueries.uploadImages(imageData);
            }
            // Respond with the created post
            res.status(201).json({
                message: "Succesfully created post",
                post,
                uploadedImages
            });
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getPost: async (req, res) => {
        const { id } = req.params;
        try {
            const post = await postsQueries.getPost(id);
            res.status(201).json({
                post
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    updatePost: async (req, res) => {
        const { id } = req.params;
        const { realmId, title, text, published } = req.body;
        const images = req.files;  // New images
        const removeImages = JSON.parse(req.body.removeImages || '[]');  // Image IDs to remove

        try {
            // Update post data
            const updatedPostData = {
                realmId,
                title,
                text,
                published,
            };

            // Update post in the database
            const updatedPost = await postsQueries.updatePost(id, updatedPostData);

            // Handle image removals
            if (removeImages.length > 0) {
                for (const imageId of removeImages) {
                    // Fetch the image from the database
                    const image = await imagesQueries.getImage(imageId);
                    if (image) {
                        // Remove image from Cloudinary
                        await cloudinary.uploader.destroy(image.publicId);  // Assuming you stored publicId
                        // Delete image record from the database
                        await imagesQueries.deleteImage(imageId);
                    }
                }
            }

            // Handle new image uploads
            if (images && images.length > 0) {
                const imageData = [];
                for (const image of images) {
                    const result = await cloudinary.uploader.upload(image.path, {
                        resource_type: 'auto',
                    });

                    imageData.push({
                        url: result.secure_url,
                        postId: updatedPost.id,
                        publicId: result.public_id,  // Store the public ID for future deletion
                    });

                    // Remove local file after upload
                    fs.unlinkSync(file.path);
                }
                const uploadedImages = await imagesQueries.uploadImages(imageData);
            }

            // Respond with the updated post
            res.status(201).json({
                message: "Succesfully updated post",
                updatedPost,
                uploadedImages
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    },
    deletePost: async (req, res) => {
        const { id } = req.params;
        try {
            const post = await postsQueries.deletePost(id);
            // Respond with the created post
            res.status(201).json({
                message: "Succesfully deleted post",
                post
            });
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getPostComments: async (req, res) => {
        const { id } = req.params;
        try {
            const comments = await postsQueries.getPostComments(id);
            // Respond with the created post
            res.status(201).json({
                comments
            });
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getPostLikes: async (req, res) => {
        const { id } = req.params;
        try {
            const likes = await postsQueries.getPostLikes(id);
            // Respond with the created post
            res.status(201).json({
                likes
            });
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    loggedUserLike: async (req, res) => {
        const userId = req.user.id;
        const postId = req.params.id;
        try {
            const like = await likesQueries.addLike(userId, postId);
            res.status(201).json({
                message: "Succesfully liked post",
                like
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    loggedUserUnlike: async (req, res) => {
        const userId = req.user.id;
        const postId = req.params.id;
        try {
            const like = await likesQueries.removeLike(userId, postId);
            res.status(201).json({
                message: "Successfully removed like from post",
                like
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    loggedUserAddComment: async (req, res) => {
        const userId = req.user.id;
        const postId = req.params.id;
        const commentContent = req.body.comment;

        try {
            // create root comment
            const comment = await commentsQueries.addComment(userId, postId, commentContent);
            res.status(201).json({
                message: "successfully created root comment to post",
                comment
            });
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
}