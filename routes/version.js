const express = require('express');
let versionRouter = express.Router();

const v1Controller = require('./v1');

/** Handler of versions for Consumer Cookinat */
versionRouter.use('/v1', v1Controller);

module.exports = versionRouter;