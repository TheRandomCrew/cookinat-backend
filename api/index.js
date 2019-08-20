const express = require('express');
const path = require('path');
const versionController = require('./version');
const system = require('./system');

module.exports = (server) => {
  try {
    server.use('/', system)
    server.get('/', function (_, res) {
      res.sendFile('/index.html', { root: path.join(__dirname, '../webpage') });
    });
    server.use(express.static(path.join(__dirname, '../webpage')));
    server.use('/api', versionController);
  } catch (error) {
    console.error(error)
  }
};