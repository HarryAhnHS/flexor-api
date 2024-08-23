const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('sendMessage', async (message) => {
            try {
                // Save message to the database
                await prisma.message.create({
                    data: {
                        content: message.content || null,
                        imageUrl: message.imageUrl || null,
                        senderId: message.senderId,
                        receiverId: message.receiverId,
                    },
                });

                // Emit the message to the receiver
                socket.to(message.receiverId).emit('receiveMessage', message);
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('joinRoom', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined room`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
};
