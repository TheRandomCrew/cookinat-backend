const express = require('express');
const consign = require('consign');
const app = express();

/**
* Module Structure
*/
consign()
    .include('./server/util/logger.js')
    .then('./server/config/middlewares.js')
    .then('./server/config/apollo.js')
    .then('/routes/index.js')
    .then('./server/config/boot.js')
    .into(app);

module.exports = app;