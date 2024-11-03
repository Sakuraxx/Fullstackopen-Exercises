const express = require("express");
const cors = require("cors");
require('express-async-errors')
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const app = express();

const usersRouter = require('./controllers/users');

const loginRouter = require('./controllers/login');

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing');
    app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
