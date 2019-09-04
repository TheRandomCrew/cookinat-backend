const axios = require('axios');
const logger = require('../../util/logger')
    /** 
     * @module server/database/postgREST/cook
     */
module.exports = {
    /** 
     * @function byParam
     * @description Request to an external service to consult an specific cook
     * @param {String} key Field to consult
     * @param {String} value Value of the specified field
     * @returns Returns a promise, if the key value matches with a row's field in DB, it will return an object with the cook found
     *          if there are no matches it will return an empty object
     *          if there is an error it will return an error object
     */
    byParam: (key, value) => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/cooks?${key}=eq.${value}&limit=1000`)
                .then((res) => { return res.data })
                .catch((error) => [{
                    error: error.message,
                    trace: error.stack,
                    method: error.config.method,
                    url: error.config.url,
                    msg: 'Query error: ' + error.response.data.message
                }])
        } catch (error) {
            return [{
                error: error.msg,
                trace: error.trace,
                msg: 'Error in execution'
            }]
        }
    },
    /**
     * @function all
     * @description Request to an external service to consult all existing cooks
     * 
     * @returns Returns a promise, if the request is succesful returns an object with all cooks data
     *          if there is an error in the request it will return an error object
     */
    all: () => {
        try {
            return axios.get(process.env.POSTGRES_URL + `/cooks`)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => [{
                    error: error.message,
                    trace: error.stack,
                    method: error.config.method,
                    url: error.config.url,
                    msg: 'Query error: ' + error.response.data.message

                }]);
        } catch (error) {
            return [{
                error: error.msg,
                trace: error.trace,
                msg: 'Error in execution'
            }]
        }
    },
    /**
     * @function update
     * @description Request to an external service to update a cook data...
     * WARNING: DOESN'T WORKS, IT CAN NOT FIND THE COOK TO UPDATE
     * @param {JSON} input object with update cook data
     * @returns Returns a promise, if the request is succesful returns an object with the updated cook data
     *          if there is an error in the request it will return an error object
     */
    update: (input) => {
        try {
            const {
                email,
                password,
                first_name,
                last_name,
                nickname,
                avatar,
                phone_number,
                ssn,
                certification_photo,
                instagram
            } = input;
            return axios({
                    method: 'PATCH',
                    url: process.env.POSTGRES_URL + '/auth_cook',
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        email,
                        password,
                        first_name,
                        last_name,
                        nickname,
                        avatar,
                        phone_number,
                        ssn,
                        certification_photo,
                        instagram
                    }
                })
                .then((res) => { return res.data })
                .catch((error) => [{
                    error: error.message,
                    trace: error.stack,
                    method: error.config.method,
                    url: error.config.url,
                    msg: 'Query error: ' + error.response.data.message
                }]);
        } catch (error) {
            return [{
                error: error.msg,
                trace: error.trace,
                msg: 'Error in execution'
            }]
        }
    },
    /**
     * @function create
     * @description Request to an external service to create a new cook
     *
     * @param {JSON} input object with new cook data
     * @returns Returns a promise, if the request is succesful returns an object with the new cook data
     *          if there is an error in the request it will return an error object
     */
    create: (input) => {
        try {
            const {
                email,
                password,
                first_name,
                last_name,
                nickname,
                avatar,
                phone_number,
                ssn,
                certification_photo,
                instagram
            } = input;
            return axios({
                    method: 'POST',
                    url: process.env.POSTGRES_URL + '/auth_cook',
                    headers: {
                        Prefer: 'return=representation',
                    },
                    data: {
                        email,
                        password,
                        first_name,
                        last_name,
                        nickname,
                        avatar,
                        phone_number,
                        ssn,
                        certification_photo,
                        instagram
                    }
                })
                .then((res) => {
                    return res.data
                })
                .catch((error) => {
                    logger.error(error);
                    return [{
                        error: error.message,
                        trace: error.stack,
                        method: error.config.method,
                        url: error.config.url,
                        msg: 'Query error: ' + error.response.data.message
                    }]
                });
        } catch (error) {
            logger.error(error);
            return [{
                error: error.msg,
                trace: error.trace,
                msg: 'Error in execution'
            }]
        }
    }
};