const postsQueries = require("../queries/postsQueries");

module.exports = {
    createPost: async (req, res) => {
        // Create a new Post and handle both posts (published = true) and saves as draft
        // Realm, title, text + optional medias
        const { id } = req.user;
        const { realmId, title, text, published } = req.body;
        const mediaFiles = req.files;
        try {
            // Validate required fields for published posts
            if (published && (!realmId || !title)) {
                return res.status(400).json({ error: 'Realm ID and title are required for published posts.' });
            }

            const postData = {
                title,
                text: text || '',
                published: published || false,
                realmId: realmId || null,  // Realm ID can be null for drafts
                authorId: id,  // Set the author as the user who created the post
            }
            // Create a new post
            const post = await postsQueries.createPost(postData);

            // Handle media uploads if any
            if (mediaFiles && mediaFiles.length > 0) {
                const mediaData = mediaFiles.map(file => ({
                    url: file.path,  // Save the file path or URL (should be updated if using cloud storage)
                    type: file.mimetype.startsWith('video/') ? 'VIDEO' : 'IMAGE',
                    postId: post.id,
                }));

                await prisma.media.createMany({
                    data: mediaData,
                });
            }
            // Respond with the created post
            res.status(201).json(post);
        }
        catch(error) {

        }
    }
}