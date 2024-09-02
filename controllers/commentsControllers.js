const commentLikesQueries = require("../queries/commentLikesQueries");
const commentsQueries = require("../queries/commentsQueries");
const notificationQueries = require("../queries/notificationQueries");
const usersQueries = require("../queries/usersQueries");

module.exports = {
    getAllComments: async (req, res) => {
        try {
            const comments = await commentsQueries.getAllComments();
            res.status(200).json({
                comments
            })
        }
        catch(error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    getComment: async (req, res) => {
        const { id } = req.params;
        try {
            const comment = await commentsQueries.getComment(id);
            res.status(200).json({
                comment
            })
        }
        catch(error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    updateCommentContent: async (req, res) => {
        const { id } = req.params;
        const commentContent = req.body.comment;
        try {
            const comment = await commentsQueries.updateCommentContent(id, commentContent);
            res.status(200).json({
                message: "Succesfully updated comment",
                comment
            })
        }
        catch(error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    deleteComment: async (req, res) => {
        const { id } = req.params;
        try {
            const comment = await commentsQueries.deleteComment(id);
            res.status(200).json({
                message: "Successfully deleted comment",
                comment
            })
        }
        catch(error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    getUsersWhoLikedComment: async (req, res) => {
        const commentId = req.params.id;
        try {
            const users = await usersQueries.getUsersWhoLikedComment(commentId);
            res.status(200).json({
                users
            })

        }
        catch(error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    getNestedComments: async (req, res) => {
        const { id } = req.params;
        try {
            const nestedComments = await commentsQueries.getNestedComments(id);
            res.status(200).json({
                nestedComments
            })
        }
        catch(error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    addNestedComment: async (req, res) => {
        const userId = req.user.id; // Assuming user is authenticated and their ID is stored in req.user
        const parentId  = req.params.id; // Get the parent comment ID from the URL
        const { postId, comment } = req.body; // Get postId and comment content from the request body
        try {
            const nestedComment = await commentsQueries.addNestedComment(userId, postId, comment, parentId);
            res.status(201).json({
                message: "Successfully created nested comment",
                comment: nestedComment
            })
            // Create Notification
            notificationQueries.createCommentReplyNotification(nestedComment.parent.userId, userId, parentId);
        }
        catch(error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    loggedUserLikeComment: async (req, res) => {
        const userId = req.user.id;
        const commentId = req.params.id;
        try {
            const commentLike = await commentLikesQueries.addCommentLike(userId, commentId);
            res.status(201).json({
                message: "Successfully liked a comment",
                commentLike
            })
            // Create Notification
            notificationQueries.createCommentLikeNotification(commentLike.comment.userId, userId, commentId);
        }
        catch(error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    loggedUserUnlikeComment: async (req, res) => {
        const userId = req.user.id;
        const commentId = req.params.id;
        try {
            const commentLike = await commentLikesQueries.removeCommentLike(userId, commentId);
            res.status(200).json({
                message: "Successfully removed a comment",
                commentLike
            })
        }
        catch(error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}