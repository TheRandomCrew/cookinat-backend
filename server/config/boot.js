'use strict';
// const fs = require('fs');
const http = require('http');
const https = require('https');
const logger = require('../util/logger');

/** @module server/config/boot */


/**
 * @function
 * @description Creates HTTP or HTTPs server, and start to listen for requests
 * @param {Object} app
 */
module.exports = (app) => {

    //ACA SE DEBERIA VALIDAR ES SI EXISTE ALGUN CERTIFICADO
    if (process.env.NODE_ENV === 'production') {

        /**
         * @constant httpsPort 
         * @type {Number}
         * @description Contains the port number to listen in the HTTPS context
         */
        const httpsPort = normalizePort(process.env.PORT_HTTPS || 8081);

        /** 
         * @constant options
         * @type {JSON}
         * @description Contains options to create HTTPS server
         */

        const options = {
            // cert: fs.readFileSync('cert/cert.pem'),
            // key: fs.readFileSync('cert/key.pem')
        };

        //SI EL PUERTO HTTPs ES MENOR QUE CERO O NO ES UN NUMERO EL SERVIDOR NO SE CREARA
        if (!httpsPort) {
            throw new Error('Error: El puerto HTTP, no es un numero o es menor que cero');
        }
        https.createServer(options, app)
            .listen(httpsPort)
            .on('error', onError)
            .on('listening', onListening);
    } else {

        /**
         * @constant httpPort 
         * @type {Number}
         * @description Contains the port number to listen in the HTTP context
         */

        const httpPort = normalizePort(process.env.PORT_HTTP || 8080);
        try {
            //SI EL PUERTO HTTP ES MENOR QUE CERO O NO ES UN NUMERO EL SERVIDOR NO SE CREARA
            if (!httpPort) {
                throw new Error('Error: El puerto HTTP, no es un numero o es menor que cero');
            }
            http.createServer(app)
                .listen(httpPort)
                .on('error', onError)
                .on('listening', onListening);
        } catch (e) {
            console.log(e.message);
        }
    }

    /**
     * @function normalizePort
     * @description Validates if the port value if valid to proceed and create the server
     *
     * @param {Number | String} val Port number
     * @returns If the value is valid returns the port number, otherwise returns false
     */
    function normalizePort(val) {
        const port = parseInt(val, 10);
        //console.log(x);
        if (isNaN(port)) {
            // named pipe
            return false;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * @function onError
     * @description Event listener for HTTP server "error" event, and log it into the Error log file
     *
     * @param {Object} error Error object
     */

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const port = this.cert ? httpsPort : httpPort;

        const bind = typeof port === 'string' ?
            `Pipe ${port}` :
            `Port ${port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                logger.error(` ${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * @function onListening
     * @description Event listener for HTTP server "listening" event, and log it into the Server log file
     */
    function onListening() {
        const addr = this.address();
        const type = this.cert ? '(HTTPS)' : '(HTTP)';
        const bind = (typeof addr === 'string' ?
            `pipe ${addr}` :
            `port ${addr.port}`) + ` ${type}`;

        // TODO: Add a link to SWAGGER and to GRAPHQL
        logger.info(`Check API Docs on http://127.0.0.1:8080/cookinat_api_test`);
    }
};