require("dotenv").config();

const express = require("express");

const indexRouter = require("./routes/index");

const app = express();

app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For application/x-www-form-urlencoded form-data

app.use((req, res, next) => {
    console.log('Request Header:', req.header); // Log request body to debug
    console.log('Request Body:', req.body); // Log request body to debug
    next();
});

app.use('/', indexRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("App listening on port ", port);
})