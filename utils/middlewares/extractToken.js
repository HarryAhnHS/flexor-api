module.exports = function extractToken(req, res, next) {
    // FORMAT OF REQ TOKEN
    // Authorization: Bearer <access_token>
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader === "undefined") {
        // undefined token - Forbidden
        res.status(403).json({
            message: "Forbidden without token"
        })
    }
    else {
        // Extract and assign token to request token
        req.token = bearerHeader.split(" ")[1];
        // Next middleware
        next();
    }
};