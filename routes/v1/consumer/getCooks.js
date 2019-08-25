const { all } = require('../../../server/database/postgREST/cook');
const responseMsgs = require('../util/responseMessages');
const logger = require('../../../server/util/logger');
module.exports =async(_req, res) => {

    try {
        /*logger.error('EYY BABY')*/
        const cooks = await all();
        if (!cooks) {
            throw Error('There was a problem getting cooks on DB. Please try again or contact support.')
        }
        return res.status(200).json({
            ...responseMsgs[200],
            data: cooks
        })
    } catch (error) {

        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{error: error.message, trace: error.trace}]
        });
    }
};