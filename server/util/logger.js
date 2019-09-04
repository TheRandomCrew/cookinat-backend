const { createLogger, format, transports } = require('winston');
const fs = require('fs');

const level = process.env.LOG_LEVEL || 'debug';
const logDir = 'logs';

/** 
 * @module server/util/logger
 */

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

/** 
 * @constant logFormat
 * @type {Format}
 * @description Sets up format to be sent to the logger object
 */

const logFormat = format.combine(
        /** Information in the capital letters */
        format(info => {
            info.level = info.level.toUpperCase();
            return info;
        })(),
        /** Show with colors for level */
        format.colorize({ all: true }),
        /** Define format for data */
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS'
        }),
        /** Add tabs for show the info */
        format.align(),
        /** Interpolation splat for %d %s-style messages */
        format.splat(),
        /** Format for show info */
        format.printf((info) => {
                const { timestamp, label, level, group, message, ...args } = info;
                return `${timestamp}${label ? ` [${label}] ` : ' '}[${level}]:${group ? ` [${group}] ` : ' '}${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    })
)

/** 
 * @constant logger 
 * @type {winston.Logger}
 * @description Contains the methods to log the server activity like petitions, errors, etc
 */
const logger = createLogger({
    level: level,
    format: logFormat,
    transports: [
        /** Define log for the files */
        new transports.File({
            filename: `${logDir}/server.log`,
            maxsize: 1024000, //1MB
            maxFiles: 5,
            format: format.combine(
                format.uncolorize()
            )
        }),
        /** Define log for the console */
        new transports.Console({
            handleExceptions: true
        })
    ],
    exceptionHandlers: [
        /** Define log for exception in the files */
        new transports.File({
            handleExceptions: true,
            filename: `${logDir}/exceptions.log`,
            maxsize: 1024000, //1MB
            maxFiles: 5,
            format: format.combine(
                format.uncolorize()
            )
        })
    ],
    exitOnError: true
});

logger.stream = {
/**
 * @function write
 * @description Writes on a file depending of the status code it contains
 *
 * @param {String} message Message to write
 */
write: (message) => {
        if (message.indexOf('status: 5') >= 0) {
            logger.error(message.trim());
        } else if (message.indexOf('status: 4') >= 0) {
            logger.warn(message.trim());
        } else {
            logger.info(message.trim());
        }
    }
};

module.exports = logger;