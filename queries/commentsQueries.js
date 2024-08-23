const { PrismaClient } = require("@prisma/client");

// Set database based on test or development node_env
const databaseUrl = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL;

const prisma = new PrismaClient({
    datasources: {
        db: {
        url: databaseUrl,
        },
    },
});

module.exports = {
    getAllComments: async () => {
        try {
            const comments = await prisma.comment.findMany({});
            return comments;
        }
        catch(error) {
            console.error("Error getting all comments", error);
            throw new Error("Error getting all comments");
        }
    },
    getComment: async (id) => {
        try {
            const comment = await prisma.comment.findUnique({});
            return comment;
        }
        catch(error) {
            console.error("Error getting comment by id", error);
            throw new Error("Error getting comment by id");
        } 
    },
    addRootComment: async (userId, postId, commentContent) => {
        try {
            const comment = await prisma.comment.create({
                data: {
                  comment: commentContent,
                  userId,
                  postId,
                },
            });
            return comment;
        }
        catch(error) {
            console.error("Error adding comment", error);
            throw new Error("Error adding comment");
        }
    },
    updateCommentContent: async (id, commentContent) => {
        try {
            const comment = await prisma.comment.update({
                where: {
                    id
                },
                data: {
                  comment: commentContent,
                },
            });
            return comment;
        }
        catch(error) {
            console.error("Error editing comment", error);
            throw new Error("Error editing comment");
        }
    },
    deleteComment: async (id) => {
        try {
            const comment = await prisma.comment.delete({
                where: {
                    id
                }
            });
            return comment;
        }
        catch(error) {
            console.error("Error deleting comment", error);
            throw new Error("Error deleting comment");
        }
    },
    getNestedComments: async (id) => {
        try {
            const comment = await prisma.comment.findMany({
                where: {
                    parentId: id
                },
                include: {
                    user,
                    _count: {
                        select: {
                            likes
                        }
                    }
                },
            });
            return comment;
        }
        catch(error) {
            console.error("Error getting nested comments", error);
            throw new Error("Error getting nested comments");
        }
    },
    addNestedComment: async (userId, postId, commentContent, parentId) => {
        try {
            const comment = await prisma.comment.create({
                data: {
                    comment: commentContent,
                    userId,
                    postId,
                    parentId,
                },
            });
            return comment;
        } 
        catch (error) {
            console.error("Error adding nested comment", error);
            throw new Error("Error adding nested comment");
        }
    },

}