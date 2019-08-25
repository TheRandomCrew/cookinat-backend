const express = require('express');
let system = express.Router();

const ping = require('./ping');
const postUpload = require('./postUpload');
/**
 * Routes
 */
/** Check ping */
system.get('/ping', ping);
/** Upload images to Cloudinary */
system.post('/upload', postUpload);

module.exports = system;