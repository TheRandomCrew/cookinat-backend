const express = require('express');
let system = express.Router();

const ping = require('./ping');

/**
 * Routes
 */
/** Check ping */
system.get('/ping', ping);


module.exports = system;