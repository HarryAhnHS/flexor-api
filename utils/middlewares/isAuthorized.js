const isAuthorized = (req, res, next) => {
    const userId = req.params.id || req.body.userId; // ID in the route or body
    if (req.user.id === userId) {
        return next();
    }
    return res.status(403).json({ message: 'Forbidden: Access is denied.' });
};

module.exports = isAuthorized;