const bodyParser = require('body-parser');
const helmet = require('helmet');
const responseTime = require('response-time');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require("express-rate-limit");
const compression = require('compression');
const errorHandler = require('errorhandler');
const logger = require('../util/logger');

/** Config for limit requets */
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, /** 5 min */
  max: 100 /** limit each IP to 100 requests per windowMs */
});
/** Contains the boot mode of the app */
const isProduction = process.env.NODE_ENV === 'production';
/** Contains the uris allowed for do requets */
const allowedOrigins = process.env.APP_URLS.split(',');

module.exports = (app) => {
/** Enable if you're behind a reverse proxy (Heroku in our case)
*   see https://expressjs.com/en/guide/behind-proxies.html 
*/
    app.set('trust proxy', 1);
    /** Recommended for safety */
    app.disable('x-powered-by');
    /** Capture the time of Responses */
    app.use(responseTime());
    /** Middleware that provider methods of safely */
    app.use(helmet());
    /** Handler of the access request */
    app.use(cors({
        origin: (origin, next) => {
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                next(null, true);
            } else {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin: ';
                next(new Error(msg,origin));
            }
        },
        credentials: true,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
        preflightContinue: false
    }));
    /** Used to extract info and pass it to wiston*/
    app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" status: :status :res[content-length] - :response-time ms ":referrer" ":user-agent"', {
        stream: logger.stream
    }));
    /** Middleware for limit requets */
    app.use(limiter);
    /** Compress the info */
    app.use(compression());
    /** Config for req.body */
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.json({type: 'application/vnd.api+json'}));
    app.use(bodyParser.urlencoded({extended: true}));
    /** In production redirect to https */
    app.use((req, res, next) => {
        /** The X-Forwarded-Proto (XFP) header is a de-facto standard header for identifying the protocol (HTTP or HTTPS) that a client used to connect to your proxy */
        if (isProduction && !(req.secure || req.headers['x-forwarded-proto'] === 'https')) {
            res.redirect(`https://${req.hostname}:${process.env.PORT_HTTPS}${req.url}`);
        } else {
            next();
        }
    });
    /** In development mode use errorHandler Middleware */
    if(!isProduction) {
        /** errorHandler provider a improved context of the error for the user and server */
        app.use(errorHandler({log: errorNotification}));
    }
    /** Format error notification and pass the error at logger */
    function errorNotification(err, str, req) {
        const title = `Error in ${req.method} ${req.url}`;
        logger.error(title, str);
    };
    /** Pass info of the routes at the logger */
    app.get('*', function (req, _res, next) {
        if (process.env.NODE_ENV !== 'production') {
            logger.info(req.url)
        }
        return next();
    });
};
