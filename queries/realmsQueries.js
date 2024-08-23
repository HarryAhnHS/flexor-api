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
            const realms = await prisma.realm.findMany({});
            return realms;
        }
        catch(error) {
            console.error("Error getting all realms", error);
            throw new Error("Error getting all realms");
        }
    },
    // getRealm: async (id) => {
    //     try {
    //         const realm = await prisma.realm.findUnique({
    //             where: {
    //                 id
    //             },
    //             include: {
    //                 creator,
    //                 _count:
    //             }
    //         });
    //         return realm;
    //     }
    //     catch(error) {
    //         console.error("Error getting realm", error);
    //         throw new Error("Error getting realm");
    //     }
    // },
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
    }

}