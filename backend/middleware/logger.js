const express = require('express');

const app = express();

const logger = app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

module.exports = logger;