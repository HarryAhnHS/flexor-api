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

            // Respond with the created post
            res.status(201).json({
                message: "Succesfully created post",
                post
            });
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

            // Handle image removals using axios to call image delete route
            if (removeImages.length > 0) {
                for (const imageId of removeImages) {
                    await axios.delete(`/images/${imageId}`);
                }
            }

            // Respond with the updated post
            res.status(201).json({
                message: "Succesfully updated post",
                updatedPost
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
    getPostLikedUsers: async (req, res) => {
        const { id } = req.params;
        try {
            const usersWhoLikedPost = await usersQueries.getUsersWhoLikedPost(id);
            // Respond with the created post
            res.status(201).json({
                usersWhoLikedPost
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
            const comment = await commentsQueries.addRootComment(userId, postId, commentContent);
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
    loggedUserAddNestedComment: async (req, res) => {
        const userId = req.user.id;
        const postId = req.params.id;
        const commentContent = req.body.comment;
        try {
            const nestedComment = await commentsQueries.addNestedComment(id);
            res.status(201).json({
                nestedComment
            })
        }
        catch(error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
}