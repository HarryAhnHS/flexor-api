const commentsQueries = require("../queries/commentsQueries");

module.exports = {
    getAllComments: async (req, res) => {
        try {
            const comments = await commentsQueries.getAllComments();
            res.status(201).json({
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
            res.status(201).json({
                comment
            })
        }
        catch(error) {
            res.status(500).json({
                message: error.message
            })
        }
    },
    updateComment: async (req, res) => {
        const { id } = req.params;
        const commentContent = req.body.comment;
        try {
            const comment = await commentsQueries.updateComment(id, commentContent);
            res.status(201).json({
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
            res.status(201).json({
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
}