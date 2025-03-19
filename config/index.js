const path = require('path');
const express = require('express');
const logger = require('../middleware/logger.js');
const bodyParser = require('../middleware/bodyParser.js');


module.exports = (app) => {
    app.use(bodyParser())
    app.use(logger());
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'hbs');
    app.use(express.static(path.join(__dirname, '..', 'static-files')));
}