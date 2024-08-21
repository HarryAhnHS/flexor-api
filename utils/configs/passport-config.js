const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('./models/user'); // Adjust the path to your User model
const jwtSecret = process.env.JWT_SECRET;

const db = require("../../db/queries");

module.exports = (passport) => {
    passport.use(new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret
    }, async (jwtPayload, done) => {
        try {
            // Find user by ID from JWT payload
            const user = await db.findUser("id", jwtPayload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }));
};
