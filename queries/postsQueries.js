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
    getAllPosts: async () => {
        try {
            const posts = await prisma.post.findMany({});
            return posts;
        }
        catch(error) {
            console.error("Error getting all posts", error);
            throw new Error("Error getting all posts");
        }
    },
    createPost: async (postData) => {
        try {
            const post = await prisma.post.create({
                data: postData
            })
            return post;
        }
        catch(error) {
            console.error("Error creating post", error);
            throw new Error("Error creating post");
        }
    },
    getPost: async (id) => {
        try {
            const post = await prisma.post.findUnique({
                where: { id }
            })
            return post;
        }
        catch(error) {
            console.error("Error getting post", error);
            throw new Error("Error getting post");
        }
    },
    updatePost: async (id, updatedPostData) => {
        try {
            const post = prisma.post.update({
                where: { id },
                data: updatedPostData,
            })
            return post;
        }
        catch(error) {
            console.error("Error updating post", error);
            throw new Error("Error updating post");
        }
    },
    deletePost: async (id) => {
        try {
            const post = prisma.post.delete({
                where: { id }
            })
            return post;
        }
        catch(error) {
            console.error("Error deleting post", error);
            throw new Error("Error deleting post");
        }
    },
    getPostComments: async (id) => {
        try {
            const post = prisma.post.findUnique({
                where: {
                    id
                },
                include: {
                    comments: true
                }
            })
            return post.comments;
        }
        catch(error) {
            console.error("Error getting post comments", error);
            throw new Error("Error getting post comments");
        }
    },
    getPostLikes: async (id) => {
        try {
            const post = prisma.post.findUnique({
                where: {
                    id
                },
                include: {
                    likes: true
                }
            })
            return post.likes;
        }
        catch(error) {
            console.error("Error getting post likes", error);
            throw new Error("Error getting post likes");
        }
    },
}