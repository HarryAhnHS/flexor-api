const cloudinary = require('../utils/configs/cloudinary-config');
const fs = require('fs');

const usersQueries = require('../queries/usersQueries');
const followsQueries = require('../queries/followsQueries');

module.exports = {
    getUsers: async(req, res) => {
        try {
            const users = await usersQueries.getUsers();
            res.status(201).json({
                users
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
        
    },
    findUser: async(req, res) => {
        const { id } = req.params;
        try {
            const user = await usersQueries.findUser("id", id)
            if (!user) {
                return res.status(404).json({
                    error: "Post not found"
                })
            }
            res.status(201).json({
                user
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
        
    },
    updateUser: async (req, res) => {
        const { id } = req.params;
        // Create updated data object to handle optional fields
        var updateData = {};
        if (email) updateData.email = email;
        if (username) updateData.username = username;
        if (password) updateData.password = password; // Password needs hashing
        if (bio) updateData.bio = bio;
        try {
            const updatedUser = await usersQueries.updateUser(id, updateData);
    
            res.status(201).json({
                message: "Succesfully updated user details",
                user: updatedUser
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        } 
    },
    updateUserProfilePicture: async(req, res) => {
        const { id } = req.params;
        const image = req.file;
        try {
            // Fetch current user profile information
            const user = await usersQueries.findUser("id", id);
            const currentProfilePictureId = user.profilePictureId;

            // Upload new image
            const result = await cloudinary.uploader.upload(image.path, {
                resource_type: 'auto',
            });

            // Delete old image if it exists and is not the default
            if (currentProfilePictureId && 
                currentProfilePictureId !== process.env.DEFAULT_PROFILE_PICTURE_PUBLIC_ID) {
                await cloudinary.uploader.destroy(currentProfilePictureId);
            }
            // Update user in the database with new image URL and public ID
            await usersQueries.updateUserProfilePicture(id, result.secure_url, result.public_id);

            // Respond with success
            res.status(200).json({
                message: "Succesfully updated user profile picture",
                profilePictureUrl: result.secure_url,
            });

            // Remove local file after upload
            fs.unlinkSync(file.path);
          } 
          catch (error) {
            res.status(500).json({
                error: error.message
            })
          } 
    },
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await usersQueries.deleteUser(id);
            res.status(201).json({
                message: "Succesfully deleted user",
                user
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getUserPosts: async (req, res) => {
        const { id } = req.params;
        try {
            const posts = await usersQueries.getUserPosts(id);
            res.status(201).json({
                posts
            })

        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getUserDrafts: async (req, res) => {
        const { id } = req.params;
        try {
            const drafts = await usersQueries.getUserPosts(id, false);
            res.status(201).json({
                drafts
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getUserFollowers: async (req, res) => {
        const { id } = req.params;
        try {
            const followers = await usersQueries.getUserFollowers(id);
            res.status(201).json({
                followers
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getUserFollowing: async (req, res) => {
        const { id } = req.params;
        try {
            const following = await usersQueries.getUserFollowing(id);
            res.status(201).json({
                following
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    loggedUserFollow: async (req, res) => {
        const followerId = req.user.id;
        const followingId = req.params.id;
        try{
            const follow = await followsQueries.addFollow(followerId, followingId);
            res.status(201).json({
                message: "Succesfully followed user",
                follow
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    loggedUserUnfollow: async (req, res) => {
        const followerId = req.user.id;
        const followingId = req.params.id;
        try{
            const unfollow = await followsQueries.removeFollow(followerId, followingId);
            res.status(201).json({
                message: "Succesfully unfollowed user",
                unfollow
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    }
}