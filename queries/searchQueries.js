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
    getSearchResults: async (query, type, page, limit) => {
        const skip = (page - 1) * limit;
        try {
            if (type === 'user') {
                const users = await db.user.findMany({
                    where: { username: { contains: query, mode: 'insensitive' } },
                    skip,
                    take: limit
                });
                return users;
            }
            else if (type === 'realm') {
                const realms = await db.realm.findMany({
                    where: { name: { contains: query, mode: 'insensitive' } },
                    skip,
                    take: limit
                });
                return realms;
            }
            else if (type === 'post') {
                const posts = await db.post.findMany({
                    where: {
                        OR: [
                            { title: { contains: query, mode: 'insensitive' } },
                            { content: { contains: query, mode: 'insensitive' } }
                        ]
                    },
                    skip,
                    take: limit
                });
                return posts;
            }
        }
        catch (error) {
            console.error('Error getting search results:', error);
            throw new Error('Error getting search results');
        }
    }
}