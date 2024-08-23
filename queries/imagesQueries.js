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
    uploadImages: async (imageData) => {
        try {
            await prisma.image.createMany({
                data: imageData,
            });
        }
        catch (error) {
            console.error("Error adding images", error);
            throw new Error("Error adding images");
        }
    },
    getImage: async (id) => {
        try {
            const image = await prisma.image.findUnique({
                where: {
                    id
                }
            });
            if (!image) {
                throw new Error("Cannot find image");
            }
            return image;
        }
        catch (error) {
            console.error("Error finding images", error);
            throw new Error("Error finding images");
        }
    },
    deleteImage: async (id) => {
        try {
            const image = await prisma.image.delete({
                where: {
                    id
                }
            });
            if (!image) {
                throw new Error("Cannot delete image");
            }
            return image;
        }
        catch (error) {
            console.error("Error deleting images", error);
            throw new Error("Error deleting images");
        }
    }
}