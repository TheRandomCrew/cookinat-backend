const express = require('express');
let v1router = express.Router();

const consumerController = require('./consumer');

v1router.use('/consumer', consumerController);

module.exports = v1router;