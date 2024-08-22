const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

module.exports = {
    findUser: async (colName, query) => {
        try {
            const whereClause = { [colName]: query };
            const user = await prisma.user.findUnique({
                where: whereClause
            })
            return user;
        } catch (error) {
            console.error('Error finding user:', error);
            throw error;
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
            throw error;
        }
    },
}