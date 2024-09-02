const { PrismaClient } = require("@prisma/client");
const { getIO } = require('../utils/middlewares/socket');

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

module.exports = ({
    createUserFollowNotification: async (userId, actorId) => {
        try {
            const notification = await prisma.notification.create({
                data: {
                    userId,
                    actorId,
                    type: 'follow',
                },
            });

            // Emit a socket event to the user's room
            const io = getIO(); // Get the initialized io instance
            io.to(`notifications_${userId}`).emit('receiveNotification', notification);

            return notification;
        } catch (error) {
            console.error('Error creating user follow notification', error);
            throw new Error('Error creating user follow notification');
        }
    },

    createRealmJoinNotification: async (userId, actorId, realmId) => {
        try {
            const notification = await prisma.notification.create({
                data: {
                    userId,
                    actorId,
                    type: 'realm_join',
                    sourceId: realmId,
                },
            });

            // Emit a socket event to the user's room
            const io = getIO(); // Get the initialized io instance
            io.to(`notifications_${userId}`).emit('receiveNotification', notification);

            return notification;
        } catch (error) {
            console.error('Error creating realm join notification', error);
            throw new Error('Error creating realm join notification');
        }
    },

    createPostLikeNotification: async (userId, actorId, postId) => {
        try {
            const notification = await prisma.notification.create({
                data: {
                    userId,
                    actorId,
                    type: 'post_like',
                    sourceId: postId,
                },
            });

            // Emit a socket event to the user's room
            const io = getIO(); // Get the initialized io instance
            io.to(`notifications_${userId}`).emit('receiveNotification', notification);

            return notification;
        } catch (error) {
            console.error('Error creating post like notification', error);
            throw new Error('Error creating post like notification');
        }
    },

    createPostCommentNotification: async (userId, actorId, postId) => {
        try {
            const notification = await prisma.notification.create({
                data: {
                    userId,
                    actorId,
                    type: 'post_comment',
                    sourceId: postId,
                },
            });

            // Emit a socket event to the user's room
            const io = getIO(); // Get the initialized io instance
            io.to(`notifications_${userId}`).emit('receiveNotification', notification);

            return notification;
        } catch (error) {
            console.error('Error creating post comment notification', error);
            throw new Error('Error creating post comment notification');
        }
    },

    createCommentLikeNotification: async (userId, actorId, commentId) => {
        try {
            const notification = await prisma.notification.create({
                data: {
                    userId,
                    actorId,
                    type: 'comment_like',
                    sourceId: commentId,
                },
            });

            // Emit a socket event to the user's room
            const io = getIO(); // Get the initialized io instance
            io.to(`notifications_${userId}`).emit('receiveNotification', notification);

            return notification;
        } catch (error) {
            console.error('Error creating comment like notification', error);
            throw new Error('Error creating comment like notification');
        }
    },

    createCommentReplyNotification: async (userId, actorId, commentId) => {
        try {
            const notification = await prisma.notification.create({
                data: {
                    userId,
                    actorId,
                    type: 'comment_reply',
                    sourceId: commentId,
                },
            });

            // Emit a socket event to the user's room
            const io = getIO(); // Get the initialized io instance
            io.to(`notifications_${userId}`).emit('receiveNotification', notification);

            return notification;
        } catch (error) {
            console.error('Error creating comment reply notification', error);
            throw new Error('Error creating comment reply notification');
        }
    },
});
