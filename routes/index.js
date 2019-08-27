const express = require('express');
const path = require('path');
const versionController = require('./version');
const system = require('./system');
const logger = require('../server/util/logger');

module.exports = (server) => {
  try {
    /** Root route */
    server.get('/', function (_, res) {
      res.sendFile('/index.html', { root: path.join(__dirname, '../webpage') });
    });
    /** Use Static files */
    server.use(express.static(path.join(__dirname, '../webpage')));
    /** Route for systems options */
    server.use('/', system)
    /** Route for apis */
    server.use('/api', versionController);
    
  } catch (error) {
    logger.error(error)
  }
};