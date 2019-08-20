const express = require('express');
let system = express.Router();
const ping = require('./ping');
const postUpload = require('./postUpload');
system.get('/ping', ping);
system.post('/upload', postUpload)

module.exports = system;