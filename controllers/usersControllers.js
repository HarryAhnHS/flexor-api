const usersQueries = require('../queries/usersQueries');

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
        try {
            const { id } = req.params;
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
    updateUser: async(req, res) => {
        try {
            const { id } = req.params;
            // Create updated data object to handle optional fields
            var updateData = {};
            if (email) updateData.email = email;
            if (username) updateData.username = username;
            if (password) updateData.password = password; // Password needs hashing
            if (bio) updateData.bio = bio;
    
            const updatedUser = await usersQueries.updateUser(id, updateData);
    
            res.status(201).json({
                user: updatedUser
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        } 
    },
    // TODO
    // updateUserProfilePicture: async(req, res) => {
    // },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await usersQueries.deleteUser(id);
            if (!deletedUser) {
                return res.status(404).json({
                    error: "User not found to delete"
                })
            }
            res.status(201).json({
                message: "User deleted successfully"
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getUserPosts: async (req, res) => {
        try {
            const { id } = req.params;
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
        try {
            const { id } = req.params;
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
        try {
            const { id } = req.params;
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
        try {
            const { id } = req.params;
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
}