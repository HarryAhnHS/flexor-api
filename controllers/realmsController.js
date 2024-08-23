const realmsQueries = require("../queries/realmsQueries");

module.exports = {
    getAllRealms: async (req, res) => {
        try {
            const realms = await realmsQueries.getAllRealms();
            // Respond with the created post
            res.status(201).json({
                realms
            });
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getRealm: async (req, res) => {
        const { id } = req.params;
        try {
            const realm = await realmsQueries.getRealm(id);
            // Respond with the created post
            res.status(201).json({
                realm
            });
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    }
}