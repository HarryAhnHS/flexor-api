require("dotenv").config();

const passport = require('passport');
const express = require("express");

const sessionMiddleware = require("./utils/configs/session-config");
const passportConfig = require("./utils/configs/passport-config");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For application/x-www-form-urlencoded form-data

// Express Session + Passport for OAuth
app.use(sessionMiddleware);
app.use(passport.session());

// Initialize Passport configuration
passportConfig(passport);

// Debug middleware
app.use((req, res, next) => {
    console.log('Request Header:', req.header); // Log request body to debug
    console.log('Request Body:', req.body); // Log request body to debug
    next();
});

// Public routes for login + signup
app.use('/auth', authRoutes);

// Private Routes
app.use('/users', passport.authenticate('jwt', { session: false }), usersRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("App listening on port ", port);
})