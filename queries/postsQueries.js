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
    getUserPosts: async (userId) => {
        try {
            const posts = await prisma.post.findMany({
                where: { 
                    userId,
                    published: true
                },
                include: {
                    realm: true,
                    images: true,
                    author: true,
                    _count: {
                        select: {
                            likes: true,
                            comments: true,
                        }
                    },
                }
            })
            return posts;
        }
        catch(error) {
            console.error("Error getting users posts", error);
            throw new Error("Error getting users posts");
        }
    }, 
    getUserDrafts: async (userId) => {
        try {
            const drafts = await prisma.post.findMany({
                where: { 
                    userId,
                    published: false
                },
                include: {
                    realm: true,
                    images: true,
                    author: true,
                }
            })
            return drafts;
        }
        catch(error) {
            console.error("Error getting users drafts", error);
            throw new Error("Error getting users draft");
        }
    },
    getUserLikedPosts: async (userId) => {
        try {
            const likedPosts = await prisma.post.findMany({
                where: {
                    published: true,
                    likes: {
                        some: {
                            userId
                        }
                    }
                },
                include: {
                    realm: true,
                    images: true,
                    author: true,
                    _count: {
                        select: {
                            likes: true,
                            comments: true,
                        }
                    },
                }
            })
            return likedPosts;
        }
        catch(error) {
            console.error("Error getting users liked posts", error);
            throw new Error("Error getting users liked posts");
        }
    },
    getUserCommentedPosts: async (userId) => {
        try {
            const commentedPosts = await prisma.post.findMany({
                where: {
                    published: true,
                    OR: [
                        {
                            comments: {
                                some: {
                                    userId: userId,  // Root comments by the user
                                },
                            },
                        },
                        {
                            comments: {
                                some: {
                                    nestedComments: {
                                        some: {
                                            userId: userId,  // Nested comments by the user
                                        },
                                    },
                                },
                            },
                        },
                    ],
                },
                include: {
                    realm: true,
                    images: true,
                    author: true,
                    _count: {
                        select: {
                            likes: true,
                            comments: true,
                        }
                    },
                }
            })
            return commentedPosts;
        }
        catch(error) {
            console.error("Error getting users commented posts", error);
            throw new Error("Error getting users commented posts");
        }
    },
    getPost: async (id) => {
        try {
            const post = await prisma.post.findUnique({
                where: { id },
                include: {
                    realm: true,
                    images: true,
                    author: true,
                    comments: {
                        include: {
                            user,
                            _count: {
                                select: {
                                    nestedComments: true,
                                    likes: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            likes: true
                        }
                    }
                }
            })
            return post;
        }
        catch(error) {
            console.error("Error getting post", error);
            throw new Error("Error getting post");
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
                where: { id },
            })
            return post;
        }
        catch(error) {
            console.error("Error deleting post", error);
            throw new Error("Error deleting post");
        }
    },
}