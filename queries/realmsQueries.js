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
    getAllRealms: async () => {
        try {
            const realms = await prisma.realm.findMany({
                include: {
                    creator: true,
                    _count: {
                        select: {
                            posts: true,
                            joined: true,
                        }
                    }
                }
            });
            return realms;
        }
        catch(error) {
            console.error("Error getting all realms", error);
            throw new Error("Error getting all realms");
        }
    },
    getUserJoinedRealms: async (userId) => {
        try {
            const realms = await prisma.realm.findMany({
                where: {
                    joined: {
                        some: {
                            joinerId: userId
                        }
                    }
                },
                include: {
                    creator: true,
                    _count: {
                        select: {
                            posts: true,
                            joined: true,
                        }
                    }
                }
            });
            return realms;
        }
        catch(error) {
            console.error("Error getting user joined realms", error);
            throw new Error("Error getting user joined realms");
        }
    },
    getUserCreatedRealms: async (userId) => {
        try {
            const realms = await prisma.realm.findMany({
                where: {
                    creatorId: userId
                },
                include: {
                    creator: true,
                    _count: {
                        select: {
                            posts: true,
                            joined: true,
                        }
                    }
                }
            });
            return realms;
        }
        catch(error) {
            console.error("Error getting user created realms", error);
            throw new Error("Error getting user created realms");
        }
    },
    createRealm: async (creatorId, name, description) => {
        try {
            const realm = await prisma.realm.create({
                data: {
                    creatorId,
                    name,
                    description,
                    realmPictureUrl: process.env.DEFAULT_REALM_PICTURE_URL,
                    realmPicturePublicId: process.env.DEFAULT_REALM_PICTURE_PUBLIC_ID
                }
            })
            return realm;
        }
        catch(error) {
            console.error("Error getting all realms", error);
            throw new Error("Error getting all realms");
        }
    },
    updateRealm: async (id, name, description) => {
        try {
            const updatedRealm =  await prisma.realm.update({
                where: { 
                    id
                 },
                data: {
                    name,
                    description
                },
            });
            return updatedRealm;
        }
        catch(error) {
            console.error('Error updating realm', error);
            throw new Error('Error updating realm');
        }
    },
    deleteRealm: async (id) => {
        try {
            const deletedRealm =  await prisma.realm.delete({
                where: { 
                    id
                },
            });
            return deletedRealm;
        }
        catch(error) {
            console.error('Error deleting realm', error);
            throw new Error('Error deleting realm');
        }
    },
    getRealm: async (id) => {
        try {
            const realm = await prisma.realm.findUnique({
                where: {
                    id
                },
                include: {
                    creator: true,
                    _count: {
                        select: {
                            posts: true,
                            joined: true,
                        }
                    }
                }
            });
            console.log(realm);
            return realm;
        }
        catch(error) {
            console.error("Error getting realm", error);
            throw new Error("Error getting realm");
        }
    },
    getRealmPicturePublicId: async (id) => {
        try {
            const realm = await prisma.realm.findUnique({
                where: {
                    id
                }
            });
            return realm.realmPicturePublicId;
        } 
        catch (error) {
            console.error('Error getting realm picture public id', error);
            throw new Error('Error getting realm picture public id');
        } 
    },
    updateRealmPicture: async (id, url, public_id) => {
        try {
            const realm = await prisma.realm.update({
                where: { id },
                data: {
                    realmPictureUrl: url,
                    realmPicturePublicId: public_id,
                }
            })
            return realm;
        }
        catch(error) {
            console.error("Error updating realm picture", error);
            throw new Error("Error updating realm picture");
        }
    },
    existRealm: async (colName, value) => {
        try {
            const whereClause = { [colName]: value };
            const realm = await prisma.realm.findUnique({
                where: whereClause,
            });
            return realm;
        }
        catch(error) {
            console.error("Error getting realm existing", error);
            throw new Error("Error getting realm existing");
        }
    }
}