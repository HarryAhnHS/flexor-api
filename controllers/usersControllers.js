const usersQueries = require('../queries/usersQueries');
const followsQueries = require('../queries/followsQueries');
const postsQueries = require('../queries/postsQueries');
const realmsQueries = require('../queries/realmsQueries');

module.exports = {
    getAllUsers: async(req, res) => {
        try {
            const users = await usersQueries.getAllUsers();
            res.status(200).json({
                users
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
        
    },
    getUser: async(req, res) => {
        const { id } = req.params;
        try {
            const user = await usersQueries.getUser("id", id)
            res.status(200).json({
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
            const posts = await postsQueries.getUserPosts(id);
            res.status(200).json({
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
            const drafts = await postsQueries.getUserDrafts(id);
            res.status(200).json({
                drafts
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getUserLikedPosts: async (req, res) => {
        const { id } = req.params;
        try {
            const likedPosts = await postsQueries.getUserLikedPosts(id);
            res.status(200).json({
                likedPosts
            })

        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getUserCommentedPosts: async (req, res) => {
        const { id } = req.params;
        try {
            const commentedPosts = await postsQueries.getUserCommentedPosts(id);
            res.status(200).json({
                commentedPosts
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
            const followerUsers = await usersQueries.getUserFollowers(id);
            res.status(200).json({
                followerUsers
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
            const followingUsers = await usersQueries.getUserFollowing(id);
            res.status(200).json({
                followingUsers
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getUserJoinedRealms: async (req, res) => {
        const { id } = req.params;
        try {
            const realms = await realmsQueries.getUserJoinedRealms(id);
            res.status(200).json({
                realms
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getUserCreatedRealms: async (req, res) => {
        const { id } = req.params;
        try {
            const realms = await realmsQueries.getUserCreatedRealms(id);
            res.status(200).json({
                realms
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
    
            res.status(200).json({
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
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await usersQueries.deleteUser(id);
            res.status(200).json({
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
            res.status(200).json({
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