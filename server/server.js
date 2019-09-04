const express = require('express');
const consign = require('consign');
const app = express();
const cloud = require('cloudinary').v2;

cloud.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * @module server/server
 * @description Initialize certain files to create and configure the server, through the consign() function
 *              it calls the files specifying the order to be executed, and finally sending the express server object
 *              with the .into() function
 * @example 
 * consign()
 *          .include('./server/util/logger.js') 
 *          .then('./server/config/middlewares.js')
 *          .then('/routes/index.js')
 *          .then('./server/config/boot.js')
 *          .into(app);             
 */

consign()
    .include('./server/util/logger.js')
    .then('./server/config/middlewares.js')
    .then('/routes/index.js')
    .then('./server/config/boot.js')
    .into(app);

module.exports = app;