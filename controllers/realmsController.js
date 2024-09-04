const joinRealmsQueries = require("../queries/joinRealmsQueries");
const realmsQueries = require("../queries/realmsQueries");
const usersQueries = require("../queries/usersQueries");
const postsQueries = require("../queries/postsQueries");
const notificationQueries = require("../queries/notificationQueries");

module.exports = {
    getAllRealms: async (req, res) => {
        try {
            const realms = await realmsQueries.getAllRealms();
            // Respond with the created post
            res.status(200).json({
                realms
            });
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    createRealm: async (req, res) => {
        const creatorId = req.user.id;
        const { name, description } = req.body;
        try {
            // If an existing realm with the same name is found return error
            const existingRealm = await realmsQueries.existRealm("name", req.body.name);
            if (existingRealm) {
                return res.status(400).json({
                    error: 'Realm name is already taken'
                });
            }
            const realm = await realmsQueries.createRealm(creatorId, name, description);
            res.status(201).json({
                message: "Successfully created realm",
                realm
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    updateRealm: async (req, res) => {
        const realmId = req.params.id;
        const { name, description } = req.body;
        try {
            // If an existing realm with the same name is found return error
            const existingRealm = await realmsQueries.existRealm("name", req.body.name);
            if (existingRealm && existingRealm.id !== realmId) {
                return res.status(400).json({
                    error: 'Realm name is already taken'
                });
            }

            const realm = await realmsQueries.updateRealm(realmId, name, description);
            res.status(200).json({
                message: "Realm updated successfully",
                realm
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    deleteRealm: async (req, res) => {
        const realmId = req.params.id;
        try {
            const realm = await realmsQueries.deleteRealm(realmId);
            res.status(200).json({
                message: "Realm deleted successfully",
                realm
            })
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
            console.log("id=",id);
            const realm = await realmsQueries.getRealm(id);
            // Respond with the created post
            res.status(200).json({
                realm
            });
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getRealmPosts: async (req, res) => {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        try {
            const { posts, total } = await postsQueries.getRealmPosts(id);
            res.status(200).json({
                posts,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    getRealmJoiners: async (req, res) => {
        const { id } = req.params;
        try {
            const users = await usersQueries.getRealmJoiners(id);
            res.status(200).json({
                users
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    loggedUserJoinRealm: async (req, res) => {
        const userId = req.user.id;
        const realmId = req.params.id;
        try{
            const join = await joinRealmsQueries.joinRealm(userId, realmId);
            res.status(201).json({
                message: "Succesfully joined realm",
                join
            })
            // Create Notification
            notificationQueries.createRealmJoinNotification(join.realm.creatorId, userId, realmId);
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    },
    loggedUserLeaveRealm: async (req, res) => {
        const userId = req.user.id;
        const realmId = req.params.id;
        try{
            const join = await joinRealmsQueries.leaveRealm(userId, realmId);
            res.status(200).json({
                message: "Succesfully left realm",
                join
            })
        }
        catch(error) {
            res.status(500).json({
                error: error.message
            })
        }
    }
}