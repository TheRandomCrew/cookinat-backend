const express = require('express');
const path = require('path');
const consumer = require('./v1/consumer');
const system = require('./system');
const logger = require('../server/util/logger');

/** @module  routes/index */

/**
 * @function
 * @description Sets the virtual routes to receive requests through the URL
 *
 * @param {Object} app
 */

module.exports = (app) => {
    try {
        /* Use Static files */
        app.use(express.static(path.join(__dirname, '../webpage')));
        /* Root route */
        app.get('/', function(req, res) {
            //res.json({ hola: 'como estas' });
            res.sendFile('/index.html', { root: path.join(__dirname, '../webpage') });
        });

        /* Route for systems options */
        /* Check ping */
        app.get('/ping', system.ping);
        /* Upload images to Cloudinary */
        app.post('/upload', system.upload);

        /* Route for apis */
        app.use('/api/v1/consumer', consumer);

    } catch (error) {
        logger.error(error)
    }
};