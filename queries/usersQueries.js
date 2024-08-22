const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcryptjs');

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
    getUsers: async () => {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            console.error('Error getting users:', error);
            throw new Error('Error getting users');
        } 
    },
    findUser: async (colName, query) => {
        try {
            const whereClause = { [colName]: query };
            const user = await prisma.user.findUnique({
                where: whereClause
            })
            return user;
        } catch (error) {
            console.error('Error finding user:', error);
            throw new Error('Error finding user');
        }
    },
    addUser: async (email, username, password) => {
        try {
            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(hashedPassword);
                });
            });
            const user = await prisma.user.create({
                data: {
                    email: email,
                    username: username,
                    password: hashedPassword,
                }
            })

            return user;
        }
        catch(error) {
            console.error('Error adding user', error);
            throw new Error('Error adding user');
        }
    },
    updateUser: async (id, updateData) => {
        try {
            // Update password if exists in updateData
            if (updateData.password) {
                const hashedPassword = await new Promise((resolve, reject) => {
                    bcrypt.hash(password, 10, (err, hashedPassword) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(hashedPassword);
                    });
                });
                updateData.password = hashedPassword;
            };
    
            return await prisma.user.update({
                where: { id },
                data: updateData,
            });
        }
        catch(error) {
            console.error('Error updating user', error);
            throw new Error('Error updating user');
        }
    },
    deleteUser: async (id) => {
        try {
            const deletedUser = await prisma.user.delete({
                where: { id }
            })
            return deletedUser;
        }
        catch(error) {
            console.error("Error deleting user", error);
            throw new Error("Error deleting user");
        }
    },
    getUserPosts: async (id, published = true) => {
        try {
            const isPublished = published; 
            const user = await prisma.user.findUnique({
                where: { id },
                include: {
                    posts: {
                        where: {
                            published: isPublished
                        }
                    }
                }
            })
            if (!user) {
                throw new Error("User not found")
            }
            return user.posts;
        }
        catch(error) {
            console.error("Error getting users posts", error);
            throw new Error("Error getting users posts");
        }
    },
    getUserFollowers: async (id) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
                include: {
                    followers: true
                }
            })
            return user.followers;
        }
        catch(error) {
            console.error("Error getting user's followers", error);
            throw new Error("Error getting user's followers");
        }
    },
    getUserFollowing: async (id) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
                include: {
                    following: true
                }
            })
            return user.following;
        }
        catch(error) {
            console.error("Error getting user's following", error);
            throw new Error("Error getting user's following");
        }
    }
}