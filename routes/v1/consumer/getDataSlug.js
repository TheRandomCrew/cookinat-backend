const responseMsgs = require('../util/responseMessages');
const logger = require('../../../server/util/logger');

/** @module routes/v1/consumer/getDataSlug */

module.exports = async(req, res) => {
    /** Handler uri and param for get data */
    const { varMain, varFind, valMain } = getParam(req)
        /** Call dinamicaly at the methods model of data base */
    const { all, byParam } = require(`../../../server/database/postgREST/${varMain}`);

    try {
        let nameData = [];
        /** Verify if need all or filtered data */
        valMain === null ? (
            nameData = await all()
        ) : (
            nameData = await byParam(`${varFind}`, valMain)
        )

        /** If we not have data, we send the error */
        if (!nameData) {
            throw Error(`There was a problem getting ${nameData} on DB. Please try again or contact support.`)
        }
        /** If data exist, return status 200 and data found */
        return res.status(200).json({
            ...responseMsgs[200],
            data: [nameData]
        })
    } catch (error) {
        return res.status(500).json({
            ...responseMsgs[500],
            errors: [{ error: error.message, trace: error.trace }]
        });
    }
};

function getParam(req) {
    /** We capture the uri separately por '/' in the array  */
    const auxArray = req.url.split('/');
    /** Clear array */
    const uriArray = auxArray.filter(e => e !== "");
    /** We capture the param if exist */
    const { params } = req;
    logger.info(`--${JSON.stringify(params)}--&&--${uriArray}--With--${uriArray.length}--`)
        /** 
         * if params exist and params is not empty the uri have a slug
         *
         * if our uri have three levels
         * /lv_1/lv_2/:slug_id
         * varMain:slug
         * varFind:lv_2_id
         * valMain:slug_val
         * 
         * if our uri have four levels
         * /lv_1/lv_2/lv_3/:slug
         * varMain:lv_2
         * varFind:lv_3
         * valMain:slug_val
         * 
         * if params no exist then the final level uri is a 'all' or other require
         * if it is all then valMain:null indicate
         */

    if (params && Object.keys(params).length !== 0) {
        if (uriArray.length === 3) {
            const dataParams = {
                varMain: Object.keys(params)[0].split('_')[0],
                varFind: `${ uriArray[uriArray.length - 2]}_id`,
                valMain: params[Object.keys(params)[0]]
            }
            logger.error("---HII---")
            return dataParams
        } else if (uriArray.length === 4) {
            const dataParams = {
                    varMain: uriArray[uriArray.length - 3],
                    varFind: `${uriArray[uriArray.length - 2]}_id`,
                    valMain: params[Object.keys(params)[0]]
                }
                /** in the tables buyer and receiver not finish in the _id */
            if (uriArray[uriArray.length - 2] === 'buyer') dataParams.varFind = 'buyer';
            if (uriArray[uriArray.length - 2] === 'receiver') dataParams.varFind = 'receiver';
            return dataParams
        } else {
            logger.error(`-----Error in the process for uri------`)
        }
    }
    /** final uri level not should be a number */
    else if (!(/^\+?(0|[1-9]\d*)$/.test(uriArray[uriArray.length - 1]))) {
        if (uriArray[uriArray.length - 1] === 'all') {
            const dataParams = {
                varMain: uriArray[uriArray.length - 2],
                varFind: `${uriArray[uriArray.length - 2] }_id`,
                valMain: null,
            }
            return dataParams;
        }
    } else {
        logger.error(`-----Error in the process for uri------`)
    }

}